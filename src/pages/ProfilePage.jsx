import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  MapPin, 
  Ticket, 
  Building2, 
  ShieldCheck, 
  ChevronRight, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  Trophy, 
  Users, 
  Calendar, 
  Heart,
  QrCode,
  Sparkles,
  ToggleLeft,
  ToggleRight 
} from 'lucide-react';

export default function ProfilePage() {
  const { 
    currentUser, 
    activeRole, 
    profiles, 
    switchProfile, 
    userBookings, 
    userLocation, 
    setCurrentScreen, 
    addNotification 
  } = useApp();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [gpsAutoLocate, setGpsAutoLocate] = useState(true);

  // Teams list sample
  const teams = [
    { id: 'tm-1', name: 'Chennai Strikers', sport: 'Football', role: 'Captain', members: 9 },
    { id: 'tm-2', name: 'Coimbatore Kings', sport: 'Cricket', role: 'Player', members: 11 },
  ];

  const totalBookingsCount = userBookings.length;
  const confirmedCount = userBookings.filter((b) => b.status === 'CONFIRMED').length;

  return (
    <div className="min-h-screen pb-28 relative z-10 px-3 sm:px-6 pt-3 max-w-3xl mx-auto space-y-5">
      
      {/* 1. USER PROFILE HEADER CARD */}
      <div className="glass-panel p-5 rounded-3xl border border-white/10 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/40">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-emerald-500/20 border-2 border-emerald-400/60 shrink-0 shadow-lg shadow-emerald-500/20">
            {currentUser?.avatar ? (
              <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-emerald-400 font-black text-xl">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg sm:text-xl text-white truncate">
                {currentUser?.name || 'Sports Player'}
              </h1>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                activeRole === 'ADMIN'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : activeRole === 'OWNER'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                {activeRole}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 truncate">
              <span className="truncate">{currentUser?.email || 'player@turfbook.com'}</span>
              <span>•</span>
              <span>{currentUser?.phone || '+91 98401 23456'}</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-sky-400 mt-1 font-semibold">
              <MapPin className="w-3 h-3" />
              <span>{userLocation?.area ? `${userLocation.area}, Tamil Nadu` : 'Tamil Nadu'}</span>
            </div>
          </div>
        </div>

        {/* Player Stats Matrix */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10">
          <div className="text-center p-2 rounded-2xl bg-white/5">
            <div className="text-base font-black text-emerald-400 font-['Outfit']">{confirmedCount}</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">Games Played</div>
          </div>
          <div className="text-center p-2 rounded-2xl bg-white/5">
            <div className="text-base font-black text-sky-400 font-['Outfit']">{confirmedCount * 1.5}h</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">Turf Time</div>
          </div>
          <div className="text-center p-2 rounded-2xl bg-white/5">
            <div className="text-base font-black text-amber-400 font-['Outfit']">{teams.length}</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">My Teams</div>
          </div>
        </div>
      </div>

      {/* 2. SWITCH APP ROLE / TEST PROFILE (Section 47 Testing & Owner Hub Access) */}
      <div className="glass-panel p-4 rounded-3xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Switch Role or Account</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold">Multi-Role Testing</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Player Mode */}
          <button
            onClick={() => {
              const p = profiles.players?.[0];
              if (p) switchProfile(p, 'PLAYER');
              setCurrentScreen('HOME');
            }}
            className={`p-3 rounded-2xl border text-left transition-all active:scale-95 ${
              activeRole === 'PLAYER'
                ? 'bg-emerald-500/20 border-emerald-500 text-white'
                : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4 text-emerald-400 mb-1" />
            <div className="font-extrabold text-xs">Player App</div>
            <div className="text-[9px] text-slate-400">Book & Play</div>
          </button>

          {/* Owner Mode */}
          <button
            onClick={() => {
              const o = profiles.owners?.[0];
              if (o) switchProfile(o, 'OWNER');
              setCurrentScreen('OWNER_DASHBOARD');
            }}
            className={`p-3 rounded-2xl border text-left transition-all active:scale-95 ${
              activeRole === 'OWNER'
                ? 'bg-sky-500/20 border-sky-500 text-white'
                : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4 text-sky-400 mb-1" />
            <div className="font-extrabold text-xs">Owner Hub</div>
            <div className="text-[9px] text-slate-400">Slot Manager</div>
          </button>

          {/* Admin Mode */}
          <button
            onClick={() => {
              if (profiles.admin) switchProfile(profiles.admin, 'ADMIN');
              setCurrentScreen('ADMIN_PORTAL');
            }}
            className={`p-3 rounded-2xl border text-left transition-all active:scale-95 ${
              activeRole === 'ADMIN'
                ? 'bg-amber-500/20 border-amber-500 text-white'
                : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400 mb-1" />
            <div className="font-extrabold text-xs">Super Admin</div>
            <div className="text-[9px] text-slate-400">Approve Arenas</div>
          </button>
        </div>
      </div>

      {/* 3. MY TEAMS */}
      <div className="glass-panel p-4 rounded-3xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>My Teams & Squads</span>
          </h2>
          <span className="text-[10px] text-emerald-400 font-bold">{teams.length} Active</span>
        </div>

        <div className="space-y-2">
          {teams.map((team) => (
            <div
              key={team.id}
              className="p-3 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-between"
            >
              <div>
                <div className="font-extrabold text-sm text-white">{team.name}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {team.sport} • {team.members} Players • <span className="text-emerald-400 font-bold">{team.role}</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-white/5 text-slate-300 text-xs font-bold">
                Active Squad
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. APP PREFERENCES & CONTROLS */}
      <div className="glass-panel p-4 rounded-3xl border border-white/10 space-y-3">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-400">
          App Settings & Preferences
        </h2>

        <div className="space-y-1">
          {/* Push Notifications Toggle */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-xs font-bold text-white">Push Notifications</div>
                <div className="text-[10px] text-slate-400">Receive instant slot locking & booking alerts</div>
              </div>
            </div>
            <button 
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className="text-emerald-400"
            >
              {notificationsEnabled ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7 text-slate-600" />}
            </button>
          </div>

          {/* GPS Auto-detect */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-sky-400" />
              <div>
                <div className="text-xs font-bold text-white">Auto-Detect GPS</div>
                <div className="text-[10px] text-slate-400">Sort nearby arenas automatically based on location</div>
              </div>
            </div>
            <button 
              onClick={() => setGpsAutoLocate(!gpsAutoLocate)}
              className="text-emerald-400"
            >
              {gpsAutoLocate ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7 text-slate-600" />}
            </button>
          </div>

          {/* Privacy & Safety */}
          <div 
            onClick={() => addNotification('All data encrypted and stored securely', 'info')}
            className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-xs font-bold text-white">Privacy & Terms</div>
                <div className="text-[10px] text-slate-400">Payment security and slot cancellation policies</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>

          {/* Help & Support */}
          <div 
            onClick={() => addNotification('TURFBOOK Support: help@turfbook.com (+91 98401 23456)', 'info')}
            className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-xs font-bold text-white">Help & Support</div>
                <div className="text-[10px] text-slate-400">24/7 Turf coordinator assistance</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>
        </div>

        <div className="pt-2 border-t border-white/10">
          <button
            onClick={() => {
              addNotification('Signed out of TURFBOOK session', 'info');
              setCurrentScreen('HOME');
            }}
            className="w-full py-2.5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </div>

    </div>
  );
}
