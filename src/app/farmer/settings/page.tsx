'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/constants/translations';
import { SupportedLanguage } from '@/types';
import {
  Settings,
  Globe,
  Bell,
  MapPin,
  HardDrive,
  LogOut,
  CheckCircle2,
  Navigation,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const { language, setLanguage, logout, resetToMockData, offlineEnabled, toggleOfflineMode } = useAppStore();
  const t = translations[language] || translations.en;

  // Preferences State
  const [weatherAlerts, setWeatherAlerts] = useState(true);
  const [buyerEnquiries, setBuyerEnquiries] = useState(true);
  const [fertilizerReminders, setFertilizerReminders] = useState(true);
  const [advisoryAlerts, setAdvisoryAlerts] = useState(true);
  const [gpsEnabled, setGpsEnabled] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleResetData = () => {
    if (confirm('Reset application data to demonstration defaults?')) {
      resetToMockData();
      alert('Mock data successfully restored.');
    }
  };

  const languagesList: { code: SupportedLanguage; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-forest-600" />
            <h1 className="text-2xl font-bold text-agriText">System Settings & Preferences</h1>
          </div>
          <p className="text-xs text-agriMuted mt-1">
            Configure advisory notifications, regional dialects, and offline mobile cache.
          </p>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Preferences updated!
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* 1. Language Preferences */}
        <div className="bg-white p-6 rounded-2xl border border-agriBorder shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Globe className="w-4 h-4 text-forest-600" />
            <h2 className="font-bold text-sm text-agriText">Regional Advisory Language</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {languagesList.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  language === lang.code
                    ? 'border-forest-600 bg-forest-50 text-forest-800 ring-1 ring-forest-600'
                    : 'border-agriBorder bg-slate-50 hover:bg-slate-100 text-agriText'
                }`}
              >
                <p className="font-bold text-xs">{lang.native}</p>
                <p className="text-[10px] text-agriMuted">{lang.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Notification Preferences */}
        <div className="bg-white p-6 rounded-2xl border border-agriBorder shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Bell className="w-4 h-4 text-forest-600" />
            <h2 className="font-bold text-sm text-agriText">Notification Channels</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                title: 'High Severity Weather Warnings (Rain / Wind)',
                desc: 'Alerts from regional IMD weather models for Cauvery delta',
                val: weatherAlerts,
                setVal: setWeatherAlerts,
              },
              {
                title: 'Marketplace Buyer Enquiries',
                desc: 'Instant alert when a consumer or restaurant makes an offer',
                val: buyerEnquiries,
                setVal: setBuyerEnquiries,
              },
              {
                title: 'Fertilizer Application Reminders',
                desc: 'Crop vegetative stage reminders for urea topdressing and bio-fertilizer',
                val: fertilizerReminders,
                setVal: setFertilizerReminders,
              },
              {
                title: 'Post-Harvest Rotation Recommendations',
                desc: 'Tips on pulse broadcast, stubble management, and soil restoration',
                val: advisoryAlerts,
                setVal: setAdvisoryAlerts,
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div>
                  <span className="text-xs font-semibold text-agriText block">{item.title}</span>
                  <span className="text-[10px] text-agriMuted">{item.desc}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input
                    type="checkbox"
                    checked={item.val}
                    onChange={(e) => item.setVal(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-forest-600" />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Offline Data & Cache */}
        <div className="bg-white p-6 rounded-2xl border border-agriBorder shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <HardDrive className="w-4 h-4 text-forest-600" />
            <h2 className="font-bold text-sm text-agriText">Offline Mobile Storage & Cache</h2>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div>
              <span className="text-xs font-semibold text-agriText block">
                Offline-Friendly Local Storage
              </span>
              <span className="text-[10px] text-agriMuted">
                Caches plots, weather, and produce listings on device for low-signal rural 2G/3G zones
              </span>
            </div>
            <button
              onClick={toggleOfflineMode}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                offlineEnabled ? 'bg-forest-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {offlineEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleResetData}
              className="text-xs font-semibold text-slate-600 hover:text-rose-600 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Mock Data
            </button>

            <button
              onClick={handleSaveSettings}
              className="px-5 py-2 bg-forest-600 text-white rounded-xl text-xs font-bold hover:bg-forest-700 shadow-xs"
            >
              Apply Settings
            </button>
          </div>
        </div>

        {/* 4. Session & Logout */}
        <div className="bg-white p-6 rounded-2xl border border-agriBorder shadow-xs flex items-center justify-between">
          <div>
            <h3 className="font-bold text-xs text-agriText">Active Authentication Session</h3>
            <p className="text-[11px] text-agriMuted">Development demo credentials active</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout of Account
          </button>
        </div>
      </div>
    </div>
  );
}
