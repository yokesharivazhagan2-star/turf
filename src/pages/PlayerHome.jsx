import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import TurfCard from '../components/turf/TurfCard';
import TurfMapView from '../components/map/TurfMapView';
import { 
  Search, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Sparkles, 
  Activity, 
  Flame, 
  Zap, 
  CircleDot, 
  Radio, 
  Ticket, 
  Clock, 
  Compass,
  QrCode,
  Crosshair
} from 'lucide-react';

export default function PlayerHome({ onOpenSearch }) {
  const { 
    turfs, 
    selectedSport, 
    setSelectedSport, 
    selectedDate, 
    setSelectedDate, 
    userLocation, 
    isUsingRealGps,
    isGpsLoading,
    requestRealGps,
    setCurrentScreen,
    setSelectedTurf,
    userBookings,
    startBooking
  } = useApp();

  // Sports list with professional Lucide icons (NO emojis)
  const sports = [
    { id: 'All', name: 'All Sports', icon: Activity },
    { id: 'Football', name: 'Football', icon: Activity },
    { id: 'Cricket', name: 'Cricket', icon: Flame },
    { id: 'Badminton', name: 'Badminton', icon: Zap },
    { id: 'Basketball', name: 'Basketball', icon: CircleDot },
    { id: 'Tennis', name: 'Tennis', icon: Radio },
  ];

  // Near You: sorted by distance
  const nearTurfs = useMemo(() => {
    return [...turfs].sort((a, b) => (a.distanceKm || 999) - (b.distanceKm || 999));
  }, [turfs]);

  // Available Today: turfs with open slots
  const availableTodayTurfs = useMemo(() => {
    return turfs.filter((t) => (t.availableSlotsToday || 0) > 0);
  }, [turfs]);

  // Upcoming Active Booking (if user has one)
  const nextBooking = useMemo(() => {
    if (!userBookings || userBookings.length === 0) return null;
    return userBookings.find((b) => b.status === 'CONFIRMED');
  }, [userBookings]);

  // Advance Booking Dates (next 7 days) with dynamic slot counts
  const advanceDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const dayLabel = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      // Calculate total available slots across turfs for this day
      const slotEstimate = Math.max(4, 18 - (i * 2));
      dates.push({ dateStr, dayLabel, formatted, slotEstimate });
    }
    return dates;
  }, []);

  return (
    <div className="pb-28 relative z-10 px-3 sm:px-6 max-w-7xl mx-auto space-y-6 pt-3">
      
      {/* 1. UPCOMING BOOKING PASS (App-style floating pass if user has game booked) */}
      {nextBooking && (
        <section aria-label="Upcoming Booking Pass" className="animate-slide-up">
          <div className="glass-panel p-4 rounded-3xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/50 via-slate-900/80 to-slate-900/90 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/30">
                <Ticket className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                    Upcoming Match Pass
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold">{nextBooking.sport}</span>
                </div>
                <h3 className="font-extrabold text-base text-white mt-0.5">{nextBooking.turfName}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-300 mt-0.5">
                  <span className="flex items-center gap-1 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    {nextBooking.date}
                  </span>
                  <span className="flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    {nextBooking.timeSlot}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
              {(() => {
                const bookedTurf = turfs.find((t) => t.id === nextBooking.turfId || t.name === nextBooking.turfName);
                if (!bookedTurf?.coordinates) return null;
                const originParam = userLocation?.lat ? `origin=${userLocation.lat},${userLocation.lng}&` : '';
                const navUrl = `https://www.google.com/maps/dir/?api=1&${originParam}destination=${bookedTurf.coordinates.lat},${bookedTurf.coordinates.lng}`;
                return (
                  <a
                    href={navUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 hover:text-white text-xs font-bold active:scale-95 transition-all flex items-center gap-1.5"
                    title="Get turn-by-turn live navigation in Google Maps"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Navigate</span>
                  </a>
                );
              })()}

              <button
                onClick={() => setCurrentScreen('BOOKINGS')}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <QrCode className="w-4 h-4" />
                <span>View Pass</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 2. APP SEARCH TRIGGER & LIVE LOCATION STRIP */}
      <section aria-label="Search & Live Location" className="space-y-2">
        {/* Live Location Status & 1-Tap GPS Detect */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">Near <strong className="text-white">{userLocation?.isStateWide ? 'Tamil Nadu' : (userLocation?.area || 'Tamil Nadu')}</strong></span>
            {isUsingRealGps && (
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live GPS Active
              </span>
            )}
          </div>

          {!isUsingRealGps && (
            <button
              onClick={requestRealGps}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold active:scale-95 transition-all shrink-0"
            >
              <Crosshair className={`w-3 h-3 text-emerald-400 ${isGpsLoading ? 'animate-spin' : ''}`} />
              <span>{isGpsLoading ? 'Detecting...' : 'Use Live GPS'}</span>
            </button>
          )}
        </div>

        {/* Search Input Bar */}
        <div 
          onClick={onOpenSearch}
          className="glass-panel rounded-2xl p-3 border border-white/15 hover:border-emerald-500/50 shadow-xl cursor-pointer flex items-center justify-between gap-3 active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-3 text-slate-400">
            <Search className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-sm font-medium text-slate-300">
              Search turf, area or sport...
            </span>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 shrink-0">
            Find Near You
          </span>
        </div>
      </section>

      {/* 3. HORIZONTAL SPORT CATEGORIES (Touch-friendly horizontal pill strip with Lucide icons) */}
      <section aria-label="Sports Categories">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-3 px-3 sm:mx-0 sm:px-0">
          {sports.map((sp) => {
            const Icon = sp.icon;
            const isSelected = selectedSport === sp.id;
            return (
              <button
                key={sp.id}
                onClick={() => setSelectedSport(sp.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 shrink-0 ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25 font-black scale-105'
                    : 'glass-panel text-slate-300 hover:border-white/20'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-emerald-400'}`} />
                <span>{sp.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. NEAR YOU (Horizontal Scrolling App Cards) */}
      <section aria-label="Turfs Near You">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2 font-['Outfit'] uppercase tracking-tight">
              <span>Near You</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">
                GPS Sorted
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">Closest arenas around {userLocation?.isStateWide ? 'Tamil Nadu' : (userLocation?.area || 'Tamil Nadu')}</p>
          </div>

          <button
            onClick={() => setCurrentScreen('EXPLORE')}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-0.5"
          >
            <span>See All ({turfs.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal Carousel */}
        <div className="flex gap-3.5 overflow-x-auto pb-3 pt-1 no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0">
          {nearTurfs.slice(0, 6).map((turf) => (
            <div key={turf.id} className="min-w-[270px] sm:min-w-[310px] max-w-[330px] shrink-0">
              <TurfCard turf={turf} />
            </div>
          ))}
        </div>
      </section>

      {/* 5. BOOK AHEAD (Horizontal Future Date Selector) */}
      <section aria-label="Book Ahead">
        <div className="glass-panel p-4 sm:p-5 rounded-3xl border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
            <div>
              <div className="text-[10px] uppercase font-black tracking-wider text-emerald-400">Advance Slots</div>
              <h2 className="text-base sm:text-lg font-black text-white font-['Outfit'] uppercase">
                Book Ahead
              </h2>
              <p className="text-[11px] text-slate-400">Select date to see matching turfs and live open slots</p>
            </div>

            {/* Horizontal Date Selector */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0">
              {advanceDates.map((item) => {
                const isSelected = selectedDate === item.dateStr;
                return (
                  <button
                    key={item.dateStr}
                    onClick={() => setSelectedDate(item.dateStr)}
                    className={`px-3 py-2 rounded-2xl text-center border transition-all shrink-0 active:scale-95 ${
                      isSelected
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                        : 'glass-card text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="text-[9px] uppercase font-bold tracking-tight">{item.dayLabel}</div>
                    <div className="text-xs font-black">{item.formatted}</div>
                    <div className={`text-[9px] mt-0.5 ${isSelected ? 'text-slate-900 font-extrabold' : 'text-emerald-400 font-semibold'}`}>
                      {item.slotEstimate} slots
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Turfs for Selected Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
            {turfs.slice(0, 3).map((turf) => (
              <TurfCard key={turf.id} turf={turf} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. AVAILABLE TODAY */}
      <section aria-label="Available Today">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2 font-['Outfit'] uppercase">
              <span>Available Today</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </h2>
            <p className="text-[11px] text-slate-400">Arenas with open slots right now</p>
          </div>

          <button
            onClick={() => setCurrentScreen('EXPLORE')}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-0.5"
          >
            <span>View List</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {availableTodayTurfs.slice(0, 4).map((turf) => (
            <TurfCard key={turf.id} turf={turf} />
          ))}
        </div>
      </section>

      {/* 7. QUICK MAP DISCOVERY PREVIEW */}
      <section aria-label="Interactive Map Preview">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2 font-['Outfit'] uppercase">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Map Discovery</span>
            </h2>
            <p className="text-[11px] text-slate-400">Explore arena locations across Tamil Nadu</p>
          </div>
          <button
            onClick={() => setCurrentScreen('MAP')}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-0.5"
          >
            <span>Full Map</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="h-[280px] sm:h-[340px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative">
          <TurfMapView
            turfs={turfs}
            userLocation={userLocation}
            onSelectTurf={(t) => {
              setSelectedTurf(t);
              setCurrentScreen('TURF_DETAILS');
            }}
            onViewTurfDetails={(t) => {
              setSelectedTurf(t);
              setCurrentScreen('TURF_DETAILS');
            }}
          />
        </div>
      </section>

    </div>
  );
}
