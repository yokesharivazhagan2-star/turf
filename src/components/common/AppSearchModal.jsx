import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  X, 
  MapPin, 
  ChevronRight, 
  Flame, 
  Sparkles, 
  Clock, 
  Activity, 
  Zap, 
  Trophy, 
  CircleDot, 
  Radio 
} from 'lucide-react';

export default function AppSearchModal({ isOpen, onClose }) {
  const { 
    turfs, 
    userLocation, 
    setSelectedTurf, 
    setCurrentScreen, 
    startBooking 
  } = useApp();

  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
      setActiveFilter('All');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter options
  const filterChips = [
    { id: 'All', label: 'All Results' },
    { id: 'Football', label: 'Football', icon: Activity },
    { id: 'Cricket', label: 'Cricket', icon: Flame },
    { id: 'Badminton', label: 'Badminton', icon: Zap },
    { id: 'Basketball', label: 'Basketball', icon: CircleDot },
    { id: 'NearMe', label: 'Under 3 km', icon: MapPin },
  ];

  // Search logic
  const filteredTurfs = turfs.filter((t) => {
    const matchesQuery =
      !query ||
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.area.toLowerCase().includes(query.toLowerCase()) ||
      t.sports.some((s) => s.toLowerCase().includes(query.toLowerCase())) ||
      t.facilities.some((f) => f.toLowerCase().includes(query.toLowerCase()));

    if (!matchesQuery) return false;

    if (activeFilter === 'NearMe') {
      return (t.distanceKm || 999) <= 3.5;
    }
    if (activeFilter !== 'All') {
      return t.sports.includes(activeFilter);
    }
    return true;
  });

  const handleSelectTurf = (turf) => {
    setSelectedTurf(turf);
    setCurrentScreen('TURF_DETAILS');
    onClose();
  };

  const handleQuickBook = (e, turf) => {
    e.stopPropagation();
    startBooking(turf);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-xl animate-fade-in">
      
      {/* Top Search Bar */}
      <div className="px-4 pt-4 pb-3 border-b border-white/10 flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-inner">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search turf name, area, or sport..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-slate-500 font-medium"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-full bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          className="px-3 py-2 text-xs font-bold text-slate-300 hover:text-white"
        >
          Cancel
        </button>
      </div>

      {/* Quick Filter Chips */}
      <div className="px-4 py-2.5 border-b border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
        {filterChips.map((chip) => {
          const Icon = chip.icon;
          const isActive = activeFilter === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => setActiveFilter(chip.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 scale-105'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>

      {/* Results Container */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 max-w-3xl mx-auto w-full">
        {filteredTurfs.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <Search className="w-10 h-10 mx-auto text-slate-600 mb-3" />
            <p className="font-bold text-white text-sm">No arenas match your search</p>
            <p className="text-xs text-slate-500 mt-1">
              Try searching for "Football", "RS Puram", or "Saravanampatti"
            </p>
          </div>
        ) : (
          filteredTurfs.map((turf) => (
            <div
              key={turf.id}
              onClick={() => handleSelectTurf(turf)}
              className="glass-card p-3 rounded-2xl border border-white/10 hover:border-emerald-500/40 cursor-pointer flex items-center justify-between gap-3 transition-all active:scale-[0.99]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={turf.images?.[0]}
                  alt={turf.name}
                  className="w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-900"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-white truncate">{turf.name}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span>{turf.area}</span>
                    {turf.distanceKm && (
                      <span className="text-sky-400 font-bold flex items-center gap-0.5">
                        <MapPin className="w-3 h-3" />
                        {turf.distanceKm} km
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {turf.sports?.slice(0, 2).map((s) => (
                      <span key={s} className="px-1.5 py-0.5 rounded bg-white/5 text-[9px] font-bold text-emerald-400">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <div className="text-right">
                  <span className="text-xs font-black text-emerald-400">₹{turf.pricing?.basePrice}</span>
                  <span className="text-[10px] text-slate-400">/hr</span>
                </div>
                <button
                  onClick={(e) => handleQuickBook(e, turf)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[10px] uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1"
                >
                  <span>Book</span>
                  <ChevronRight className="w-3 h-3 stroke-[3]" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
