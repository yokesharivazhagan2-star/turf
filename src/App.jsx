import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import AnimatedSportsBackground from './components/canvas/AnimatedSportsBackground';
import AppHeader from './components/layout/AppHeader';
import AppBottomNav from './components/layout/AppBottomNav';
import AppSearchModal from './components/common/AppSearchModal';
import PlayerHome from './pages/PlayerHome';
import ExplorePage from './pages/ExplorePage';
import MapPage from './pages/MapPage';
import TurfDetails from './pages/TurfDetails';
import BookingsList from './pages/BookingsList';
import ProfilePage from './pages/ProfilePage';
import TurfOwnerDashboard from './pages/TurfOwnerDashboard';
import PlatformAdminDashboard from './pages/PlatformAdminDashboard';
import BookingBottomSheet from './components/booking/BookingBottomSheet';
import { Bell } from 'lucide-react';

function AppContent() {
  const { currentScreen, notifications, turfs, startBooking, setCurrentScreen } = useApp();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleQuickBook = () => {
    if (turfs.length > 0) {
      startBooking(turfs[0]);
    } else {
      setCurrentScreen('EXPLORE');
    }
  };

  return (
    <div className="relative min-h-screen text-white select-none">
      
      {/* 3D Animated Looping Sports Complex Background System */}
      <AnimatedSportsBackground currentScreen={currentScreen} />

      {/* App Header */}
      <AppHeader onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Screen Content */}
      <main className="relative z-10">
        {currentScreen === 'HOME' && <PlayerHome onOpenSearch={() => setIsSearchOpen(true)} />}
        {currentScreen === 'EXPLORE' && <ExplorePage />}
        {currentScreen === 'MAP' && <MapPage />}
        {currentScreen === 'TURF_DETAILS' && <TurfDetails />}
        {currentScreen === 'BOOKINGS' && <BookingsList />}
        {currentScreen === 'PROFILE' && <ProfilePage />}
        {currentScreen === 'OWNER_DASHBOARD' && <TurfOwnerDashboard />}
        {currentScreen === 'ADMIN_PORTAL' && <PlatformAdminDashboard />}
      </main>

      {/* Full Screen App Search Modal */}
      <AppSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Multi-Step Bottom Sheet Booking Checkout Flow */}
      <BookingBottomSheet />

      {/* Mobile-First Fixed Bottom Navigation */}
      <AppBottomNav onQuickBook={handleQuickBook} />

      {/* Floating Live Real-Time Toast Notifications */}
      <div className="fixed top-14 right-3 sm:right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-3 rounded-2xl glass-panel border shadow-2xl text-xs font-semibold flex items-center gap-2.5 pointer-events-auto animate-slide-up ${
              n.type === 'error'
                ? 'border-red-500/40 text-red-200 bg-red-950/80'
                : n.type === 'success'
                ? 'border-emerald-500/40 text-emerald-200 bg-emerald-950/80'
                : 'border-sky-500/40 text-sky-200 bg-slate-900/90'
            }`}
          >
            <Bell className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{n.message}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default function App() {
  return <AppContent />;
}
