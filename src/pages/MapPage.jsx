import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import TurfMapView from '../components/map/TurfMapView';
import { 
  Compass, 
  MapPin, 
  Crosshair, 
  X, 
  ChevronRight, 
  Calendar, 
  Clock, 
  Navigation,
  List 
} from 'lucide-react';

export default function MapPage() {
  const { 
    turfs, 
    userLocation, 
    isUsingRealGps,
    isGpsLoading,
    selectedTurf, 
    setSelectedTurf, 
    setCurrentScreen, 
    startBooking,
    requestRealGps 
  } = useApp();

  const [activeTurf, setActiveTurf] = useState(selectedTurf || turfs[0] || null);
  const [selectedSport, setSelectedSport] = useState('All');

  const sportsList = ['All', 'Football', 'Cricket', 'Badminton'];

  const filteredTurfs = turfs.filter((t) => {
    if (selectedSport === 'All') return true;
    return t.sports.includes(selectedSport);
  });

  const handleOpenTurf = (turf) => {
    setSelectedTurf(turf);
    setCurrentScreen('TURF_DETAILS');
  };

  return (
    <div className="h-[calc(100vh-65px)] w-full relative z-10 flex flex-col overflow-hidden">
      
      {/* Floating Top App Controls on Map */}
      <div className="absolute top-3 left-3 right-3 z-[450] pointer-events-none flex flex-col gap-2 max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-2 pointer-events-auto">
          
          {/* Quick Sport Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar glass-panel p-1.5 rounded-2xl border border-white/15 shadow-xl">
            {sportsList.map((sport) => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedSport === sport
                    ? 'bg-emerald-500 text-slate-950 font-black'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Locate Me GPS Button with Live Radar status */}
            <button
              onClick={requestRealGps}
              className={`p-2.5 rounded-2xl glass-panel border shadow-xl active:scale-95 transition-all flex items-center gap-1.5 ${
                isUsingRealGps 
                  ? 'border-emerald-500 bg-emerald-950/60 text-emerald-400' 
                  : 'border-white/15 hover:border-emerald-500 text-slate-300 hover:text-emerald-400'
              }`}
              title="Locate with Live GPS Radar"
            >
              <Crosshair className={`w-4 h-4 ${isGpsLoading ? 'animate-spin text-emerald-400' : ''}`} />
              {isUsingRealGps && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse hidden sm:inline" />
              )}
            </button>

            {/* Switch to List View */}
            <button
              onClick={() => setCurrentScreen('EXPLORE')}
              className="px-3 py-2 rounded-2xl glass-panel border border-white/15 text-slate-200 hover:text-white text-xs font-bold shadow-xl flex items-center gap-1 active:scale-95 transition-all"
            >
              <List className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Map Viewport */}
      <div className="flex-1 w-full h-full relative">
        <TurfMapView
          turfs={filteredTurfs}
          userLocation={userLocation}
          selectedTurfId={activeTurf?.id}
          onSelectTurf={(t) => setActiveTurf(t)}
          onViewTurfDetails={(t) => handleOpenTurf(t)}
          className="w-full h-full"
        />

        {/* Selected Turf: Bottom Sheet on Mobile, Floating Side Panel on Desktop */}
        {activeTurf && (
          <div className="absolute bottom-20 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 sm:w-96 z-[450] animate-slide-up pointer-events-auto">
            <div className="glass-panel p-4 rounded-3xl border border-emerald-500/40 shadow-2xl bg-slate-950/90 relative">
              
              {/* Close Button */}
              <button
                onClick={() => setActiveTurf(null)}
                className="absolute top-3 right-3 p-1 rounded-full bg-slate-900/80 text-slate-400 hover:text-white z-10"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="flex gap-3.5">
                <img
                  src={activeTurf.images?.[0]}
                  alt={activeTurf.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0 bg-slate-900"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap mb-1">
                    {activeTurf.sports?.slice(0, 2).map((s) => (
                      <span key={s} className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">
                        {s}
                      </span>
                    ))}
                    {activeTurf.distanceKm && (
                      <span className="text-[10px] text-sky-400 font-bold flex items-center gap-0.5">
                        <MapPin className="w-2.5 h-2.5" />
                        {activeTurf.distanceKm} km
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-sm sm:text-base text-white truncate leading-tight">
                    {activeTurf.name}
                  </h3>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">
                    {activeTurf.area}, {activeTurf.city || 'Tamil Nadu'}
                  </div>

                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-bold text-slate-300">
                      {activeTurf.availableSlotsToday !== undefined
                        ? `${activeTurf.availableSlotsToday} slots available`
                        : 'Slots available'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                <div>
                  <div className="text-[9px] uppercase font-bold text-slate-400">Starting price</div>
                  <div className="text-sm font-black text-emerald-400 font-['Outfit']">
                    ₹{activeTurf.pricing?.basePrice}
                    <span className="text-[10px] text-slate-400 font-normal"> /hr</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation?.lat || ''},${userLocation?.lng || ''}&destination=${activeTurf.coordinates?.lat},${activeTurf.coordinates?.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 hover:text-white transition-all active:scale-95 flex items-center justify-center shadow-md"
                    title="Get Google Maps turn-by-turn navigation"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleOpenTurf(activeTurf)}
                    className="px-3 py-1.5 rounded-xl glass-panel hover:bg-white/10 text-white text-xs font-bold transition-colors"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => startBooking(activeTurf)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20 active:scale-95 flex items-center gap-1"
                  >
                    <span>BOOK</span>
                    <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

    </div>
  );
}
