import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import TurfMapView from '../components/map/TurfMapView';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Calendar, 
  Share2, 
  Heart, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  Lock, 
  AlertCircle,
  Navigation 
} from 'lucide-react';

export default function TurfDetails() {
  const { 
    selectedTurf, 
    setCurrentScreen, 
    startBooking, 
    userLocation,
    addNotification 
  } = useApp();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSlotForBooking, setSelectedSlotForBooking] = useState(null);

  useEffect(() => {
    if (!selectedTurf) return;
    setLoadingSlots(true);
    fetch(`/api/turfs/${selectedTurf.id}/slots?date=${selectedDate}`)
      .then((res) => res.json())
      .then((data) => {
        setSlots(data.slots || []);
        setLoadingSlots(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingSlots(false);
      });
  }, [selectedTurf, selectedDate]);

  // Generate advance dates (next 14 days)
  const advanceDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dates.push({ dateStr, dayName, monthDay });
    }
    return dates;
  }, []);

  if (!selectedTurf) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-slate-400 mb-4">No turf selected</p>
          <button
            onClick={() => setCurrentScreen('HOME')}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addNotification('Link copied to clipboard!', 'success');
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    addNotification(!isFavorite ? 'Added to Saved Arenas' : 'Removed from Saved Arenas', 'info');
  };

  // Find first available slot price or base price
  const startingRate = selectedTurf.pricing?.basePrice || 800;

  return (
    <div className="min-h-screen pb-32 relative z-10">
      
      {/* 1. TOP HERO MEDIA AREA (Back Button, Favorite, Share Overlaid) */}
      <div className="relative aspect-[16/10] sm:aspect-[21/9] bg-slate-950 overflow-hidden">
        <img
          src={selectedTurf.images?.[activeImageIdx] || selectedTurf.images?.[0]}
          alt={selectedTurf.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/60" />

        {/* Top Floating App Bar */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
          <button
            onClick={() => setCurrentScreen('HOME')}
            className="p-2.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15 text-white active:scale-95 transition-transform"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleFavorite}
              className="p-2.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15 text-white active:scale-95 transition-transform"
              aria-label="Favorite"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-white'}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15 text-white active:scale-95 transition-transform"
              aria-label="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Multiple Photo Dots */}
        {selectedTurf.images?.length > 1 && (
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 z-20">
            {selectedTurf.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  activeImageIdx === idx ? 'w-6 bg-emerald-400' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        )}

        {/* Hero Bottom Info Overlay */}
        <div className="absolute bottom-3 left-4 right-16 z-20">
          <div className="flex items-center gap-1.5 flex-wrap mb-1">
            {selectedTurf.sports?.map((s) => (
              <span key={s} className="px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                {s}
              </span>
            ))}
            {selectedTurf.distanceKm && (
              <span className="glass-panel px-2 py-0.5 rounded-md text-[10px] font-bold text-sky-300 border border-sky-500/30 flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-sky-400" />
                {selectedTurf.distanceKm} km away
              </span>
            )}
          </div>
          <h1 className="font-black text-xl sm:text-3xl text-white font-['Outfit'] truncate leading-tight">
            {selectedTurf.name}
          </h1>
          <p className="text-xs text-slate-300 mt-0.5 truncate">
            {selectedTurf.area}, {selectedTurf.city}
          </p>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="px-3 sm:px-6 max-w-5xl mx-auto pt-4 space-y-6">

        {/* 2. QUICK SPECS / AMENITIES BADGES */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <div className="glass-panel px-3 py-2 rounded-2xl border border-white/10 shrink-0 text-center min-w-[100px]">
            <div className="text-[9px] uppercase font-bold text-slate-400">Turf Surface</div>
            <div className="text-xs font-black text-emerald-400 mt-0.5">50mm FIFA Monofilament</div>
          </div>
          <div className="glass-panel px-3 py-2 rounded-2xl border border-white/10 shrink-0 text-center min-w-[100px]">
            <div className="text-[9px] uppercase font-bold text-slate-400">Lighting</div>
            <div className="text-xs font-black text-sky-400 mt-0.5">500 Lux Flicker-Free</div>
          </div>
          <div className="glass-panel px-3 py-2 rounded-2xl border border-white/10 shrink-0 text-center min-w-[100px]">
            <div className="text-[9px] uppercase font-bold text-slate-400">Hours</div>
            <div className="text-xs font-black text-white mt-0.5">
              {selectedTurf.openingHours?.open} – {selectedTurf.openingHours?.close}
            </div>
          </div>
          <div className="glass-panel px-3 py-2 rounded-2xl border border-white/10 shrink-0 text-center min-w-[100px]">
            <div className="text-[9px] uppercase font-bold text-slate-400">Advance Lock</div>
            <div className="text-xs font-black text-amber-400 mt-0.5">
              {selectedTurf.advanceBookingDays || 30} Days Ahead
            </div>
          </div>
        </div>

        {/* 3. HORIZONTAL DATE SELECTOR */}
        <section aria-label="Select Match Date">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Select Date</span>
            </h2>
            <span className="text-[11px] font-bold text-emerald-400">
              {selectedDate}
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0">
            {advanceDates.map((item) => {
              const isSelected = selectedDate === item.dateStr;
              return (
                <button
                  key={item.dateStr}
                  onClick={() => {
                    setSelectedDate(item.dateStr);
                    setSelectedSlotForBooking(null);
                  }}
                  className={`px-3.5 py-2.5 rounded-2xl text-center border transition-all shrink-0 active:scale-95 ${
                    isSelected
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                      : 'glass-card text-slate-300 hover:border-white/20'
                  }`}
                >
                  <div className="text-[9px] uppercase font-bold">{item.dayName}</div>
                  <div className="text-xs font-black mt-0.5">{item.monthDay}</div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 4. AVAILABILITY UI: LARGE TOUCH-FRIENDLY SLOT CARDS */}
        <section aria-label="Live Slot Availability">
          <div className="flex items-center justify-between mb-2.5">
            <div>
              <h2 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Available Slots</span>
              </h2>
              <p className="text-[10px] text-slate-400">Tap a slot to lock and proceed with team booking</p>
            </div>

            {/* Status Legend */}
            <div className="hidden sm:flex items-center gap-3 text-[10px] font-bold">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Available
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-slate-600" /> Booked
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> Holding
              </span>
            </div>
          </div>

          {loadingSlots ? (
            <div className="py-12 text-center text-slate-400 glass-panel rounded-3xl border border-white/10">
              <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs font-bold">Checking real-time slot lock matrix...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {slots.map((slot) => {
                const isAvail = slot.status === 'AVAILABLE';
                const isHolding = slot.status === 'HOLDING';
                const isBooked = slot.status === 'BOOKED';
                const isBlocked = slot.status === 'BLOCKED';
                const isSelected = selectedSlotForBooking?.hour === slot.hour;

                return (
                  <div
                    key={slot.hour}
                    onClick={() => {
                      if (isAvail) {
                        setSelectedSlotForBooking(slot);
                      }
                    }}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      isAvail
                        ? isSelected
                          ? 'bg-emerald-500/25 border-emerald-400 shadow-md shadow-emerald-500/20 ring-1 ring-emerald-400 cursor-pointer'
                          : 'glass-card border-emerald-500/30 hover:border-emerald-400 cursor-pointer active:scale-98'
                        : isHolding
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                        : isBooked
                        ? 'bg-slate-900/60 border-white/5 opacity-70'
                        : 'bg-slate-950 border-white/5 opacity-40'
                    }`}
                  >
                    <div>
                      <div className="font-extrabold text-sm text-white">{slot.timeLabel}</div>
                      
                      {isAvail ? (
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-black text-emerald-400">₹{slot.price}</span>
                          <span className="text-[9px] font-bold text-emerald-400/80 px-1.5 py-0.2 rounded bg-emerald-500/10 uppercase">
                            AVAILABLE
                          </span>
                        </div>
                      ) : isBooked ? (
                        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <span className="font-semibold text-slate-500 uppercase">BOOKED</span>
                          <span>•</span>
                          <span className="font-bold text-slate-300 truncate max-w-[120px]">
                            {slot.bookingInfo?.teamName || 'Reserved Team'}
                          </span>
                        </div>
                      ) : isHolding ? (
                        <div className="text-[10px] text-amber-400 flex items-center gap-1 mt-0.5 font-bold">
                          <Lock className="w-3 h-3" />
                          <span>HOLDING (LOCK TIMER)</span>
                        </div>
                      ) : (
                        <div className="text-[10px] text-slate-500 uppercase font-bold">BLOCKED</div>
                      )}
                    </div>

                    <div>
                      {isAvail ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startBooking(selectedTurf, selectedDate, slot);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20 active:scale-95 flex items-center gap-0.5"
                        >
                          <span>BOOK</span>
                          <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      ) : (
                        <span className="text-[9px] uppercase font-bold px-2 py-1 rounded bg-white/5 text-slate-400">
                          {slot.status}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* 5. FACILITIES & AMENITIES */}
        <section aria-label="Facilities">
          <h2 className="text-sm font-black uppercase tracking-wider text-white mb-2.5">
            Arena Facilities & Perks
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {selectedTurf.facilities?.map((f) => (
              <div key={f} className="glass-panel p-2.5 rounded-xl border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200 truncate">{f}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 6. LOCATION & MAP */}
        <section aria-label="Venue Location">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Location & Directions</span>
            </h2>
            <button
              onClick={() => {
                const destLat = selectedTurf.coordinates?.lat || selectedTurf.location?.lat || 11.0168;
                const destLng = selectedTurf.coordinates?.lng || selectedTurf.location?.lng || 76.9558;
                const originParam = userLocation?.lat ? `origin=${userLocation.lat},${userLocation.lng}&` : '';
                const url = `https://www.google.com/maps/dir/?api=1&${originParam}destination=${destLat},${destLng}`;
                window.open(url, '_blank');
              }}
              className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/15 border border-sky-500/30 active:scale-95 transition-all"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Live Navigation</span>
            </button>
          </div>

          <div className="h-[220px] rounded-3xl overflow-hidden shadow-xl border border-white/10">
            <TurfMapView
              turfs={[selectedTurf]}
              userLocation={userLocation}
              selectedTurfId={selectedTurf.id}
              className="w-full h-full"
            />
          </div>
        </section>

      </div>

      {/* 7. STICKY BOOKING CTA BAR (Fixed above bottom navigation) */}
      <aside 
        aria-label="Sticky Booking Bar"
        className="fixed bottom-14 sm:bottom-0 left-0 right-0 z-30 glass-panel border-t border-white/15 px-4 py-3 bg-slate-950/95 backdrop-blur-xl"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">
              {selectedSlotForBooking ? `Slot ${selectedSlotForBooking.timeLabel}` : 'Starting rate'}
            </div>
            <div className="text-base sm:text-xl font-black text-emerald-400 font-['Outfit']">
              ₹{selectedSlotForBooking ? selectedSlotForBooking.price : startingRate}
              <span className="text-xs text-slate-400 font-normal"> /hr</span>
            </div>
          </div>

          <button
            onClick={() => startBooking(selectedTurf, selectedDate, selectedSlotForBooking)}
            className="px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/30 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span>{selectedSlotForBooking ? 'Confirm & Book Slot' : 'Select Slot'}</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </aside>

    </div>
  );
}
