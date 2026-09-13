import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import TurfMapView from '../components/map/TurfMapView';
import { 
  ShieldCheck, 
  Check, 
  X, 
  AlertTriangle, 
  Building2, 
  Users, 
  Ticket, 
  TrendingUp, 
  MapPin, 
  Clock, 
  Filter,
  Eye
} from 'lucide-react';

export default function PlatformAdminDashboard() {
  const { 
    currentUser, 
    userLocation, 
    fetchTurfs, 
    addNotification 
  } = useApp();

  const [adminTurfs, setAdminTurfs] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [reviewingTurf, setReviewingTurf] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  // Fetch admin turfs & stats
  const loadAdminData = () => {
    fetch('/api/admin/turfs')
      .then((res) => res.json())
      .then((data) => {
        setAdminTurfs(data);
      })
      .catch((err) => console.error(err));

    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // Update status (APPROVE, REJECT, SUSPEND, PENDING)
  const handleSetStatus = async (turfId, newStatus, note = '') => {
    try {
      const res = await fetch(`/api/admin/turfs/${turfId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, note })
      });

      if (res.ok) {
        addNotification(`Turf status updated to ${newStatus}`, 'success');
        setShowRejectModal(false);
        setRejectReason('');
        loadAdminData();
        fetchTurfs();
      }
    } catch (err) {
      console.error(err);
      addNotification('Failed to update status', 'error');
    }
  };

  const pendingTurfs = adminTurfs.filter((t) => t.status === 'PENDING');
  const filteredTurfs = adminTurfs.filter((t) => {
    if (selectedStatusFilter === 'ALL') return true;
    return t.status === selectedStatusFilter;
  });

  return (
    <div className="min-h-screen pb-28 relative z-10 px-4 pt-4 max-w-7xl mx-auto space-y-6">
      
      {/* Admin Title & Overview Stats */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase tracking-wider flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Platform Super Admin
          </span>
          <span className="text-xs text-slate-400">Marketplace Authority</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white font-['Outfit'] uppercase">
          Marketplace <span className="text-amber-400">Governance</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Verify independent turf owners, approve new arena registrations, and oversee marketplace bookings across Tamil Nadu.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="glass-panel p-4 rounded-3xl border border-white/10">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Turfs</div>
          <div className="text-2xl font-black text-white mt-1">{stats?.totalTurfs || adminTurfs.length}</div>
          <div className="text-[11px] text-emerald-400 font-bold mt-0.5">
            {stats?.approvedTurfs || 8} Approved & Public
          </div>
        </div>

        <div className="glass-panel p-4 rounded-3xl border border-white/10">
          <div className="text-[10px] uppercase font-bold text-amber-400">Pending Verification</div>
          <div className="text-2xl font-black text-amber-300 mt-1">{stats?.pendingTurfs || pendingTurfs.length}</div>
          <div className="text-[11px] text-slate-400 font-semibold mt-0.5">Awaiting Review</div>
        </div>

        <div className="glass-panel p-4 rounded-3xl border border-white/10">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Bookings</div>
          <div className="text-2xl font-black text-white mt-1">{stats?.totalBookings || 3}</div>
          <div className="text-[11px] text-sky-400 font-bold mt-0.5">Active Match Passes</div>
        </div>

        <div className="glass-panel p-4 rounded-3xl border border-white/10">
          <div className="text-[10px] uppercase font-bold text-slate-400">Gross Marketplace Volume</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">₹{stats?.grossVolume || '4,700'}</div>
          <div className="text-[11px] text-slate-400 font-semibold mt-0.5">Across All Venues</div>
        </div>
      </div>

      {/* SECTION 28: VERIFICATION & APPROVAL QUEUE (PENDING REGISTRATIONS) */}
      {pendingTurfs.length > 0 && (
        <div className="glass-panel p-5 rounded-3xl border border-amber-500/40 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
              <h2 className="text-base font-black text-white">
                Pending Registration Approval Queue ({pendingTurfs.length})
              </h2>
            </div>
            <span className="text-xs text-amber-300 font-bold">Requires Action</span>
          </div>

          <div className="space-y-4">
            {pendingTurfs.map((turf) => (
              <div
                key={turf.id}
                className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="flex gap-4">
                  <img
                    src={turf.images?.[0]}
                    alt={turf.name}
                    className="w-24 h-24 rounded-xl object-cover shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-white">{turf.name}</span>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        PENDING
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{turf.address}, {turf.area}</p>
                    <div className="text-xs text-slate-300">
                      Owner: <span className="font-bold text-sky-400">{turf.ownerName}</span> ({turf.ownerContact})
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>Sports: {turf.sports.join(', ')}</span>
                      <span>•</span>
                      <span>From ₹{turf.pricing?.basePrice}/hr</span>
                    </div>
                  </div>
                </div>

                {/* Approve / Reject / Request Changes Actions */}
                <div className="flex items-center gap-2 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-white/10">
                  <button
                    onClick={() => handleSetStatus(turf.id, 'APPROVED')}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>APPROVE</span>
                  </button>

                  <button
                    onClick={() => {
                      setReviewingTurf(turf);
                      setShowRejectModal(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold text-xs border border-red-500/30 flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>REJECT</span>
                  </button>

                  <button
                    onClick={() => handleSetStatus(turf.id, 'PENDING', 'Requested photo update')}
                    className="px-3 py-2 rounded-xl glass-panel text-slate-300 hover:text-white font-bold text-xs"
                  >
                    Request Info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 27: ADMIN MARKETPLACE MAP VIEW */}
      <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-white">All Platform Turfs & Venues</h2>
            <p className="text-xs text-slate-400">Overview of all registered venues across Tamil Nadu districts</p>
          </div>

          {/* Status Filter */}
          <div className="flex gap-1 bg-slate-900 p-1 rounded-xl border border-white/5">
            {['ALL', 'APPROVED', 'PENDING', 'SUSPENDED'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatusFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  selectedStatusFilter === st
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Global Map */}
        <div className="h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <TurfMapView
            turfs={filteredTurfs}
            userLocation={userLocation}
          />
        </div>

        {/* Turfs Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-black tracking-wider text-[10px] border-b border-white/10">
              <tr>
                <th className="p-3">Turf Name</th>
                <th className="p-3">Area / City</th>
                <th className="p-3">Owner Group</th>
                <th className="p-3">Sports</th>
                <th className="p-3">Base Price</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredTurfs.map((t) => (
                <tr key={t.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 font-bold text-white">{t.name}</td>
                  <td className="p-3 text-slate-400">{t.area}{t.city ? `, ${t.city}` : ''}</td>
                  <td className="p-3 text-sky-400">{t.ownerName}</td>
                  <td className="p-3">{t.sports.join(', ')}</td>
                  <td className="p-3 font-black text-emerald-400">₹{t.pricing?.basePrice}/hr</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      t.status === 'APPROVED'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : t.status === 'PENDING'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {t.status === 'APPROVED' ? (
                      <button
                        onClick={() => handleSetStatus(t.id, 'SUSPENDED')}
                        className="text-[11px] font-bold text-red-400 hover:underline"
                      >
                        Suspend
                      </button>
                    ) : t.status === 'SUSPENDED' ? (
                      <button
                        onClick={() => handleSetStatus(t.id, 'APPROVED')}
                        className="text-[11px] font-bold text-emerald-400 hover:underline"
                      >
                        Activate
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSetStatus(t.id, 'APPROVED')}
                        className="text-[11px] font-bold text-emerald-400 hover:underline"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Reject Reason Modal */}
      {showRejectModal && reviewingTurf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-white/20 rounded-3xl p-6 relative shadow-2xl space-y-4 animate-slide-up">
            <h3 className="text-base font-extrabold text-white">Reject Turf Registration</h3>
            <p className="text-xs text-slate-400">
              Provide feedback for <span className="font-bold text-white">{reviewingTurf.name}</span>.
            </p>

            <textarea
              rows="3"
              placeholder="e.g. Inadequate floodlight specifications or unclear photo documentation."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 py-2.5 rounded-xl glass-panel text-xs font-bold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSetStatus(reviewingTurf.id, 'REJECTED', rejectReason)}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
