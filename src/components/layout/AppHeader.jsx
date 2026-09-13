import React, { useState } from 'react';
import { useApp, COIMBATORE_LOCATIONS } from '../../context/AppContext';
import { 
  MapPin, 
  Crosshair, 
  ChevronDown, 
  Search, 
  Bell, 
  User, 
  ShieldCheck, 
  Building2, 
  Sparkles,
  Check 
} from 'lucide-react';

export default function AppHeader({ onOpenSearch }) {
  const {
    currentUser,
    activeRole,
    profiles,
    switchProfile,
    userLocation,
    setUserLocation,
    isUsingRealGps,
    isGpsLoading,
    requestRealGps,
    currentScreen,
    setCurrentScreen,
    notifications
  } = useApp();

  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left: Location & GPS Selector */}
        <div className="relative flex items-center gap-2">
          {/* Brand Mark (compact for app feel) */}
          <div 
            onClick={() => setCurrentScreen('HOME')}
            className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center cursor-pointer shadow-md shadow-emerald-500/20 active:scale-95 transition-transform shrink-0"
          >
            <span className="font-black text-slate-950 text-xs tracking-tight font-['Outfit']">TB</span>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border text-left transition-all active:scale-95 ${
                isUsingRealGps
                  ? 'bg-emerald-950/70 border-emerald-500/50 shadow-sm shadow-emerald-500/20'
                  : 'bg-slate-900/95 border-white/10 hover:border-emerald-500/40'
              }`}
            >
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                {isUsingRealGps && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                )}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-[9px] uppercase font-black tracking-wider text-slate-400">
                    {isUsingRealGps ? 'Live GPS Location' : 'Location'}
                  </span>
                  {isUsingRealGps && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                </div>
                <span className="text-xs font-extrabold text-white truncate max-w-[130px] sm:max-w-[190px]">
                  {userLocation?.isStateWide ? 'All Tamil Nadu' : `${userLocation?.area || 'Tamil Nadu'}, TN`}
                </span>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0 ml-0.5" />
            </button>

            {/* Backdrop to dismiss when clicking outside */}
            {showLocationDropdown && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowLocationDropdown(false)}
              />
            )}

            {/* Location Selector Popover (Guaranteed 100% Solid Opaque Background) */}
            {showLocationDropdown && (
              <div 
                style={{ backgroundColor: '#070a14' }}
                className="absolute top-full left-0 mt-2 w-72 bg-slate-950 rounded-2xl border border-emerald-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-3 z-50 animate-slide-up backdrop-blur-none"
              >
                <div className="px-1 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Current City / Hub</span>
                  {isUsingRealGps && (
                    <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live GPS Active
                    </span>
                  )}
                </div>

                {/* Live GPS Trigger Button */}
                <button
                  onClick={() => {
                    requestRealGps();
                    setShowLocationDropdown(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-white text-xs font-bold transition-all my-1.5 active:scale-98 text-left"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <Crosshair className={`w-4 h-4 text-emerald-400 ${isGpsLoading ? 'animate-spin' : ''}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-extrabold text-xs text-white flex items-center gap-1">
                      <span>Use Current Live GPS</span>
                      {isUsingRealGps && <Check className="w-3 h-3 text-emerald-400" />}
                    </div>
                    <div className="text-[10px] text-emerald-300/80 font-medium truncate">
                      {isGpsLoading ? 'Detecting coordinates...' : 'Detect precision latitude & longitude'}
                    </div>
                  </div>
                </button>

                <div className="h-[1px] bg-white/10 my-2" />

                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-1">
                  Tamil Nadu Hubs & Districts
                </div>
                <div className="space-y-1 max-h-48 overflow-y-auto no-scrollbar">
                  {COIMBATORE_LOCATIONS.map((loc) => {
                    const isSelected = !isUsingRealGps && userLocation?.id === loc.id;
                    return (
                      <button
                        key={loc.id}
                        onClick={() => {
                          setUserLocation(loc);
                          setShowLocationDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                            : 'text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        <span>{loc.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Desktop Screen Switcher */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-2xl border border-white/5">
          <button
            onClick={() => setCurrentScreen('HOME')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              currentScreen === 'HOME' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentScreen('EXPLORE')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              currentScreen === 'EXPLORE' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            Explore
          </button>
          <button
            onClick={() => setCurrentScreen('MAP')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              currentScreen === 'MAP' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            Map
          </button>
          <button
            onClick={() => setCurrentScreen('BOOKINGS')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              currentScreen === 'BOOKINGS' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            My Bookings
          </button>
        </nav>

        {/* Right: Quick Search, Notifications, Profile Avatar */}
        <div className="flex items-center gap-2">
          
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/40 active:scale-95 transition-all flex items-center gap-1.5"
            title="Search Turfs"
          >
            <Search className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium text-slate-400 hidden xl:inline pr-1">Search...</span>
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white active:scale-95 transition-all relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>

            {showNotificationsDropdown && (
              <div 
                style={{ backgroundColor: '#070a14' }}
                className="absolute top-full right-0 mt-2 w-72 bg-slate-950 rounded-2xl border border-white/15 shadow-2xl p-3 z-50 animate-slide-up"
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-white">Live Alerts</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Real-Time</span>
                </div>
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-500 py-3 text-center">No active notifications</p>
                ) : (
                  <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-2 rounded-xl bg-white/5 text-xs text-slate-200 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>{n.message}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile & Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrentScreen('PROFILE')}
              className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-emerald-400/50 active:scale-95 transition-all"
              title="User Profile"
            >
              <div className="w-7 h-7 rounded-lg overflow-hidden bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                {currentUser?.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <span className="text-xs font-bold text-white hidden sm:inline max-w-[80px] truncate">
                {currentUser?.name?.split(' ')[0] || 'Profile'}
              </span>
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}
