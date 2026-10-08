import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Building2, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Phone, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  AlertCircle,
  Compass
} from 'lucide-react';

export default function LoginPage() {
  const { login, register, setCurrentScreen } = useApp();

  const [mode, setMode] = useState('SIGNIN'); // 'SIGNIN' | 'SIGNUP'
  const [selectedRole, setSelectedRole] = useState('PLAYER'); // 'PLAYER' | 'OWNER' | 'ADMIN'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sportsHubName, setSportsHubName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      if (mode === 'SIGNIN') {
        const res = await login(email, password, selectedRole);
        if (!res.success) {
          setErrorMessage(res.error || 'Failed to sign in. Please verify your credentials.');
        }
      } else {
        if (!name.trim()) {
          setErrorMessage('Please enter your full name');
          setIsLoading(false);
          return;
        }
        const res = await register({
          name,
          email,
          password,
          phone,
          role: selectedRole,
          sportsHubName: selectedRole === 'OWNER' ? sportsHubName : undefined
        });
        if (!res.success) {
          setErrorMessage(res.error || 'Registration failed. Email might already exist.');
        }
      }
    } catch (err) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-24 pt-6 px-3 sm:px-6 relative z-10 flex flex-col justify-center items-center max-w-lg mx-auto">
      
      {/* Brand Header */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tamil Nadu's #1 Real-Time Sports Network</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-['Outfit']">
          Welcome to <span className="text-emerald-400">TURFBOOK</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
          Sign in to book floodlit artificial pitches, coordinate squads, or manage your sports facility.
        </p>
      </div>

      {/* Main Auth Container */}
      <div className="w-full glass-panel rounded-3xl border border-white/10 p-5 sm:p-6 shadow-2xl relative overflow-hidden bg-slate-900/90 backdrop-blur-xl">
        
        {/* Glow Accent Top */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* 1. ROLE TABS */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-slate-950/80 border border-white/10 mb-5">
          <button
            type="button"
            onClick={() => {
              setSelectedRole('PLAYER');
              if (mode === 'SIGNIN') setEmail('arun@turfbook.com');
            }}
            className={`py-2 px-2 rounded-xl text-xs font-extrabold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
              selectedRole === 'PLAYER'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Player</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedRole('OWNER');
              if (mode === 'SIGNIN') setEmail('owner.arun@sportsgroup.in');
            }}
            className={`py-2 px-2 rounded-xl text-xs font-extrabold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
              selectedRole === 'OWNER'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Turf Owner</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedRole('ADMIN');
              if (mode === 'SIGNIN') setEmail('superadmin@turfbook.com');
            }}
            className={`py-2 px-2 rounded-xl text-xs font-extrabold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
              selectedRole === 'ADMIN'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>

        {/* 2. MODE SWITCHER: SIGN IN vs CREATE ACCOUNT */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => {
                setMode('SIGNIN');
                setErrorMessage('');
              }}
              className={`text-sm font-bold pb-1 relative transition-colors ${
                mode === 'SIGNIN' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Sign In
              {mode === 'SIGNIN' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
              )}
            </button>

            {selectedRole !== 'ADMIN' && (
              <button
                type="button"
                onClick={() => {
                  setMode('SIGNUP');
                  setErrorMessage('');
                }}
                className={`text-sm font-bold pb-1 relative transition-colors ${
                  mode === 'SIGNUP' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Create Account
                {mode === 'SIGNUP' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                )}
              </button>
            )}
          </div>

          <span className="text-[10px] uppercase font-black tracking-wider text-slate-500">
            {selectedRole === 'PLAYER' ? 'Book & Play' : selectedRole === 'OWNER' ? 'Manage Arenas' : 'Super Admin'}
          </span>
        </div>

        {/* ERROR NOTIFICATION */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-200 text-xs flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 3. FORM FIELDS */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'SIGNUP' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Arun Kumar"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950/80 border border-white/10 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          )}

          {mode === 'SIGNUP' && selectedRole === 'OWNER' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                Sports Hub / Arena Brand Name
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={sportsHubName}
                  onChange={(e) => setSportsHubName(e.target.value)}
                  placeholder="e.g. Kovai Turf Arena"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950/80 border border-white/10 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950/80 border border-white/10 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {mode === 'SIGNUP' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98401 23456"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950/80 border border-white/10 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-slate-950/80 border border-white/10 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded accent-emerald-500 w-3.5 h-3.5"
              />
              <span>Remember session</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-98 transition-all disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{mode === 'SIGNIN' ? `Sign In as ${selectedRole}` : `Create ${selectedRole} Account`}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* 4. CONTINUE AS GUEST OPTION */}
        <div className="mt-5 pt-4 border-t border-white/10 text-center">
          <button
            type="button"
            onClick={() => setCurrentScreen('HOME')}
            className="text-xs text-slate-400 hover:text-emerald-400 flex items-center justify-center gap-1.5 mx-auto font-medium transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Continue as Guest (Explore Turfs Without Sign In)</span>
          </button>
        </div>

      </div>

    </div>
  );
}
