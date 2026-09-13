import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  Compass, 
  Map, 
  Ticket, 
  User, 
  CalendarPlus 
} from 'lucide-react';

export default function AppBottomNav({ onQuickBook }) {
  const { currentScreen, setCurrentScreen, turfs, startBooking } = useApp();

  const handleCenterBook = () => {
    if (onQuickBook) {
      onQuickBook();
    } else if (turfs.length > 0) {
      startBooking(turfs[0]);
    } else {
      setCurrentScreen('EXPLORE');
    }
  };

  const navItems = [
    { id: 'HOME', label: 'Home', icon: Home },
    { id: 'EXPLORE', label: 'Explore', icon: Compass },
    // Center BOOK action
    { id: 'MAP', label: 'Map', icon: Map },
    { id: 'BOOKINGS', label: 'Bookings', icon: Ticket },
    { id: 'PROFILE', label: 'Profile', icon: User },
  ];

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-white/10 px-2 py-2 sm:py-2.5 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
    >
      <div className="max-w-md md:max-w-lg mx-auto flex items-center justify-between relative px-2">
        
        {/* Left item 1: Home */}
        <button
          onClick={() => setCurrentScreen('HOME')}
          className={`flex flex-col items-center gap-1 transition-all active:scale-95 flex-1 ${
            currentScreen === 'HOME' ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] tracking-tight">Home</span>
        </button>

        {/* Left item 2: Explore */}
        <button
          onClick={() => setCurrentScreen('EXPLORE')}
          className={`flex flex-col items-center gap-1 transition-all active:scale-95 flex-1 ${
            currentScreen === 'EXPLORE' ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] tracking-tight">Explore</span>
        </button>

        {/* Center: Prominent Elevated Primary BOOK Action Button */}
        <div className="relative -top-5 px-1 shrink-0">
          <button
            onClick={handleCenterBook}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-emerald-400 text-slate-950 flex flex-col items-center justify-center shadow-xl shadow-emerald-500/35 active:scale-90 transition-transform border-4 border-slate-950 group"
            aria-label="Quick Book Turf"
          >
            <CalendarPlus className="w-6 h-6 stroke-[2.5] text-slate-950 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-black tracking-tighter uppercase mt-0.5">BOOK</span>
          </button>
        </div>

        {/* Right item 1: Map */}
        <button
          onClick={() => setCurrentScreen('MAP')}
          className={`flex flex-col items-center gap-1 transition-all active:scale-95 flex-1 ${
            currentScreen === 'MAP' ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Map className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] tracking-tight">Map</span>
        </button>

        {/* Right item 2: Bookings */}
        <button
          onClick={() => setCurrentScreen('BOOKINGS')}
          className={`flex flex-col items-center gap-1 transition-all active:scale-95 flex-1 ${
            currentScreen === 'BOOKINGS' ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Ticket className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] tracking-tight">Bookings</span>
        </button>

        {/* Right item 3: Profile */}
        <button
          onClick={() => setCurrentScreen('PROFILE')}
          className={`flex flex-col items-center gap-1 transition-all active:scale-95 flex-1 ${
            currentScreen === 'PROFILE' ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] tracking-tight">Profile</span>
        </button>

      </div>
    </nav>
  );
}
