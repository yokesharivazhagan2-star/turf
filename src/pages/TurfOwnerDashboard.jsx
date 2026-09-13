import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  ChevronDown, 
  Plus, 
  Calendar as CalendarIcon, 
  DollarSign, 
  Clock, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Users, 
  ShieldCheck, 
  SlidersHorizontal,
  X,
  TrendingUp,
  MapPin,
  AlertCircle
} from 'lucide-react';

export default function TurfOwnerDashboard() {
  const { 
    currentUser, 
    activeRole, 
    turfs, 
    fetchTurfs, 
    addNotification 
  } = useApp();

  const [ownerTurfs, setOwnerTurfs] = useState([]);
  const [currentTurf, setCurrentTurf] = useState(null);
  const [showTurfDropdown, setShowTurfDropdown] = useState(false);

  // Tab: 'CALENDAR' | 'BOOKINGS' | 'PRICING' | 'OVERVIEW'
  const [activeTab, setActiveTab] = useState('CALENDAR');

  // Calendar State
  const [calendarDate, setCalendarDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [calendarSlots, setCalendarSlots] = useState([]);
  const [calendarBookings, setCalendarBookings] = useState([]);
  const [loadingCalendar, setLoadingCalendar] = useState(false);

  // Add Turf 12-Step Wizard Modal State
  const [showAddTurfWizard, setShowAddTurfWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [newTurfForm, setNewTurfForm] = useState({
    name: '',
    tagline: '',
    description: '',
    address: '',
    area: 'Peelamedu',
    city: 'Coimbatore',
    lat: 11.0315,
    lng: 77.0180,
    sports: ['Football'],
    facilities: ['FIFA Grade Artificial Turf', 'LED Floodlights 500 Lux', 'Car & Bike Parking'],
    imageUrl: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80',
    openTime: '06:00',
    closeTime: '23:00',
    slotDurationMinutes: 60,
    basePrice: 800,
    weekdayRate: 800,
    weekendRate: 1000,
    peakHourRate: 1100,
    offPeakRate: 700,
    advanceBookingDays: 30,
    cancellationPolicy: 'Flexible: 100% refund up to 4 hours prior.',
    rules: 'Proper athletic shoes mandatory. Respect venue rules.'
  });

  // Load owner's turfs
  useEffect(() => {
    if (!currentUser) return;
    fetch(`/api/owner/turfs?ownerId=${currentUser.id}`)
      .then((res) => res.json())
      .then((data) => {
        setOwnerTurfs(data);
        if (data.length > 0 && (!currentTurf || !data.find((t) => t.id === currentTurf.id))) {
          setCurrentTurf(data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, [currentUser, turfs]);

  // Load calendar for selected turf and date
  useEffect(() => {
    if (!currentTurf) return;
    setLoadingCalendar(true);
    fetch(`/api/owner/turfs/${currentTurf.id}/calendar?date=${calendarDate}`)
      .then((res) => res.json())
      .then((data) => {
        setCalendarSlots(data.slots || []);
        setCalendarBookings(data.bookings || []);
        setLoadingCalendar(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingCalendar(false);
      });
  }, [currentTurf, calendarDate]);

  // Toggle slot open / block
  const handleToggleSlot = async (slot) => {
    if (!currentTurf) return;
    const isCurrentlyBlocked = slot.status === 'BLOCKED';
    const newBlockedState = !isCurrentlyBlocked;

    try {
      const res = await fetch(`/api/owner/turfs/${currentTurf.id}/slots/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: calendarDate,
          hour: slot.hour,
          blocked: newBlockedState
        })
      });

      if (res.ok) {
        addNotification(
          `Slot ${slot.timeStr} ${newBlockedState ? 'BLOCKED' : 'OPENED'} for players`,
          'info'
        );
        // refresh calendar
        setCalendarSlots((prev) =>
          prev.map((s) => (s.hour === slot.hour ? { ...s, status: newBlockedState ? 'BLOCKED' : 'AVAILABLE' } : s))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Submit Add Turf Wizard
  const handleAddTurfSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/owner/turfs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ownerId: currentUser.id,
          name: newTurfForm.name,
          tagline: newTurfForm.tagline,
          description: newTurfForm.description,
          address: newTurfForm.address,
          area: newTurfForm.area,
          city: newTurfForm.city,
          coordinates: { lat: parseFloat(newTurfForm.lat), lng: parseFloat(newTurfForm.lng) },
          sports: newTurfForm.sports,
          facilities: newTurfForm.facilities,
          images: [newTurfForm.imageUrl],
          pricing: {
            basePrice: parseInt(newTurfForm.basePrice, 10),
            weekdayRate: parseInt(newTurfForm.weekdayRate, 10),
            weekendRate: parseInt(newTurfForm.weekendRate, 10),
            peakHourRate: parseInt(newTurfForm.peakHourRate, 10),
            offPeakRate: parseInt(newTurfForm.offPeakRate, 10)
          },
          openingHours: { open: newTurfForm.openTime, close: newTurfForm.closeTime },
          slotDurationMinutes: parseInt(newTurfForm.slotDurationMinutes, 10),
          advanceBookingDays: parseInt(newTurfForm.advanceBookingDays, 10),
          cancellationPolicy: newTurfForm.cancellationPolicy,
          rules: [newTurfForm.rules]
        })
      });

      const data = await res.json();
      if (!res.ok) {
        addNotification(data.error || 'Failed to submit turf', 'error');
        return;
      }

      addNotification('✨ Turf registered! It has been submitted for Platform Admin approval.', 'success');
      setShowAddTurfWizard(false);
      setWizardStep(1);
      fetchTurfs();
    } catch (err) {
      console.error(err);
      addNotification('Error submitting turf registration', 'error');
    }
  };

  return (
    <div className="min-h-screen pb-28 relative z-10 px-4 pt-4 max-w-7xl mx-auto">
      
      {/* Top Owner Bar with Multi-Turf Switcher */}
      <div className="glass-panel p-4 rounded-3xl border border-white/10 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div>
          <div className="text-[10px] uppercase font-black tracking-widest text-sky-400 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" />
            <span>TURF OWNER BUSINESS APP • {currentUser?.name}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] mt-0.5">
            Sports Arena Control Hub
          </h1>
        </div>

        {/* SECTION 23: MULTI-TURF SWITCHER DROPDOWN */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowTurfDropdown(!showTurfDropdown)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 border border-sky-500/40 text-xs font-black text-white hover:border-sky-400 transition-colors shadow-lg"
            >
              <span className="text-slate-400 font-normal">CURRENT TURF:</span>
              <span className="text-sky-300 font-extrabold">{currentTurf?.name || 'No Turf Selected'}</span>
              <ChevronDown className="w-4 h-4 text-sky-400" />
            </button>

            {showTurfDropdown && (
              <div className="absolute top-full right-0 mt-2 w-72 glass-panel rounded-2xl border border-white/20 shadow-2xl p-2 z-50 animate-slide-up">
                <div className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1.5 border-b border-white/10 flex items-center justify-between">
                  <span>My Turfs ({ownerTurfs.length})</span>
                  <span className="text-sky-400">Independent Arenas</span>
                </div>

                <div className="space-y-1 py-1 max-h-60 overflow-y-auto no-scrollbar">
                  {ownerTurfs.map((t, idx) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setCurrentTurf(t);
                        setShowTurfDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        currentTurf?.id === t.id
                          ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <div>
                        <div className="font-bold">{t.name}</div>
                        <div className="text-[10px] text-slate-400">{t.area} • {t.sports.join(', ')}</div>
                      </div>
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                        t.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {t.status}
                      </span>
                    </button>
                  ))}
                </div>

                {/* + ADD TURF BUTTON */}
                <button
                  onClick={() => {
                    setShowTurfDropdown(false);
                    setShowAddTurfWizard(true);
                  }}
                  className="w-full mt-1.5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>+ ADD NEW TURF</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowAddTurfWizard(true)}
            className="hidden sm:flex items-center gap-1 px-3 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Turf</span>
          </button>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
        {[
          { id: 'CALENDAR', label: 'Visual Calendar & Slots', icon: CalendarIcon },
          { id: 'BOOKINGS', label: 'All Bookings & Players', icon: Users },
          { id: 'PRICING', label: 'Dynamic Pricing Settings', icon: DollarSign },
          { id: 'OVERVIEW', label: 'Arena Profile & Rules', icon: SlidersHorizontal },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-sky-500 text-slate-950 font-black shadow-lg shadow-sky-500/25 scale-105'
                  : 'glass-panel text-slate-300 hover:border-white/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: VISUAL CALENDAR (SECTION 25) */}
      {activeTab === 'CALENDAR' && (
        <div className="space-y-6">
          <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <span>Slot Availability & Blocking</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-sky-300 font-bold">
                    {currentTurf?.name}
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Click any slot to immediately OPEN or BLOCK for players, or inspect team bookings.
                </p>
              </div>

              {/* Date Selector */}
              <input
                type="date"
                value={calendarDate}
                onChange={(e) => setCalendarDate(e.target.value)}
                className="bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            {/* Hourly Slot Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {loadingCalendar ? (
                <div className="col-span-full py-12 text-center text-slate-400 text-xs">
                  Loading slots for {calendarDate}...
                </div>
              ) : (
                calendarSlots.map((slot) => {
                  const isBlocked = slot.status === 'BLOCKED';
                  const isBooked = slot.status === 'BOOKED';
                  const isHolding = slot.status === 'HOLDING';

                  return (
                    <div
                      key={slot.hour}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                        isBlocked
                          ? 'bg-slate-950 border-white/5 text-slate-500 opacity-60'
                          : isBooked
                          ? 'bg-slate-900 border-sky-500/30 text-white'
                          : isHolding
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                          : 'glass-card border-white/10 text-slate-200'
                      }`}
                    >
                      <div>
                        <div className="font-extrabold text-sm text-white">{slot.timeLabel}</div>
                        
                        {isBooked ? (
                          <div className="text-xs text-sky-400 font-bold mt-0.5">
                            ⚽ {slot.bookingInfo?.teamName || 'Booked Match'}
                          </div>
                        ) : isHolding ? (
                          <div className="text-xs text-amber-400 font-bold mt-0.5">
                            ⏱️ In Checkout ({slot.bookingInfo?.holderName || 'Player'})
                          </div>
                        ) : isBlocked ? (
                          <div className="text-xs text-slate-500 font-bold mt-0.5">
                            ⛔ Blocked by Owner
                          </div>
                        ) : (
                          <div className="text-xs text-emerald-400 font-bold mt-0.5">
                            ₹{slot.price} • Available
                          </div>
                        )}
                      </div>

                      {/* Action Button: Block or Open */}
                      <div>
                        {!isBooked && !isHolding && (
                          <button
                            onClick={() => handleToggleSlot(slot)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                              isBlocked
                                ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                                : 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                            }`}
                          >
                            {isBlocked ? 'Open Slot' : 'Block Slot'}
                          </button>
                        )}

                        {isBooked && (
                          <span className="px-2 py-1 rounded-lg bg-sky-500/20 text-sky-300 text-[10px] font-black uppercase">
                            Booked
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: BOOKINGS LIST */}
      {activeTab === 'BOOKINGS' && (
        <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-4">
          <h2 className="text-lg font-black text-white">Bookings for {currentTurf?.name}</h2>
          <div className="space-y-3">
            {calendarBookings.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No bookings registered for this date yet.</p>
            ) : (
              calendarBookings.map((b) => (
                <div key={b.id} className="p-4 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">{b.teamName}</div>
                    <div className="text-xs text-slate-400">
                      Player: {b.userName} • Time: {b.startTime} - {b.endTime} • Amount: ₹{b.amount}
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 font-black font-mono">#{b.id}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: DYNAMIC PRICING SETTINGS (SECTION 26) */}
      {activeTab === 'PRICING' && (
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
          <div>
            <h2 className="text-lg font-black text-white">Dynamic Pricing Engine</h2>
            <p className="text-xs text-slate-400">
              Set automated price multipliers for {currentTurf?.name}. The player booking engine computes these rates automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 space-y-2">
              <label className="text-xs font-bold text-slate-400 block">Weekday Hourly Rate</label>
              <div className="text-2xl font-black text-white">₹{currentTurf?.pricing?.weekdayRate}</div>
              <p className="text-[11px] text-slate-500">Applies Monday to Friday standard hours.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 space-y-2">
              <label className="text-xs font-bold text-sky-400 block">Weekend Rate</label>
              <div className="text-2xl font-black text-sky-300">₹{currentTurf?.pricing?.weekendRate}</div>
              <p className="text-[11px] text-slate-500">Applies Saturday and Sunday.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 space-y-2">
              <label className="text-xs font-bold text-amber-400 block">Peak Hours (6 PM - 10 PM)</label>
              <div className="text-2xl font-black text-amber-300">₹{currentTurf?.pricing?.peakHourRate}</div>
              <p className="text-[11px] text-slate-500">High-demand evening floodlight hours.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 space-y-2">
              <label className="text-xs font-bold text-emerald-400 block">Off-Peak (5 AM - 3 PM)</label>
              <div className="text-2xl font-black text-emerald-300">₹{currentTurf?.pricing?.offPeakRate}</div>
              <p className="text-[11px] text-slate-500">Early morning training slots.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ARENA PROFILE OVERVIEW */}
      {activeTab === 'OVERVIEW' && (
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h2 className="text-lg font-black text-white">{currentTurf?.name} Information</h2>
          <div className="text-xs text-slate-300 space-y-2">
            <p><span className="text-slate-500 font-bold">Address: </span>{currentTurf?.address}</p>
            <p><span className="text-slate-500 font-bold">Area: </span>{currentTurf?.area}, {currentTurf?.city}</p>
            <p><span className="text-slate-500 font-bold">Sports: </span>{currentTurf?.sports.join(', ')}</p>
            <p><span className="text-slate-500 font-bold">Facilities: </span>{currentTurf?.facilities.join(' · ')}</p>
            <p><span className="text-slate-500 font-bold">Advance Booking Period: </span>{currentTurf?.advanceBookingDays} Days</p>
            <p><span className="text-slate-500 font-bold">Cancellation Policy: </span>{currentTurf?.cancellationPolicy}</p>
          </div>
        </div>
      )}

      {/* SECTION 24: ADD NEW TURF 12-STEP WIZARD MODAL */}
      {showAddTurfWizard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="w-full max-w-xl bg-slate-950 border border-white/20 rounded-3xl p-6 relative shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-slide-up">
            
            <button
              onClick={() => setShowAddTurfWizard(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400">
                12-Field Onboarding Wizard
              </span>
              <h3 className="text-xl font-black text-white font-['Outfit'] mt-0.5">
                Register New Sports Arena
              </h3>
              <p className="text-xs text-slate-400">
                Once submitted, your turf will be reviewed by the Platform Admin before appearing publicly.
              </p>
            </div>

            <form onSubmit={handleAddTurfSubmit} className="space-y-4">
              
              {/* 1. Name */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">1. Turf Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Football Arena"
                  value={newTurfForm.name}
                  onChange={(e) => setNewTurfForm({ ...newTurfForm, name: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* 2. Photo URL */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">2. Photo URL</label>
                <input
                  type="url"
                  required
                  value={newTurfForm.imageUrl}
                  onChange={(e) => setNewTurfForm({ ...newTurfForm, imageUrl: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* 3. Sports & 4. Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">3. Sports Supported</label>
                  <select
                    multiple
                    value={newTurfForm.sports}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions, (option) => option.value);
                      setNewTurfForm({ ...newTurfForm, sports: selected });
                    }}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 h-20"
                  >
                    <option value="Football">Football</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Badminton">Badminton</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Volleyball">Volleyball</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">4. Address, Area & City</label>
                  <input
                    type="text"
                    required
                    placeholder="Street Address"
                    value={newTurfForm.address}
                    onChange={(e) => setNewTurfForm({ ...newTurfForm, address: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 mb-2"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Area (e.g. Anna Nagar / Peelamedu)"
                      value={newTurfForm.area}
                      onChange={(e) => setNewTurfForm({ ...newTurfForm, area: e.target.value })}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                    <input
                      type="text"
                      required
                      placeholder="City (e.g. Chennai / Madurai)"
                      value={newTurfForm.city}
                      onChange={(e) => setNewTurfForm({ ...newTurfForm, city: e.target.value })}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* 5. GPS Coordinates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">5. GPS Latitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={newTurfForm.lat}
                    onChange={(e) => setNewTurfForm({ ...newTurfForm, lat: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">GPS Longitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={newTurfForm.lng}
                    onChange={(e) => setNewTurfForm({ ...newTurfForm, lng: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* 6. Facilities & 7. Opening Hours */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">6. Open Time</label>
                  <input
                    type="text"
                    value={newTurfForm.openTime}
                    onChange={(e) => setNewTurfForm({ ...newTurfForm, openTime: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">7. Close Time</label>
                  <input
                    type="text"
                    value={newTurfForm.closeTime}
                    onChange={(e) => setNewTurfForm({ ...newTurfForm, closeTime: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* 8. Slot Duration & 9. Dynamic Pricing */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">8. Base Price (₹)</label>
                  <input
                    type="number"
                    value={newTurfForm.basePrice}
                    onChange={(e) => setNewTurfForm({ ...newTurfForm, basePrice: e.target.value, weekdayRate: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">9. Weekend Rate (₹)</label>
                  <input
                    type="number"
                    value={newTurfForm.weekendRate}
                    onChange={(e) => setNewTurfForm({ ...newTurfForm, weekendRate: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Peak Rate (₹)</label>
                  <input
                    type="number"
                    value={newTurfForm.peakHourRate}
                    onChange={(e) => setNewTurfForm({ ...newTurfForm, peakHourRate: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* 10. Advance Booking & 11. Cancellation */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">10. Advance Window (Days)</label>
                  <select
                    value={newTurfForm.advanceBookingDays}
                    onChange={(e) => setNewTurfForm({ ...newTurfForm, advanceBookingDays: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="7">7 Days</option>
                    <option value="14">14 Days</option>
                    <option value="30">30 Days</option>
                    <option value="60">60 Days</option>
                    <option value="90">90 Days</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">11. Cancellation Policy</label>
                  <input
                    type="text"
                    value={newTurfForm.cancellationPolicy}
                    onChange={(e) => setNewTurfForm({ ...newTurfForm, cancellationPolicy: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* 12. Submit */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
              >
                12. Submit Registration for Admin Approval
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
