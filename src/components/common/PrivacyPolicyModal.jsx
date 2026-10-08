import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  RefreshCw, 
  Flame, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  Lock,
  ArrowRight
} from 'lucide-react';

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('PAYMENT'); // 'PAYMENT' | 'CANCELLATION' | 'TURF_RULES' | 'TERMS'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] text-white animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-white">Privacy, Security & Terms</h2>
              <p className="text-xs text-slate-400">Payment encryption, slot cancellation rules & player safety</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 bg-slate-950/50 p-1.5 gap-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('PAYMENT')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'PAYMENT'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Payment Security</span>
          </button>
          <button
            onClick={() => setActiveTab('CANCELLATION')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'CANCELLATION'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Cancellation & Refunds</span>
          </button>
          <button
            onClick={() => setActiveTab('TURF_RULES')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'TURF_RULES'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Ground Conduct</span>
          </button>
          <button
            onClick={() => setActiveTab('TERMS')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'TERMS'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed">
          {activeTab === 'PAYMENT' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-white text-sm">256-Bit SSL End-to-End Encryption</h3>
                  <p className="text-slate-300 text-xs mt-0.5">
                    All payment sessions on TURFBOOK are secured by enterprise grade TLS 1.3 encryption. We never store bank account credentials, UPI PINs, or raw CVV numbers on our servers.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-slate-400">Payment Safeguards</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>RBI & NPCI Compliant UPI</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Direct integration with GPay, PhonePe, Paytm, and BHIM UPI with instant confirmation webhooks.
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <div className="font-bold text-sky-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>5-Minute Mutex Escrow Hold</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      When you initiate checkout, the selected slot is reserved for 300 seconds so nobody can double-book it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'CANCELLATION' && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <h3 className="font-bold text-white text-sm">Standard Turf Cancellation Tiers</h3>
                <p className="text-slate-400 text-xs">
                  Turf arenas on TURFBOOK set one of three standardized cancellation policies clearly displayed on each turf card:
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
                  <div className="font-bold text-emerald-300 text-xs">1. Flexible Policy (Recommended)</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    100% full refund if cancelled at least 4 hours before slot start time.
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25">
                  <div className="font-bold text-amber-300 text-xs">2. Moderate Policy</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    50% refund if cancelled between 4 to 24 hours prior. 0% within 4 hours.
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/25">
                  <div className="font-bold text-rose-300 text-xs">3. Strict Policy (Event & Tournament bookings)</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    Non-refundable within 24 hours of scheduled game start time.
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/25 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-sky-200">
                  Refunds are credited back automatically to the original UPI / card source within 15 minutes of cancellation.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'TURF_RULES' && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <h3 className="font-bold text-white text-sm">Arena Conduct & Footwear Guidelines</h3>
                <p className="text-slate-400 text-xs">
                  To protect artificial monofilament turf pitches and ensure player safety, all players must adhere to:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Approved Footwear</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Turf boots (multi-stud rubber), AG (artificial grass) studs, or athletic running sneakers.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-1">
                  <div className="font-bold text-red-300 flex items-center gap-1.5 text-xs">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    <span>Strictly Prohibited</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Metal spikes / SG studs, glass bottles, chewing gum, smoking, and alcoholic beverages.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <div className="font-bold text-amber-300 text-xs">Arrival Protocol</div>
                <p className="text-[11px] text-slate-400">
                  Please report to the turf receptionist 10 minutes prior to your booking hour with your Digital QR Match Pass ready on your phone screen.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'TERMS' && (
            <div className="space-y-3 animate-fade-in">
              <h3 className="font-bold text-white text-sm">Platform Terms of Service</h3>
              <p className="text-slate-400 text-xs">
                By booking or registering an arena on TURFBOOK, you agree to fair use of the real-time slot allocation system:
              </p>
              <ul className="space-y-2 text-[11px] text-slate-300 list-disc pl-4">
                <li>Double-booking bots or automated slot scrapers are strictly banned and subject to IP block.</li>
                <li>Weather cancellations (heavy rain / cyclone water-logging) entitle the team to a free reschedule or 100% refund confirmed by turf management.</li>
                <li>Turf owners agree to maintain FIFA standard lighting (minimum 300 lux) and safe pitch netting.</li>
                <li>All disputes are subject to the jurisdiction of the courts of Chennai & Coimbatore, Tamil Nadu.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-950/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Last updated: October 2026 • Tamil Nadu Sports Council Standards</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
