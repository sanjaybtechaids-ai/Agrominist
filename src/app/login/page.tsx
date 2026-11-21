'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { UserRole } from '@/types';
import {
  Sprout,
  ShieldCheck,
  ShoppingBag,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Info,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { apiFetch, setSessionToken } from '@/services/api/client';

export default function LoginPage() {
  const router = useRouter();
  const { loginAsFarmer, loginAsCustomer, farmerProfile } = useAppStore();

  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');
  const [identifier, setIdentifier] = useState('farmer@agronomist.demo');
  const [password, setPassword] = useState('Farmer@123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setError('');
    if (role === 'farmer') {
      setIdentifier('farmer@agronomist.demo');
      setPassword('Farmer@123');
    } else {
      setIdentifier('customer@agronomist.demo');
      setPassword('Customer@123');
    }
  };

  const signIn = async (email: string, secret: string, role: UserRole) => {
    setIsSubmitting(true);
    try {
      const session = await apiFetch<{ access_token: string }>('/api/auth/login', {
        method: 'POST', body: JSON.stringify({ email, password: secret }),
      });
      setSessionToken(session.access_token);
      if (role === 'farmer') {
        loginAsFarmer();
        router.push(farmerProfile.onboardingCompleted ? '/farmer/dashboard' : '/onboarding');
      } else {
        loginAsCustomer();
        router.push('/customer/marketplace');
      }
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Unable to sign in. Please try again.');
    } finally { setIsSubmitting(false); }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError('Please enter your email or mobile number.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    await signIn(identifier, password, selectedRole);
  };

  const handleQuickDemo = async (role: UserRole) => {
    const credentials = role === 'farmer'
      ? { email: 'farmer@agronomist.demo', password: 'Farmer@123' }
      : { email: 'customer@agronomist.demo', password: 'Customer@123' };
    await signIn(credentials.email, credentials.password, role);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotSuccess(false);
      setShowForgotPassword(false);
      setForgotEmail('');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-agriBg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="w-12 h-12 rounded-2xl bg-forest-600 flex items-center justify-center text-white shadow-md">
            <Sprout className="w-7 h-7" />
          </div>
          <span className="font-bold text-2xl text-forest-800 tracking-tight">Agronomist</span>
        </Link>
        <p className="mt-2 text-xs font-medium text-forest-700">
          Smart Farming. Better Decisions. Fair Markets.
        </p>
        <h2 className="mt-4 text-xl sm:text-2xl font-bold tracking-tight text-agriText">
          Sign in to your account
        </h2>
        <p className="mt-1 text-xs text-agriMuted">
          Access your farm advisory, land allocation planner, or direct marketplace
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-8 shadow-sm border border-agriBorder rounded-2xl">
          {/* Role Selection Tabs */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-agriMuted uppercase tracking-wider mb-2">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleRoleChange('farmer')}
                className={`py-3 px-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-semibold ${
                  selectedRole === 'farmer'
                    ? 'border-forest-600 bg-forest-50 text-forest-700 shadow-xs ring-1 ring-forest-600'
                    : 'border-agriBorder bg-slate-50 text-agriMuted hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-5 h-5 text-forest-600" />
                <span>Farmer / Producer</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('customer')}
                className={`py-3 px-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-semibold ${
                  selectedRole === 'customer'
                    ? 'border-forest-600 bg-forest-50 text-forest-700 shadow-xs ring-1 ring-forest-600'
                    : 'border-agriBorder bg-slate-50 text-agriMuted hover:bg-slate-100'
                }`}
              >
                <ShoppingBag className="w-5 h-5 text-forest-600" />
                <span>Customer / Buyer</span>
              </button>
            </div>
          </div>

          {/* Quick Demo Access Bar */}
          <div className="mb-6 p-3.5 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-agriText flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-forest-600" /> Quick Demo Login:
              </span>
              <span className="text-[10px] text-agriMuted">Click to enter directly</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('farmer')}
                className="py-1.5 px-2 bg-forest-600 hover:bg-forest-700 text-white rounded-lg text-xs font-medium text-center transition-colors shadow-xs"
              >
                Farmer Demo →
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('customer')}
                className="py-1.5 px-2 bg-leaf-600 hover:bg-leaf-700 text-white rounded-lg text-xs font-medium text-center transition-colors shadow-xs"
              >
                Customer Demo →
              </button>
            </div>
          </div>

          {/* Error Notice */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-agriText mb-1.5">
                Email address or Mobile number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-agriMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-agriBorder rounded-xl text-xs text-agriText focus:outline-none focus:ring-2 focus:ring-forest-600"
                  placeholder="e.g. farmer@agronomist.demo or 9842178901"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-agriText">Password</label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-xs font-medium text-forest-700 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-agriMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-agriBorder rounded-xl text-xs text-agriText focus:outline-none focus:ring-2 focus:ring-forest-600"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-agriMuted hover:text-agriText"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-forest-600 focus:ring-forest-500 w-4 h-4"
                />
                <span className="text-xs text-agriMuted">Remember this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-forest-600 hover:bg-forest-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-2 mt-4"
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In as {selectedRole === 'farmer' ? 'Farmer' : 'Customer'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Note */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-agriMuted">
              Development prototype: Mock credentials are preloaded for evaluation.
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-agriBorder shadow-xl">
            <h3 className="font-bold text-base text-agriText">Reset Password</h3>
            <p className="text-xs text-agriMuted mt-1">
              Enter your registered email address or mobile number to receive a secure OTP.
            </p>

            {forgotSuccess ? (
              <div className="my-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Reset OTP has been dispatched to your mobile/email.</span>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="mt-4 space-y-3">
                <input
                  type="text"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter email or 10-digit mobile number"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="px-3 py-2 text-xs text-agriMuted hover:text-agriText font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-forest-600 text-white rounded-xl text-xs font-semibold hover:bg-forest-700"
                  >
                    Send OTP
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
