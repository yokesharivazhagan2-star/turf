import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import QRCode from 'qrcode';
import { 
  Ticket, 
  Calendar, 
  Clock, 
  MapPin, 
  Navigation, 
  AlertTriangle, 
  X, 
  CheckCircle2, 
  ChevronRight, 
  RotateCcw,
  QrCode,
  Share2 
} from 'lucide-react';

export default function BookingsList() {
  const { 
    currentUser, 
    userBookings, 
    fetchUserBookings, 
    setCurrentScreen, 
    setSelectedTurf,
    turfs,
    addNotification 
  } = useApp();

  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'completed' | 'cancelled'
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketQr, setTicketQr] = useState('');
  const [cancellingBooking, setCancellingBooking] = useState(null);

  useEffect(() => {
    fetchUserBookings();
  }, [fetchUserBookings]);

  // Open ticket modal with QR
  const handleOpenTicket = async (booking) => {
    try {
      const url = await QRCode.toDataURL(booking.qrCodeData || `TURFBOOK-${booking.id}`, {
        width: 220,
        margin: 1,
        color: { dark: '#020617', light: '#ffffff' }
      });
      setTicketQr(url);
      setSelectedTicket(booking);
    } catch (err) {
      console.error(err);
    }
  };

  // Rebook: Navigate to this turf
  const handleRebook = (booking) => {
    const targetTurf = turfs.find((t) => t.id === booking.turfId || t.name === booking.turfName);
    if (targetTurf) {
      setSelectedTurf(targetTurf);
      setCurrentScreen('TURF_DETAILS');
    } else {
      setCurrentScreen('EXPLORE');
    }
  };

  // Cancel Booking handler
  const handleCancelBooking = async () => {
    if (!cancellingBooking) return;

    try {
      const res = await fetch(`/api/bookings/${cancellingBooking.id}/cancel`, {
        method: 'POST'
      });
      const data = await res.json();
      if (!res.ok) {
        addNotification(data.error || 'Failed to cancel', 'error');
        return;
      }

      addNotification('Booking cancelled successfully and slot released', 'success');
      setCancellingBooking(null);
      fetchUserBookings();
    } catch (err) {
      console.error(err);
      addNotification('Network error during cancellation', 'error');
    }
  };

  // Filter bookings per tab
  const todayStr = new Date().toISOString().split('T')[0];

  const upcomingBookings = userBookings.filter((b) => b.status === 'CONFIRMED' && b.date >= todayStr);
  const completedBookings = userBookings.filter((b) => b.status === 'CONFIRMED' && b.date < todayStr);
  const cancelledBookings = userBookings.filter((b) => b.status === 'CANCELLED');

  const currentList =
    activeTab === 'upcoming'
      ? upcomingBookings
      : activeTab === 'completed'
      ? completedBookings
      : cancelledBookings;

  return (
    <div className="min-h-screen pb-28 relative z-10 px-3 sm:px-6 pt-3 max-w-4xl mx-auto space-y-4">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-3xl font-black text-white font-['Outfit'] uppercase">
          My <span className="text-emerald-400">Bookings</span>
        </h1>
        <p className="text-xs text-slate-400">
          Match entry passes, digital QR check-in, and match history
        </p>
      </div>

      {/* Segmented Tabs: Upcoming, Completed, Cancelled */}
      <div className="flex rounded-2xl bg-slate-900/90 p-1 border border-white/10 max-w-md">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'upcoming'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Upcoming ({upcomingBookings.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'completed'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Completed ({completedBookings.length})
        </button>
        <button
          onClick={() => setActiveTab('cancelled')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'cancelled'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Cancelled ({cancelledBookings.length})
        </button>
      </div>

      {/* Bookings Feed */}
      <div className="space-y-3">
        {currentList.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center text-slate-400 border border-white/10">
            <Ticket className="w-10 h-10 text-emerald-400 mx-auto mb-2 opacity-60" />
            <h3 className="text-sm font-extrabold text-white mb-1">No {activeTab} matches</h3>
            <p className="text-xs text-slate-400 mb-4">
              {activeTab === 'upcoming'
                ? "You don't have any upcoming games booked."
                : `No ${activeTab} match records found.`}
            </p>
            <button
              onClick={() => setCurrentScreen('HOME')}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-500/20"
            >
              Find a Pitch
            </button>
          </div>
        ) : (
          currentList.map((b) => (
            <div
              key={b.id}
              className="glass-panel p-4 rounded-3xl border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3.5"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${
                    b.status === 'CONFIRMED'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-red-500/20 text-red-400 border-red-500/30'
                  }`}>
                    {b.status}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">#{b.id}</span>
                </div>

                <h3 className="text-base font-black text-white font-['Outfit']">{b.turfName}</h3>
                
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-sky-400" />
                  <span>{b.turfAddress || b.turfArea || 'Tamil Nadu'}</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-300 pt-1">
                  <div className="flex items-center gap-1 font-semibold">
                    <Calendar className="w-3 h-3 text-emerald-400" />
                    <span>{b.date}</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>{b.startTime} - {b.endTime}</span>
                  </div>
                  <div className="text-emerald-400 font-black">
                    ₹{b.amount}
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">
                  Team: <span className="font-bold text-white">{b.teamName}</span> ({b.sport})
                </div>
              </div>

              {/* Action Buttons: View, Cancel, Rebook */}
              <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                {b.status === 'CONFIRMED' && (
                  <>
                    <button
                      onClick={() => handleOpenTicket(b)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>View Pass</span>
                    </button>

                    {activeTab === 'upcoming' && (
                      <button
                        onClick={() => setCancellingBooking(b)}
                        className="px-3 py-2 rounded-xl glass-panel border border-red-500/20 text-red-300 hover:bg-red-500/10 text-xs font-bold transition-all"
                      >
                        Cancel
                      </button>
                    )}
                  </>
                )}

                {(b.status === 'CANCELLED' || activeTab === 'completed') && (
                  <button
                    onClick={() => handleRebook(b)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Rebook Pitch</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Digital QR Pass Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 max-w-sm w-full space-y-4 relative animate-slide-up bg-slate-950">
            <button
              onClick={() => setSelectedTicket(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Official Venue Check-In Pass
              </span>
              <h3 className="text-lg font-black text-white font-['Outfit'] mt-2">
                {selectedTicket.turfName}
              </h3>
              <p className="text-xs text-slate-400">{selectedTicket.turfAddress || selectedTicket.turfArea}</p>
            </div>

            {/* QR Code Container */}
            <div className="p-4 rounded-2xl bg-white flex flex-col items-center justify-center shadow-inner">
              {ticketQr ? (
                <img src={ticketQr} alt="Booking QR Code" className="w-44 h-44 object-contain" />
              ) : (
                <div className="w-44 h-44 flex items-center justify-center text-slate-900 font-bold">
                  Loading QR...
                </div>
              )}
              <div className="text-[10px] text-slate-900 font-mono font-bold mt-2">
                PASS #{selectedTicket.id}
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 bg-slate-900/80 p-3 rounded-2xl border border-white/5">
              <div className="flex justify-between">
                <span className="text-slate-400">Match Date:</span>
                <span className="font-bold text-white">{selectedTicket.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Time Window:</span>
                <span className="font-bold text-emerald-400">{selectedTicket.startTime} - {selectedTicket.endTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Team:</span>
                <span className="font-bold text-white">{selectedTicket.teamName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Paid:</span>
                <span className="font-bold text-emerald-400">₹{selectedTicket.amount}</span>
              </div>
            </div>

            <button
              onClick={() => {
                const url = `https://www.google.com/maps/dir/?api=1&destination=11.0168,76.9673`;
                window.open(url, '_blank');
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions to Arena</span>
            </button>
          </div>
        </div>
      )}

      {/* Cancellation Confirmation Modal */}
      {cancellingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel p-6 rounded-3xl border border-red-500/40 max-w-sm w-full space-y-4 text-center bg-slate-950">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto" />
            <h3 className="text-base font-black text-white">Cancel This Match?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to cancel your slot at <strong>{cancellingBooking.turfName}</strong> on {cancellingBooking.date} ({cancellingBooking.startTime})? This slot will immediately be released to other players.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setCancellingBooking(null)}
                className="flex-1 py-2.5 rounded-xl glass-panel text-slate-300 font-bold text-xs"
              >
                Keep Match
              </button>
              <button
                onClick={handleCancelBooking}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
