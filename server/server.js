/**
 * ============================================================================
 * TURFBOOK BACKEND API & REAL-TIME WEBSOCKET GATEWAY
 * ============================================================================
 * Architecture Overview:
 * - Express.js REST API providing marketplace discovery, booking mutex, and auth
 * - In-memory transactional data store initialized from seed data
 * - Bi-directional WebSocket server (/ws) broadcasting real-time slot state changes
 * - Haversine GPS distance calculation for nearby turf discovery
 * - 5-minute mutex slot hold engine protecting against checkout race conditions
 * - Role-Based Access Control (PLAYER, OWNER, ADMIN)
 * ============================================================================
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import {
  initialUsers,
  initialOwners,
  initialAdmin,
  initialTeams,
  initialSports,
  initialFacilitiesList,
  initialTurfs,
  initialBookings
} from './data/seedData.js';

const app = express();
const httpServer = createServer(app);
const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

app.use(cors());
app.use(express.json());

// In-Memory Database State
let users = [...initialUsers];
let owners = [...initialOwners];
let admin = { ...initialAdmin };
let turfs = [...initialTurfs];
let teams = [...initialTeams];
let bookings = [...initialBookings];

// Owner custom slot states & price overrides: key = `${turfId}_${date}_${hour}` -> { blocked: boolean, customPrice: number | null }
const slotOverrides = new Map();

// Real-time Slot Holds: key = `${turfId}_${date}_${hour}` -> { userId, userName, expiresAt, timeoutId, durationHours, teamId }
const heldSlots = new Map();

// Helper: Haversine distance in km
function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// WebSocket broadcast helper
function broadcast(message) {
  const payload = JSON.stringify(message);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({ type: 'CONNECTED', message: 'Connected to TURFBOOK Real-time Network' }));
});

// Dynamic Price Calculator
function calculateSlotPrice(turf, dateStr, hourNumber) {
  const slotKey = `${turf.id}_${dateStr}_${hourNumber}`;
  const override = slotOverrides.get(slotKey);
  if (override && override.customPrice) {
    return override.customPrice;
  }

  const date = new Date(dateStr);
  const day = date.getDay(); // 0 = Sun, 6 = Sat
  const isWeekend = day === 0 || day === 6;

  let price = isWeekend
    ? turf.pricing.weekendRate || turf.pricing.basePrice
    : turf.pricing.weekdayRate || turf.pricing.basePrice;

  // Peak hours: 18 (6 PM) to 22 (10 PM)
  if (hourNumber >= 18 && hourNumber <= 22 && turf.pricing.peakHourRate) {
    price = turf.pricing.peakHourRate;
  } else if (hourNumber >= 5 && hourNumber < 15 && turf.pricing.offPeakRate) {
    price = turf.pricing.offPeakRate;
  }

  return price;
}

// Helper: Build daily slot matrix for a turf and date
function generateTurfSlots(turf, dateStr) {
  const startHour = parseInt(turf.openingHours.open.split(':')[0], 10) || 6;
  const endHour = parseInt(turf.openingHours.close.split(':')[0], 10) || 23;
  const slots = [];
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const currentHour = now.getHours();

  for (let hour = startHour; hour <= endHour; hour++) {
    const timeStr = `${hour.toString().padStart(2, '0')}:00`;
    const nextHour = hour + 1;
    const timeLabel = `${timeStr} - ${nextHour.toString().padStart(2, '0')}:00`;
    const slotKey = `${turf.id}_${dateStr}_${hour}`;

    const override = slotOverrides.get(slotKey);
    const isBlocked = override?.blocked || false;
    const price = calculateSlotPrice(turf, dateStr, hour);

    // Check if booked
    const existingBooking = bookings.find(
      (b) =>
        b.turfId === turf.id &&
        b.date === dateStr &&
        parseInt(b.startTime.split(':')[0], 10) <= hour &&
        hour < parseInt(b.endTime.split(':')[0], 10) &&
        b.status !== 'CANCELLED'
    );

    // Check if held
    const held = heldSlots.get(slotKey);
    const isPast = dateStr < todayStr || (dateStr === todayStr && hour < currentHour);

    let status = 'AVAILABLE';
    let bookingInfo = null;

    if (isPast) {
      status = 'EXPIRED';
    } else if (isBlocked) {
      status = 'BLOCKED';
    } else if (existingBooking) {
      status = 'BOOKED';
      bookingInfo = {
        bookingId: existingBooking.id,
        teamName: existingBooking.isTeamPublic ? existingBooking.teamName : 'Private Game',
        sport: existingBooking.sport,
        isPublic: existingBooking.isTeamPublic
      };
    } else if (held && held.expiresAt > Date.now()) {
      status = 'HOLDING';
      bookingInfo = {
        expiresAt: held.expiresAt,
        holderName: held.userName
      };
    }

    slots.push({
      hour,
      timeStr,
      timeLabel,
      price,
      status,
      isAvailable: status === 'AVAILABLE',
      bookingInfo
    });
  }

  return slots;
}

// ----------------------------------------------------
// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'TURFBOOK Backend API' });
});

app.get('/api/auth/profiles', (req, res) => {
  res.json({
    players: users,
    owners: owners.map((o) => ({
      ...o,
      turfCount: turfs.filter((t) => t.ownerId === o.id).length
    })),
    admin
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, phone, role, sportsHubName } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const existingPlayer = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  const existingOwner = owners.find((o) => o.email.toLowerCase() === email.toLowerCase());
  if (existingPlayer || existingOwner) {
    return res.status(409).json({ error: 'An account with this email address already exists' });
  }

  if (role === 'OWNER') {
    const newOwner = {
      id: `own-${Date.now()}`,
      name: sportsHubName || `${name} Sports Group`,
      contactPerson: name,
      email,
      phone: phone || '+91 99000 11223',
      role: 'OWNER',
      verified: true
    };
    owners.push(newOwner);
    return res.status(201).json({
      success: true,
      message: 'Owner account registered successfully',
      user: newOwner,
      role: 'OWNER',
      token: `own-token-${newOwner.id}`
    });
  }

  const newPlayer = {
    id: `usr-${Date.now()}`,
    name,
    email,
    role: 'PLAYER',
    phone: phone || '+91 98000 12345',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    defaultTeamId: null
  };
  users.push(newPlayer);
  res.status(201).json({
    success: true,
    message: 'Player account registered successfully',
    user: newPlayer,
    role: 'PLAYER',
    token: `usr-token-${newPlayer.id}`
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (email.toLowerCase() === admin.email.toLowerCase()) {
    return res.json({
      success: true,
      user: admin,
      role: 'ADMIN',
      token: `adm-token-${Date.now()}`
    });
  }

  const targetRole = role || 'PLAYER';
  if (targetRole === 'OWNER') {
    const owner = owners.find((o) => o.email.toLowerCase() === email.toLowerCase());
    if (owner) {
      return res.json({
        success: true,
        user: owner,
        role: 'OWNER',
        token: `own-token-${owner.id}-${Date.now()}`
      });
    }
    return res.status(401).json({ error: 'Invalid owner credentials' });
  }

  const player = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (player) {
    return res.json({
      success: true,
      user: player,
      role: 'PLAYER',
      token: `usr-token-${player.id}-${Date.now()}`
    });
  }

  return res.status(401).json({ error: 'Invalid player credentials' });
});

app.put('/api/auth/profile', (req, res) => {
  const { name, phone, area, bio } = req.body;
  const targetId = req.body.userId || req.headers['x-user-id'];
  const user = users.find((u) => u.id === targetId);
  if (!user) {
    return res.status(404).json({ error: 'User profile not found' });
  }
  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (area) user.area = area;
  if (bio) user.bio = bio;
  res.json({ success: true, user });
});

app.get('/api/teams', (req, res) => {
  const userId = req.query.userId;
  if (userId) {
    const userTeams = teams.filter((t) => t.userId === userId);
    return res.json(userTeams);
  }
  res.json(teams);
});

app.post('/api/teams', (req, res) => {
  const { userId, name, sport, players, visibility } = req.body;
  if (!name || !sport) {
    return res.status(400).json({ error: 'Name and sport are required' });
  }
  const newTeam = {
    id: `tm-${Date.now()}`,
    userId: userId || 'usr-1',
    name,
    sport,
    players: parseInt(players, 10) || 10,
    visibility: visibility === 'PRIVATE' ? 'PRIVATE' : 'PUBLIC'
  };
  teams.push(newTeam);
  res.status(201).json(newTeam);
});

// ----------------------------------------------------
// TURFS API (PLAYER DISCOVERY)
// ----------------------------------------------------
app.get('/api/turfs', (req, res) => {
  const { sport, area, city, search, userLat, userLng, maxPrice, date, isStateWide } = req.query;

  // Only return APPROVED turfs to public
  let filtered = turfs.filter((t) => t.status === 'APPROVED');

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        (t.area && t.area.toLowerCase().includes(q)) ||
        (t.city && t.city.toLowerCase().includes(q)) ||
        (t.state && t.state.toLowerCase().includes(q)) ||
        (t.address && t.address.toLowerCase().includes(q)) ||
        t.sports.some((s) => s.toLowerCase().includes(q))
    );
  }

  if (sport && sport !== 'All') {
    filtered = filtered.filter((t) => t.sports.includes(sport));
  }

  if (city && city !== 'All' && city !== 'All Tamil Nadu' && city !== 'Tamil Nadu') {
    filtered = filtered.filter((t) => t.city && t.city.toLowerCase() === city.toLowerCase());
  }

  if (area && area !== 'All' && area !== 'All Tamil Nadu' && area !== 'Tamil Nadu') {
    filtered = filtered.filter((t) => 
      (t.area && t.area.toLowerCase() === area.toLowerCase()) ||
      (t.city && t.city.toLowerCase() === area.toLowerCase())
    );
  }

  if (maxPrice) {
    filtered = filtered.filter((t) => t.pricing.basePrice <= parseInt(maxPrice, 10));
  }

  // Calculate real distance if coordinates provided
  const rawLat = userLat || req.query.lat;
  const rawLng = userLng || req.query.lng;
  const uLat = parseFloat(rawLat);
  const uLng = parseFloat(rawLng);
  const checkDate = date || new Date().toISOString().split('T')[0];

  const results = filtered.map((turf) => {
    const distance =
      !isNaN(uLat) && !isNaN(uLng)
        ? calculateHaversineDistance(uLat, uLng, turf.coordinates.lat, turf.coordinates.lng)
        : null;

    // Calculate slots available today/selected date
    const slots = generateTurfSlots(turf, checkDate);
    const availableSlotCount = slots.filter((s) => s.status === 'AVAILABLE').length;

    const owner = owners.find((o) => o.id === turf.ownerId);

    return {
      ...turf,
      distanceKm: distance,
      availableSlotsToday: availableSlotCount,
      ownerName: owner ? owner.name : 'Independent Owner'
    };
  });

  // Sort by distance if GPS is active, else by rating
  if (!isNaN(uLat) && !isNaN(uLng)) {
    results.sort((a, b) => (a.distanceKm || 9999) - (b.distanceKm || 9999));
  } else {
    results.sort((a, b) => b.rating - a.rating);
  }

  res.json(results);
});

app.get('/api/turfs/:id', (req, res) => {
  const turf = turfs.find((t) => t.id === req.params.id);
  if (!turf) {
    return res.status(404).json({ error: 'Turf not found' });
  }

  const { userLat, userLng } = req.query;
  const uLat = parseFloat(userLat);
  const uLng = parseFloat(userLng);
  const distance =
    !isNaN(uLat) && !isNaN(uLng)
      ? calculateHaversineDistance(uLat, uLng, turf.coordinates.lat, turf.coordinates.lng)
      : null;

  const owner = owners.find((o) => o.id === turf.ownerId);

  res.json({
    ...turf,
    distanceKm: distance,
    ownerDetails: owner ? { name: owner.name, contact: owner.contactPerson, verified: owner.verified } : null
  });
});

app.get('/api/turfs/:id/slots', (req, res) => {
  const turf = turfs.find((t) => t.id === req.params.id);
  if (!turf) {
    return res.status(404).json({ error: 'Turf not found' });
  }

  const dateStr = req.query.date || new Date().toISOString().split('T')[0];
  const slots = generateTurfSlots(turf, dateStr);

  res.json({
    turfId: turf.id,
    turfName: turf.name,
    date: dateStr,
    advanceBookingDays: turf.advanceBookingDays,
    slots
  });
});

// ----------------------------------------------------
// REAL-TIME SLOT LOCKING & DOUBLE-BOOKING MUTEX
// ----------------------------------------------------
app.post(['/api/slots/hold', '/api/bookings/hold'], (req, res) => {
  const { turfId, date, hour, userId, userName, teamId, durationHours } = req.body;

  if (!turfId || !date || hour === undefined || !userId) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const turf = turfs.find((t) => t.id === turfId);
  if (!turf) return res.status(404).json({ error: 'Turf not found' });

  const duration = parseInt(durationHours, 10) || 1;
  const targetHours = [];
  for (let i = 0; i < duration; i++) {
    targetHours.push(parseInt(hour, 10) + i);
  }

  // ATOMIC LOCK CHECK FOR ALL REQUESTED HOURS
  for (const h of targetHours) {
    const slotKey = `${turfId}_${date}_${h}`;

    // 1. Is it blocked by owner?
    const override = slotOverrides.get(slotKey);
    if (override?.blocked) {
      return res.status(409).json({ error: `Slot ${h}:00 is blocked by the owner.` });
    }

    // 2. Is it already successfully booked?
    const alreadyBooked = bookings.some(
      (b) =>
        b.turfId === turfId &&
        b.date === date &&
        parseInt(b.startTime.split(':')[0], 10) <= h &&
        h < parseInt(b.endTime.split(':')[0], 10) &&
        b.status !== 'CANCELLED'
    );
    if (alreadyBooked) {
      return res.status(409).json({ error: `Slot ${h}:00 is already booked by another user.` });
    }

    // 3. Is it held by someone else and not expired?
    const existingHold = heldSlots.get(slotKey);
    if (existingHold && existingHold.userId !== userId && existingHold.expiresAt > Date.now()) {
      return res.status(409).json({
        error: `Slot ${h}:00 is currently on hold for another player's checkout. Please try another slot.`
      });
    }
  }

  // ALL HOURS CLEAR: ACQUIRE HOLD FOR 5 MINUTES (300,000 ms)
  const HOLD_DURATION_MS = 5 * 60 * 1000;
  const expiresAt = Date.now() + HOLD_DURATION_MS;

  targetHours.forEach((h) => {
    const slotKey = `${turfId}_${date}_${h}`;
    // Clear any previous timeout
    const prev = heldSlots.get(slotKey);
    if (prev?.timeoutId) clearTimeout(prev.timeoutId);

    const timeoutId = setTimeout(() => {
      heldSlots.delete(slotKey);
      broadcast({
        type: 'SLOT_RELEASED',
        turfId,
        date,
        hour: h
      });
    }, HOLD_DURATION_MS);

    heldSlots.set(slotKey, {
      userId,
      userName: userName || 'Player',
      expiresAt,
      timeoutId,
      teamId
    });

    broadcast({
      type: 'SLOT_HELD',
      turfId,
      date,
      hour: h,
      holderName: userName || 'Player',
      expiresAt
    });
  });

  res.json({
    success: true,
    message: 'Slot successfully locked for checkout',
    expiresAt,
    targetHours
  });
});

app.post(['/api/slots/release', '/api/bookings/release-hold'], (req, res) => {
  const { turfId, date, hour, userId, durationHours } = req.body;
  const duration = parseInt(durationHours, 10) || 1;

  for (let i = 0; i < duration; i++) {
    const h = parseInt(hour, 10) + i;
    const slotKey = `${turfId}_${date}_${h}`;
    const hold = heldSlots.get(slotKey);
    if (hold && (!userId || hold.userId === userId)) {
      clearTimeout(hold.timeoutId);
      heldSlots.delete(slotKey);
      broadcast({
        type: 'SLOT_RELEASED',
        turfId,
        date,
        hour: h
      });
    }
  }

  res.json({ success: true, message: 'Slot hold released' });
});

// ----------------------------------------------------
// BOOKINGS API
// ----------------------------------------------------
app.post('/api/bookings', (req, res) => {
  const {
    turfId,
    userId,
    userName,
    teamId,
    teamName,
    isTeamPublic,
    sport,
    date,
    startHour,
    durationHours,
    paymentMethod
  } = req.body;

  const turf = turfs.find((t) => t.id === turfId);
  if (!turf) return res.status(404).json({ error: 'Turf not found' });

  const duration = parseInt(durationHours, 10) || 1;
  const startH = parseInt(startHour, 10);
  const endH = startH + duration;

  // FINAL DOUBLE BOOKING PROTECTION IN CRITICAL SECTION
  for (let h = startH; h < endH; h++) {
    const slotKey = `${turfId}_${date}_${h}`;
    const override = slotOverrides.get(slotKey);
    if (override?.blocked) {
      return res.status(409).json({ error: `Slot ${h}:00 was blocked.` });
    }

    const collision = bookings.find(
      (b) =>
        b.turfId === turfId &&
        b.date === date &&
        parseInt(b.startTime.split(':')[0], 10) <= h &&
        h < parseInt(b.endTime.split(':')[0], 10) &&
        b.status !== 'CANCELLED'
    );
    if (collision) {
      return res.status(409).json({ error: `Double-booking prevented: slot ${h}:00 is already reserved.` });
    }

    const hold = heldSlots.get(slotKey);
    if (hold && hold.userId !== userId && hold.expiresAt > Date.now()) {
      return res.status(409).json({ error: `Slot ${h}:00 is held by another user.` });
    }
  }

  // Calculate total amount
  let totalAmount = 0;
  for (let h = startH; h < endH; h++) {
    totalAmount += calculateSlotPrice(turf, date, h);
  }

  const startTimeStr = `${startH.toString().padStart(2, '0')}:00`;
  const endTimeStr = `${endH.toString().padStart(2, '0')}:00`;
  const bookingId = `TB-${Date.now().toString().slice(-6)}`;
  const qrCodeData = `TURFBOOK-${bookingId}-${turf.id}-${date}-${startTimeStr}`;

  const selectedTeam = teamId ? teams.find((t) => t.id === teamId) : null;
  const resolvedTeamName = selectedTeam ? selectedTeam.name : (teamName || 'Solo Player');

  const newBooking = {
    id: bookingId,
    turfId: turf.id,
    turfName: turf.name,
    turfAddress: turf.address,
    turfArea: turf.area,
    userId,
    userName: userName || 'Player',
    teamId: teamId || null,
    team: selectedTeam || null,
    teamName: resolvedTeamName,
    isTeamPublic: isTeamPublic ?? true,
    sport: sport || turf.sports[0],
    date,
    startTime: startTimeStr,
    endTime: endTimeStr,
    durationHours: duration,
    amount: totalAmount,
    paymentMethod: paymentMethod || 'ONLINE_UPI',
    status: 'CONFIRMED',
    createdAt: new Date().toISOString(),
    qrCode: qrCodeData,
    qrCodeData
  };

  bookings.unshift(newBooking);

  // Clear holds and broadcast real-time update
  for (let h = startH; h < endH; h++) {
    const slotKey = `${turfId}_${date}_${h}`;
    const hold = heldSlots.get(slotKey);
    if (hold?.timeoutId) clearTimeout(hold.timeoutId);
    heldSlots.delete(slotKey);

    broadcast({
      type: 'SLOT_BOOKED',
      turfId,
      date,
      hour: h,
      teamName: isTeamPublic ? (teamName || 'Solo Player') : 'Private Game',
      isPublic: isTeamPublic ?? true
    });
  }

  res.status(201).json({
    success: true,
    booking: newBooking
  });
});

app.get('/api/bookings/my', (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.json(bookings);
  }
  const userBookings = bookings.filter((b) => b.userId === userId);
  res.json(userBookings);
});

app.post('/api/bookings/:id/cancel', (req, res) => {
  const booking = bookings.find((b) => b.id === req.params.id);
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  if (booking.status === 'CANCELLED') {
    return res.status(400).json({ error: 'Booking is already cancelled' });
  }

  const turf = turfs.find((t) => t.id === booking.turfId);
  let refundRate = 0.5; // default moderate 50%
  const policy = (turf?.cancellationPolicy || '').toLowerCase();
  if (policy.includes('100%') || policy.includes('flexible')) {
    refundRate = 1.0;
  } else if (policy.includes('strict') || policy.includes('no refund')) {
    refundRate = 0.0;
  }

  const refundAmount = Math.round(booking.amount * refundRate);
  booking.status = 'CANCELLED';
  booking.refundAmount = refundAmount;
  booking.refundStatus = refundAmount > 0 ? 'REFUND_PROCESSED' : 'NO_REFUND';
  booking.cancelledAt = new Date().toISOString();

  // Broadcast slot release to everyone
  const startH = parseInt(booking.startTime.split(':')[0], 10);
  const endH = parseInt(booking.endTime.split(':')[0], 10);
  for (let h = startH; h < endH; h++) {
    broadcast({
      type: 'SLOT_RELEASED',
      turfId: booking.turfId,
      date: booking.date,
      hour: h
    });
  }

  res.json({
    success: true,
    message: 'Booking cancelled successfully',
    booking,
    refundAmount,
    refundStatus: booking.refundStatus
  });
});

app.get('/api/bookings/verify-qr/:code', (req, res) => {
  const code = req.params.code;
  const booking = bookings.find((b) => b.qrCodeData === code || b.id === code || b.qrCode === code || (code && code.includes(b.id)));
  if (!booking) {
    return res.status(404).json({ valid: false, error: 'Invalid or non-existent match pass QR code' });
  }

  const slotStr = `${booking.startTime} - ${booking.endTime}`;
  res.json({
    valid: true,
    bookingId: booking.id,
    turfName: booking.turfName,
    turfArea: booking.turfArea,
    date: booking.date,
    time: slotStr,
    timeSlot: slotStr,
    sport: booking.sport,
    teamName: booking.teamName,
    playerName: booking.userName,
    status: booking.status,
    amount: booking.amount,
    createdAt: booking.createdAt
  });
});

// ----------------------------------------------------
// OWNER API (MULTI-TURF MANAGEMENT)
// ----------------------------------------------------
app.get('/api/owner/turfs', (req, res) => {
  const { ownerId } = req.query;
  if (!ownerId) return res.status(400).json({ error: 'ownerId is required' });

  const ownerTurfs = turfs.filter((t) => t.ownerId === ownerId);
  res.json(ownerTurfs);
});

app.get('/api/owner/:id/stats', (req, res) => {
  const ownerId = req.params.id;
  const owner = owners.find((o) => o.id === ownerId);
  if (!owner) return res.status(404).json({ error: 'Owner not found' });

  const ownerTurfs = turfs.filter((t) => t.ownerId === ownerId);
  const ownerTurfIds = new Set(ownerTurfs.map((t) => t.id));

  const ownerBookings = bookings.filter((b) => ownerTurfIds.has(b.turfId) && b.status !== 'CANCELLED');
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  const todayBookings = ownerBookings.filter((b) => b.date === todayStr);
  const todayRevenue = todayBookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const totalGrossRevenue = ownerBookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const platformFee = Math.round(totalGrossRevenue * 0.10);
  const netPayout = totalGrossRevenue - platformFee;

  res.json({
    ownerId,
    ownerName: owner.name,
    turfCount: ownerTurfs.length,
    todayBookingsCount: todayBookings.length,
    todayRevenue,
    totalBookingsCount: ownerBookings.length,
    totalBookings: ownerBookings.length,
    grossRevenue: totalGrossRevenue,
    monthlyRevenue: totalGrossRevenue,
    weeklyRevenue: totalGrossRevenue,
    platformFee,
    netPayout,
    netRevenue: netPayout
  });
});

app.post('/api/owner/turfs', (req, res) => {
  const effectiveOwnerId = req.body.ownerId || req.headers['x-owner-id'];
  const effectiveAddress = req.body.address || req.body.location?.address;
  const effectiveArea = req.body.area || req.body.location?.area;
  const effectiveCity = req.body.city || req.body.location?.city;
  const effectiveCoords = req.body.coordinates || (req.body.location?.latitude ? { lat: req.body.location.latitude, lng: req.body.location.longitude } : null);

  const {
    name,
    tagline,
    description,
    sports,
    facilities,
    images,
    pricing,
    openingHours,
    slotDurationMinutes,
    advanceBookingDays,
    cancellationPolicy,
    rules
  } = req.body;

  if (!effectiveOwnerId || !name || !effectiveAddress) {
    return res.status(400).json({ error: 'Owner, name, and address are required' });
  }

  const newTurf = {
    id: `trf-${Date.now().toString().slice(-5)}`,
    ownerId: effectiveOwnerId,
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    tagline: tagline || 'Newly registered sports arena',
    description: description || 'High-performance multi-sport artificial turf facility.',
    address: effectiveAddress,
    area: effectiveArea || 'Coimbatore',
    city: effectiveCity || 'Coimbatore',
    state: 'Tamil Nadu',
    coordinates: effectiveCoords || { lat: 11.0168, lng: 76.9558 },
    sports: sports && sports.length ? sports : ['Football'],
    facilities: facilities && facilities.length ? facilities : ['LED Floodlights 500 Lux', 'Car & Bike Parking'],
    images: images && images.length ? images : ['https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80'],
    pricing: pricing || {
      basePrice: 800,
      weekdayRate: 800,
      weekendRate: 1000,
      peakHourRate: 1100,
      offPeakRate: 700
    },
    openingHours: openingHours || { open: '06:00', close: '23:00' },
    slotDurationMinutes: parseInt(slotDurationMinutes, 10) || 60,
    advanceBookingDays: parseInt(advanceBookingDays, 10) || 30,
    cancellationPolicy: cancellationPolicy || 'Flexible: 100% refund up to 4 hours prior.',
    rules: rules || ['Proper athletic shoes mandatory.'],
    status: 'PENDING', // MUST BE APPROVED BY ADMIN
    rating: 0,
    ratingCount: 0
  };

  turfs.unshift(newTurf);

  broadcast({
    type: 'TURF_REGISTERED',
    turf: newTurf
  });

  res.status(201).json({
    success: true,
    message: 'Turf submitted successfully and is pending administrator verification',
    turf: newTurf
  });
});

app.get('/api/owner/turfs/:id/calendar', (req, res) => {
  const turf = turfs.find((t) => t.id === req.params.id);
  if (!turf) return res.status(404).json({ error: 'Turf not found' });

  // Role Security Check: Owner A cannot inspect Owner B's calendar
  const requestingOwner = req.headers['x-owner-id'] || req.query.ownerId;
  if (requestingOwner && turf.ownerId !== requestingOwner) {
    return res.status(403).json({ error: 'Forbidden: You do not own this sports facility' });
  }

  const dateStr = req.query.date || new Date().toISOString().split('T')[0];
  const slots = generateTurfSlots(turf, dateStr);
  const turfBookings = bookings.filter((b) => b.turfId === turf.id && b.date === dateStr);

  res.json({
    turfId: turf.id,
    turfName: turf.name,
    date: dateStr,
    slots,
    bookings: turfBookings
  });
});

app.post('/api/owner/turfs/:id/slots/toggle', (req, res) => {
  const { date, hour, blocked, customPrice, ownerId } = req.body;
  const turfId = req.params.id;
  const turf = turfs.find((t) => t.id === turfId);
  if (!turf) return res.status(404).json({ error: 'Turf not found' });

  // Role Security Check: Owner A cannot block/modify slots on Owner B's turf
  const requestingOwner = req.headers['x-owner-id'] || req.query.ownerId || ownerId;
  if (requestingOwner && turf.ownerId !== requestingOwner) {
    return res.status(403).json({ error: 'Forbidden: You cannot modify slots for a turf owned by another entity' });
  }

  const slotKey = `${turfId}_${date}_${hour}`;
  const current = slotOverrides.get(slotKey) || { blocked: false, customPrice: null };
  if (blocked !== undefined) current.blocked = blocked;
  if (customPrice !== undefined) current.customPrice = customPrice;

  slotOverrides.set(slotKey, current);

  broadcast({
    type: 'SLOT_UPDATED',
    turfId,
    date,
    hour,
    blocked: current.blocked,
    customPrice: current.customPrice
  });

  res.json({ success: true, slotKey, override: current, blocked: current.blocked });
});

// ----------------------------------------------------
// PLATFORM ADMIN API (MARKETPLACE CONTROL)
// ----------------------------------------------------
app.get('/api/admin/turfs', (req, res) => {
  const allTurfsWithDetails = turfs.map((t) => {
    const owner = owners.find((o) => o.id === t.ownerId);
    const turfBookings = bookings.filter((b) => b.turfId === t.id);
    const revenue = turfBookings.reduce((sum, b) => sum + (b.amount || 0), 0);
    return {
      ...t,
      ownerName: owner?.name || 'Unknown',
      ownerContact: owner?.contactPerson || '',
      ownerEmail: owner?.email || '',
      totalBookingsCount: turfBookings.length,
      grossRevenue: revenue
    };
  });
  res.json(allTurfsWithDetails);
});

const handleTurfStatus = (req, res) => {
  const adminRole = req.headers['x-user-role'] || req.query.role || req.body.role;
  if (adminRole !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden: Administrator privileges required to change turf approval status' });
  }

  const { status, note } = req.body;
  const turf = turfs.find((t) => t.id === req.params.id);
  if (!turf) return res.status(404).json({ error: 'Turf not found' });

  if (!['APPROVED', 'REJECTED', 'PENDING', 'SUSPENDED'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  turf.status = status;
  turf.adminNote = note || '';

  broadcast({
    type: 'TURF_STATUS_CHANGED',
    turfId: turf.id,
    status: turf.status,
    turfName: turf.name
  });

  res.json({ success: true, turf });
};

app.post('/api/admin/turfs/:id/status', handleTurfStatus);
app.patch('/api/admin/turfs/:id/status', handleTurfStatus);

app.get('/api/admin/stats', (req, res) => {
  const totalApproved = turfs.filter((t) => t.status === 'APPROVED').length;
  const totalPending = turfs.filter((t) => t.status === 'PENDING').length;
  const totalBookings = bookings.filter((b) => b.status !== 'CANCELLED').length;
  const grossVolume = bookings.reduce((sum, b) => (b.status !== 'CANCELLED' ? sum + (b.amount || 0) : sum), 0);
  const platformRevenue = Math.round(grossVolume * 0.10);

  res.json({
    totalTurfs: turfs.length,
    approvedTurfs: totalApproved,
    pendingTurfs: totalPending,
    totalBookings,
    grossVolume,
    platformRevenue,
    activeUsers: users.length,
    totalUsers: users.length,
    totalOwners: owners.length,
    totalPlayers: users.length
  });
});

// ----------------------------------------------------
// STATIC FRONTEND ASSETS & SPA ROUTING
// ----------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

app.use(express.static(distPath));

// Fallback all other GET/HEAD routes to index.html for client-side routing (Express 5 compatible)
app.use((req, res, next) => {
  if ((req.method === 'GET' || req.method === 'HEAD') && !req.path.startsWith('/api') && !req.path.startsWith('/ws')) {
    return res.sendFile(path.join(distPath, 'index.html'));
  }
  next();
});

// Start Server
const PORT = process.env.PORT || 5005;
httpServer.listen(PORT, () => {
  console.log(`TURFBOOK API & WebSocket running on port ${PORT}`);
});
