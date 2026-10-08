import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  Phone, 
  MessageSquare, 
  Mail, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function HelpSupportModal({ isOpen, onClose }) {
  const { addNotification, currentUser } = useApp();
  const [expandedFaq, setExpandedFaq] = useState(0);
  const [category, setCategory] = useState('BOOKING');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'How does the 5-minute slot lock work during checkout?',
      a: 'When you tap "Confirm & Hold Slot", TURFBOOK activates an atomic mutex lock across our WebSocket network. The slot is held exclusively for you for 300 seconds so no other player can book or double-reserve while you finalize your payment.'
    },
    {
      q: 'How do I check in and show my Match Pass at the arena?',
      a: 'After booking, open "My Bookings" and tap on your confirmed match. Present the high-resolution dynamic QR Code to the arena receptionist. They will scan it with the owner portal to instantly verify your squad.'
    },
    {
      q: 'Can I cancel a booking and receive a refund?',
      a: 'Yes! Go to "My Bookings" and tap "Cancel Booking". Depending on the venue cancellation policy (Flexible: 100% refund up to 4 hrs prior; Moderate: 50%), refunds are processed automatically back to your payment UPI/card account.'
    },
    {
      q: 'I own a sports turf in Tamil Nadu. How can I register it?',
      a: 'Switch to the "Owner Hub" or sign up as a Turf Owner. Complete the "Register New Arena" form with ground dimensions, pricing, and photos. Our administration team reviews and approves verified arenas within 24 hours.'
    },
    {
      q: 'How do I invite solo players or host a public match?',
      a: 'When booking a slot, toggle "Open Match for Public Players" to ON and select your team. Your match will appear highlighted with a public recruitment tag across the Tamil Nadu player community.'
    }
  ];

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      addNotification('Please enter a message or issue description', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage('');
      const ticketId = `TB-SUP-${Date.now().toString().slice(-4)}`;
      addNotification(`Support ticket #${ticketId} submitted! A turf coordinator will contact you shortly.`, 'success');
      onClose();
    }, 600);
  };

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
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-white">Help & 24/7 Support</h2>
              <p className="text-xs text-slate-400">Match coordinators, slot troubleshooting & instant inquiries</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
          
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Phone */}
            <a 
              href="tel:+919840123456"
              className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between text-emerald-400 mb-2">
                <Phone className="w-4 h-4" />
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold">24/7 Hotline</span>
              </div>
              <div>
                <div className="font-extrabold text-white text-xs">+91 98401 23456</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Call Match Coordinator</div>
              </div>
            </a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/919840123456" 
              target="_blank" 
              rel="noreferrer"
              className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between text-emerald-400 mb-2">
                <MessageCircle className="w-4 h-4" />
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold">Instant</span>
              </div>
              <div>
                <div className="font-extrabold text-white text-xs">WhatsApp Chat</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Average reply &lt; 2 mins</div>
              </div>
            </a>

            {/* Email */}
            <a 
              href="mailto:help@turfbook.com"
              className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between text-sky-400 mb-2">
                <Mail className="w-4 h-4" />
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-bold">Email Desk</span>
              </div>
              <div>
                <div className="font-extrabold text-white text-xs truncate">help@turfbook.com</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Billing & Refunds</div>
              </div>
            </a>
          </div>

          {/* Interactive FAQs Accordion */}
          <div className="space-y-2">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider text-slate-400">
              Frequently Asked Questions
            </h3>
            <div className="space-y-1.5">
              {faqs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div 
                    key={idx}
                    className="rounded-2xl border border-white/5 bg-slate-950/40 overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setExpandedFaq(isOpen ? -1 : idx)}
                      className="w-full p-3 text-left flex items-center justify-between gap-3 hover:bg-white/5 transition-colors"
                    >
                      <span className="font-bold text-xs text-white">{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-3 pb-3 text-[11px] text-slate-300 leading-relaxed border-t border-white/5 pt-2 animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Message / Ticket Form */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <h3 className="font-bold text-white text-xs flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Send Message to Support Coordinator</span>
            </h3>

            <form onSubmit={handleSubmitTicket} className="space-y-2.5">
              <div className="flex gap-2">
                {['BOOKING', 'PAYMENT', 'TURF_ISSUE', 'OTHER'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition-colors ${
                      category === cat
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue or inquiry (e.g. slot refund, stadium lights, team booking)..."
                rows={2}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>Logged in as: {currentUser?.name || 'Guest Player'}</span>
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-950/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Headquarters: Anna Salai, Chennai • RS Puram, Coimbatore</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
