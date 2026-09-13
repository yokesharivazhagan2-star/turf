import React from 'react';
import { MapPin, ChevronRight, Activity, Flame, Zap, CircleDot } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function TurfCard({ turf, onSelect, onBookNow }) {
  const { setSelectedTurf, setCurrentScreen, startBooking } = useApp();

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(turf);
    } else {
      setSelectedTurf(turf);
      setCurrentScreen('TURF_DETAILS');
    }
  };

  const handleBookClick = (e) => {
    e.stopPropagation();
    if (onBookNow) {
      onBookNow(turf);
    } else {
      startBooking(turf);
    }
  };

  return (
    <article
      onClick={handleCardClick}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between border border-white/10 hover:border-emerald-500/40 transition-all duration-300 relative select-none"
    >
      {/* Turf Photo with Overlay Gradients */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={turf.images?.[0] || 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80'}
          alt={turf.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Distance Badge & Rating */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {turf.distanceKm !== null && turf.distanceKm !== undefined ? (
            <span className="glass-panel px-2 py-0.5 rounded-full text-[10px] font-bold text-sky-300 flex items-center gap-1 border border-sky-500/30">
              <MapPin className="w-2.5 h-2.5 text-sky-400" />
              {turf.distanceKm} km away
            </span>
          ) : (
            <span className="glass-panel px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-300">
              {turf.area}
            </span>
          )}

          {turf.rating > 0 ? (
            <span className="glass-panel px-2 py-0.5 rounded-full text-[10px] font-black text-amber-300 flex items-center gap-0.5 border border-amber-500/20">
              ★ {turf.rating}
              <span className="text-[9px] text-slate-400 font-normal">({turf.ratingCount})</span>
            </span>
          ) : (
            <span className="glass-panel px-2 py-0.5 rounded-full text-[10px] font-semibold text-emerald-300">
              Verified
            </span>
          )}
        </div>

        {/* Sport Tags on Image Bottom */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 flex-wrap pointer-events-none">
          {turf.sports?.slice(0, 3).map((sport) => (
            <span
              key={sport}
              className="bg-slate-950/85 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-[9px] font-bold px-2 py-0.5 rounded-md"
            >
              {sport}
            </span>
          ))}
        </div>
      </div>

      {/* Turf Body Content */}
      <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Turf Name */}
          <h3 className="font-black text-sm sm:text-base text-white group-hover:text-emerald-400 transition-colors leading-snug truncate">
            {turf.name}
          </h3>

          {/* Location / Area */}
          <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 mb-2 truncate">
            <span className="truncate">{turf.area}, {turf.city}</span>
          </div>

          {/* Sports Specs / Surface */}
          <div className="text-[10px] text-slate-400 truncate mb-2.5">
            {turf.facilities?.slice(0, 2).join(' · ') || '50mm FIFA Turf · 500 Lux Floodlights'}
          </div>
        </div>

        {/* Pricing, Available Slots & Touch-Active CTA */}
        <div className="pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">From</div>
            <div className="text-sm sm:text-base font-black text-emerald-400 font-['Outfit'] leading-none">
              ₹{turf.pricing?.basePrice}
              <span className="text-[10px] text-slate-400 font-normal"> /hr</span>
            </div>
            
            {/* Live Availability Badge */}
            <div className="flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-300">
                {turf.availableSlotsToday !== undefined
                  ? `${turf.availableSlotsToday} slots available`
                  : 'Slots open'}
              </span>
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBookClick}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs tracking-wider uppercase transition-all shadow-md shadow-emerald-500/20 active:scale-95 flex items-center gap-1"
          >
            <span>BOOK</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>
      </div>
    </article>
  );
}
