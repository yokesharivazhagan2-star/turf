import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  Check, 
  AlertCircle, 
  CreditCard, 
  Navigation, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Ticket,
  ChevronRight,
  Plus
} from 'lucide-react';

export default function BookingBottomSheet() {
  const { 
    bookingModalState, 
    closeBooking, 
    currentUser, 
    selectedDate: globalDate, 
    setCurrentScreen, 
    fetchUserBookings,
    addNotification 
  } = useApp();

  const { isOpen, turf, date: initialDate, selectedSlot: initialSlot } = bookingModalState;

  // Step state: 1 to 8
  // 1: Date & Overview, 2: Slot Selection, 3: Duration, 4: Team, 5: Review & Hold, 6: Payment, 7: Confirmed Ticket
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(() => initialDate || globalDate || new Date().toISOString().split('T')[0]);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(initialSlot || null);
  const [durationHours, setDurationHours] = useState(1);

  // Teams state
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showNewTeamForm, setShowNewTeamForm] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamPlayers, setNewTeamPlayers] = useState(10);
  const [newTeamVisibility, setNewTeamVisibility] = useState('PUBLIC');

  // Lock Hold State
  const [isHolding, setIsHolding] = useState(false);
  const [holdExpiresAt, setHoldExpiresAt] = useState(null);
  const [holdTimeRemaining, setHoldTimeRemaining] = useState(300); // 5 min in seconds

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Confirmed Booking Result
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // Fetch slots for turf and date
  useEffect(() => {
    if (!isOpen || !turf) return;

    setLoadingSlots(true);
    fetch(`/api/turfs/${turf.id}/slots?date=${selectedDate}`)
      .then((res) => res.json())
      .then((data) => {
        setSlots(data.slots || []);
        setLoadingSlots(false);
      })
      .catch((err) => {
        console.error('Error fetching slots:', err);
        setLoadingSlots(false);
      });
  }, [isOpen, turf, selectedDate]);

  // Fetch user teams
  useEffect(() => {
    if (!currentUser) return;
    fetch(`/api/teams?userId=${currentUser.id}`)
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
        if (data.length > 0 && !selectedTeam) {
          setSelectedTeam(data[0]);
        }
      });
  }, [currentUser]);

  // Hold Timer countdown
  useEffect(() => {
    if (!isHolding || !holdExpiresAt) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((holdExpiresAt - Date.now()) / 1000));
      setHoldTimeRemaining(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        setIsHolding(false);
        addNotification('Hold expired! The slot has been released.', 'error');
        setCurrentStep(2); // return to slot selection
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isHolding, holdExpiresAt, addNotification]);

  if (!isOpen || !turf) return null;

  // Generate advance dates array (e.g. up to turf.advanceBookingDays)
  const maxAdvance = turf.advanceBookingDays || 30;
  const advanceDates = [];
  const today = new Date();
  for (let i = 0; i < Math.min(maxAdvance, 14); i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tmrw' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    advanceDates.push({ dateStr, dayName, formatted });
  }

  // Calculate price dynamically
  const baseSlotPrice = selectedSlot ? selectedSlot.price : turf.pricing?.basePrice || 800;
  const totalAmount = baseSlotPrice * durationHours;

  // Step 5: Acquire temporary lock hold on server
  const handleAcquireHold = async () => {
    if (!selectedSlot) return;
    try {
      const res = await fetch('/api/slots/hold', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          turfId: turf.id,
          date: selectedDate,
          hour: selectedSlot.hour,
          userId: currentUser?.id || 'usr-1',
          userName: currentUser?.name || 'Player',
          teamId: selectedTeam?.id || null,
          durationHours
        })
      });

      const data = await res.json();
      if (!res.ok) {
        addNotification(data.error || 'Failed to hold slot', 'error');
        return;
      }

      setIsHolding(true);
      setHoldExpiresAt(data.expiresAt);
      setCurrentStep(6); // Move to Payment step
    } catch (err) {
      console.error('Error holding slot:', err);
      addNotification('Connection error while securing slot', 'error');
    }
  };

  // Step 6: Create New Team
  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;

    try {
      const res = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser?.id || 'usr-1',
          name: newTeamName,
          sport: turf.sports[0] || 'Football',
          players: newTeamPlayers,
          visibility: newTeamVisibility
        })
      });
      const created = await res.json();
      setTeams((prev) => [...prev, created]);
      setSelectedTeam(created);
      setShowNewTeamForm(false);
      setNewTeamName('');
      addNotification(`Team "${created.name}" created!`, 'success');
    } catch (err) {
      console.error('Failed to create team:', err);
    }
  };

  // Step 7: Confirm Booking & Process Payment
  const handleConfirmPayment = async () => {
    setIsProcessingPayment(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          turfId: turf.id,
          userId: currentUser?.id || 'usr-1',
          userName: currentUser?.name || 'Player',
          teamId: selectedTeam?.id || null,
          teamName: selectedTeam?.name || 'Solo Player',
          isTeamPublic: selectedTeam ? selectedTeam.visibility === 'PUBLIC' : true,
          sport: selectedTeam?.sport || turf.sports[0],
          date: selectedDate,
          startHour: selectedSlot.hour,
          durationHours,
          paymentMethod
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setIsProcessingPayment(false);
        addNotification(data.error || 'Booking could not be confirmed', 'error');
        return;
      }

      // Generate QR Code
      const qrDataUrl = await QRCode.toDataURL(data.booking.qrCodeData, {
        width: 200,
        margin: 1,
        color: { dark: '#020617', light: '#ffffff' }
      });

      setQrCodeUrl(qrDataUrl);
      setConfirmedBooking(data.booking);
      setIsProcessingPayment(false);
      setIsHolding(false);
      setCurrentStep(7); // Show Confirmed Step

      // Celebratory Confetti Micro-Animation
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      fetchUserBookings();
    } catch (err) {
      setIsProcessingPayment(false);
      console.error('Payment error:', err);
      addNotification('Payment transaction failed', 'error');
    }
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4 animate-fade-in">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-white/15 rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between glass-panel">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                Step {currentStep} of 7
              </span>
              {isHolding && (
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 holding-pulse flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" />
                  Hold: {formatTimer(holdTimeRemaining)}
                </span>
              )}
            </div>
            <h3 className="font-extrabold text-base text-white mt-0.5">{turf.name}</h3>
          </div>

          <button 
            onClick={closeBooking}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">

          {/* STEP 1: DATE SELECTION */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-200">1. Select Playing Date</h4>
                <span className="text-xs text-emerald-400 font-semibold">Advance up to {turf.advanceBookingDays} days</span>
              </div>

              {/* Advance Date Carousel */}
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {advanceDates.map((item) => (
                  <button
                    key={item.dateStr}
                    onClick={() => setSelectedDate(item.dateStr)}
                    className={`flex-shrink-0 px-3.5 py-2.5 rounded-xl border text-center transition-all ${
                      selectedDate === item.dateStr
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-black shadow-lg shadow-emerald-500/30 scale-105'
                        : 'glass-panel border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="text-[10px] uppercase">{item.dayName}</div>
                    <div className="text-sm font-black">{item.formatted}</div>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                >
                  <span>Continue to Time Slots</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: AVAILABILITY TIME SLOTS */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-200">2. Select Time Slot</h4>
                  <div className="text-xs text-slate-400">{selectedDate}</div>
                </div>
                <button 
                  onClick={() => setCurrentStep(1)} 
                  className="text-xs text-emerald-400 font-semibold hover:underline"
                >
                  Change Date
                </button>
              </div>

              {/* Status Legend */}
              <div className="flex items-center gap-3 text-[11px] text-slate-400 flex-wrap">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> Available
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-amber-500"></span> Holding
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-slate-600"></span> Booked
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-slate-800 border border-white/10"></span> Blocked
                </span>
              </div>

              {/* Slot Grid */}
              {loadingSlots ? (
                <div className="py-12 text-center text-slate-400 text-xs">Loading live turf availability...</div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {slots.map((slot) => {
                    const isAvailable = slot.status === 'AVAILABLE';
                    const isSelected = selectedSlot?.hour === slot.hour;
                    const isBooked = slot.status === 'BOOKED';
                    const isHoldingSlot = slot.status === 'HOLDING';
                    const isBlocked = slot.status === 'BLOCKED';

                    return (
                      <button
                        key={slot.hour}
                        disabled={!isAvailable}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-xl border text-left transition-all relative ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-md shadow-emerald-500/20 scale-[1.02]'
                            : isAvailable
                            ? 'glass-card border-white/10 text-slate-200 hover:border-emerald-400/50'
                            : isHoldingSlot
                            ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 opacity-80 cursor-not-allowed'
                            : isBooked
                            ? 'bg-slate-800/40 border-slate-700/40 text-slate-400 opacity-70 cursor-not-allowed'
                            : 'bg-slate-900 border-white/5 text-slate-500 opacity-40 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-extrabold text-xs">{slot.timeStr}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            isSelected
                              ? 'bg-emerald-400 text-slate-950'
                              : isAvailable
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : isHoldingSlot
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-slate-700 text-slate-300'
                          }`}>
                            {slot.status}
                          </span>
                        </div>

                        {/* Price or Booked Team info */}
                        {isAvailable ? (
                          <div className="text-[11px] font-black text-emerald-400">
                            ₹{slot.price}
                          </div>
                        ) : isBooked ? (
                          <div className="text-[10px] text-slate-400 truncate">
                            {slot.bookingInfo?.teamName || 'Booked'}
                          </div>
                        ) : isHoldingSlot ? (
                          <div className="text-[10px] text-amber-300 truncate">
                            In checkout
                          </div>
                        ) : (
                          <div className="text-[10px] text-slate-500">Unavailable</div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="pt-2">
                <button
                  disabled={!selectedSlot}
                  onClick={() => setCurrentStep(3)}
                  className={`w-full py-3 rounded-xl font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    selectedSlot
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 active:scale-95'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <span>Select Duration ({selectedSlot ? selectedSlot.timeStr : 'Select Slot'})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DURATION */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-200">3. Select Match Duration</h4>

              <div className="grid grid-cols-3 gap-2.5">
                {[1, 2, 3].map((dur) => (
                  <button
                    key={dur}
                    onClick={() => setDurationHours(dur)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      durationHours === dur
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-black shadow-lg shadow-emerald-500/20 scale-105'
                        : 'glass-panel border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="text-lg font-black">{dur} Hr</div>
                    <div className="text-[11px] font-bold opacity-80">
                      ₹{baseSlotPrice * dur}
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-white/5 text-xs text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span>Slot Time:</span>
                  <span className="font-bold text-white">
                    {selectedSlot.hour}:00 - {selectedSlot.hour + durationHours}:00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Total:</span>
                  <span className="font-bold text-emerald-400">₹{totalAmount}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-3 rounded-xl glass-panel border border-white/10 text-slate-300 text-xs font-bold"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                >
                  <span>Select Team</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: TEAM SELECTION */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-200">4. Select or Create Team</h4>
                <button
                  onClick={() => setShowNewTeamForm(!showNewTeamForm)}
                  className="text-xs text-emerald-400 font-bold flex items-center gap-1 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {showNewTeamForm ? 'Use Existing' : 'New Team'}
                </button>
              </div>

              {showNewTeamForm ? (
                <form onSubmit={handleCreateTeam} className="p-3 rounded-xl glass-panel border border-white/10 space-y-3">
                  <div>
                    <label className="text-xs text-slate-400 font-semibold block mb-1">Team Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Coimbatore Strikers"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-slate-400 font-semibold block mb-1">Players</label>
                      <input
                        type="number"
                        min="2"
                        max="22"
                        value={newTeamPlayers}
                        onChange={(e) => setNewTeamPlayers(parseInt(e.target.value, 10))}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 font-semibold block mb-1">Slot Visibility</label>
                      <select
                        value={newTeamVisibility}
                        onChange={(e) => setNewTeamVisibility(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="PUBLIC">Public</option>
                        <option value="PRIVATE">Private Game</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl"
                  >
                    Save & Select Team
                  </button>
                </form>
              ) : (
                <div className="space-y-2">
                  {teams.map((team) => (
                    <div
                      key={team.id}
                      onClick={() => setSelectedTeam(team)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        selectedTeam?.id === team.id
                          ? 'bg-emerald-500/20 border-emerald-400 text-white'
                          : 'glass-panel border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="font-extrabold text-sm text-white">{team.name}</div>
                        <div className="text-[11px] text-slate-400">
                          {team.sport} • {team.players} players • {team.visibility === 'PUBLIC' ? 'Publicly visible' : 'Private Game'}
                        </div>
                      </div>
                      {selectedTeam?.id === team.id && (
                        <Check className="w-5 h-5 text-emerald-400" />
                      )}
                    </div>
                  ))}

                  {/* Option for Solo Player */}
                  <div
                    onClick={() => setSelectedTeam({ id: 'solo', name: `${currentUser?.name} (Solo)`, sport: turf.sports[0], visibility: 'PRIVATE' })}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedTeam?.id === 'solo'
                        ? 'bg-emerald-500/20 border-emerald-400 text-white'
                        : 'glass-panel border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-white">Book as Solo Player</div>
                      <div className="text-[11px] text-slate-400">Private slot booking</div>
                    </div>
                    {selectedTeam?.id === 'solo' && (
                      <Check className="w-5 h-5 text-emerald-400" />
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-3 rounded-xl glass-panel border border-white/10 text-slate-300 text-xs font-bold"
                >
                  Back
                </button>
                <button
                  disabled={!selectedTeam}
                  onClick={() => setCurrentStep(5)}
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                >
                  <span>Review Booking</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW & HOLD LOCK */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-200">5. Review Game Details</h4>

              <div className="p-3.5 rounded-2xl glass-panel border border-white/10 space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-400">Turf Arena:</span>
                  <span className="font-bold text-white">{turf.name}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-400">Date & Slot:</span>
                  <span className="font-bold text-white">
                    {selectedDate} ({selectedSlot.hour}:00 - {selectedSlot.hour + durationHours}:00)
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-400">Team:</span>
                  <span className="font-bold text-emerald-400">{selectedTeam?.name}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-400">Cancellation Policy:</span>
                  <span className="text-slate-300 text-right max-w-[200px] truncate">{turf.cancellationPolicy}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-white pt-1">
                  <span>Total Payable:</span>
                  <span className="text-emerald-400 text-base">₹{totalAmount}</span>
                </div>
              </div>

              {/* Slot Locking Notice */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
                <Lock className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                <div>
                  <div className="font-bold">Real-time Slot Locking Protection</div>
                  <div className="text-[11px] text-amber-200/80">
                    Clicking "Secure Slot & Pay" locks this slot on the server for 5 minutes while you complete payment, preventing double booking.
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-4 py-3 rounded-xl glass-panel border border-white/10 text-slate-300 text-xs font-bold"
                >
                  Back
                </button>
                <button
                  onClick={handleAcquireHold}
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                >
                  <Lock className="w-4 h-4 stroke-[2.5]" />
                  <span>Secure Slot & Pay (₹{totalAmount})</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: PAYMENT SIMULATION */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-200">6. Choose Payment Method</h4>
                <span className="text-xs font-black text-amber-400 holding-pulse px-2 py-0.5 rounded bg-amber-500/10">
                  ⏱️ Hold: {formatTimer(holdTimeRemaining)}
                </span>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'UPI', label: 'Instant UPI (Google Pay / PhonePe / Paytm)', icon: '⚡' },
                  { id: 'CARD', label: 'Credit / Debit Card', icon: '💳' },
                  { id: 'NET_BANKING', label: 'Net Banking', icon: '🏦' },
                  { id: 'PAY_AT_VENUE', label: 'Pay at Venue (Cash / POS)', icon: '🏟️' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPaymentMethod(item.id)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === item.id
                        ? 'bg-emerald-500/20 border-emerald-400 text-white'
                        : 'glass-panel border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{item.icon}</span>
                      <span className="text-xs font-bold">{item.label}</span>
                    </div>
                    {paymentMethod === item.id && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Amount to pay</div>
                  <div className="text-lg font-black text-emerald-400">₹{totalAmount}</div>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>256-Bit SSL Encrypted</span>
                </div>
              </div>

              <button
                disabled={isProcessingPayment}
                onClick={handleConfirmPayment}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/30 active:scale-95 transition-all"
              >
                {isProcessingPayment ? (
                  <span>Processing Verification...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Pay ₹{totalAmount} & Confirm Slot</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 7: GAME CONFIRMED TICKET */}
          {currentStep === 7 && confirmedBooking && (
            <div className="space-y-4 text-center py-2 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/40">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400">
                  Transaction Successful
                </span>
                <h3 className="text-xl font-black text-white font-['Outfit'] mt-0.5">GAME CONFIRMED</h3>
                <p className="text-xs text-slate-400 mt-0.5">Your pitch reservation has been booked.</p>
              </div>

              {/* Digital Ticket Card with QR Code */}
              <div className="bg-slate-950 border border-white/15 rounded-2xl p-4 text-left relative overflow-hidden shadow-2xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-emerald-400">{confirmedBooking.turfName}</div>
                    <div className="text-[11px] text-slate-400">{confirmedBooking.turfAddress}</div>
                    
                    <div className="mt-3 space-y-1">
                      <div className="text-xs text-slate-300">
                        <span className="text-slate-500">Date: </span>
                        <span className="font-bold text-white">{confirmedBooking.date}</span>
                      </div>
                      <div className="text-xs text-slate-300">
                        <span className="text-slate-500">Time: </span>
                        <span className="font-bold text-white">
                          {confirmedBooking.startTime} - {confirmedBooking.endTime}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300">
                        <span className="text-slate-500">Team: </span>
                        <span className="font-bold text-white">{confirmedBooking.teamName}</span>
                      </div>
                      <div className="text-xs text-slate-300">
                        <span className="text-slate-500">Booking ID: </span>
                        <span className="font-mono text-emerald-400 font-bold">{confirmedBooking.id}</span>
                      </div>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="text-center shrink-0">
                    {qrCodeUrl && (
                      <div className="p-1.5 bg-white rounded-xl shadow-md inline-block">
                        <img src={qrCodeUrl} alt="Booking QR" className="w-24 h-24" />
                      </div>
                    )}
                    <div className="text-[9px] text-slate-400 mt-1 uppercase font-bold">Scan at Venue</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${turf.coordinates?.lat || turf.location?.lat || 11.0168},${turf.coordinates?.lng || turf.location?.lng || 76.9673}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/10"
                  >
                    <Navigation className="w-3.5 h-3.5 text-sky-400" />
                    <span>Get Directions</span>
                  </a>

                  <button
                    onClick={() => {
                      const title = encodeURIComponent(`Match at ${confirmedBooking.turfName}`);
                      const details = encodeURIComponent(`Team: ${confirmedBooking.teamName} (${confirmedBooking.sport})\nBooking ID: #${confirmedBooking.id}`);
                      const location = encodeURIComponent(`${confirmedBooking.turfAddress}, ${confirmedBooking.turfCity || 'Tamil Nadu'}`);
                      const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
                      window.open(googleCalUrl, '_blank');
                    }}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/10"
                  >
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Add to Calendar</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    closeBooking();
                    setCurrentScreen('BOOKINGS');
                  }}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                >
                  <Ticket className="w-4 h-4 stroke-[2.5]" />
                  <span>View in My Bookings</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
