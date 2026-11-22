'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/constants/translations';
import { SupportedLanguage } from '@/types';
import { NotificationDrawer } from './NotificationDrawer';
import {
  Sprout,
  Globe,
  Bell,
  Mic,
  Search,
  User,
  ChevronDown,
  LogOut,
  Settings,
  ShieldCheck,
  RefreshCw,
  Menu,
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const router = useRouter();
  const {
    currentRole,
    language,
    setLanguage,
    farmerProfile,
    customerProfile,
    notifications,
    setVoiceModalOpen,
    loginAsFarmer,
    loginAsCustomer,
    logout,
  } = useAppStore();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const t = translations[language] || translations.en;
  const unreadCount = notifications.filter((n) => !n.read).length;

  const currentUserName = currentRole === 'farmer' ? farmerProfile.name : customerProfile.name;
  const roleLabel = currentRole === 'farmer' ? t.roles.farmer : t.roles.customer;

  const languagesList: { code: SupportedLanguage; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  ];

  const handleRoleSwitch = (newRole: 'farmer' | 'customer') => {
    if (newRole === 'farmer') {
      loginAsFarmer();
      router.push('/farmer/dashboard');
    } else {
      loginAsCustomer();
      router.push('/customer/marketplace');
    }
    setProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
    setProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-agriBorder h-16 px-4 lg:px-8 flex items-center justify-between">
      {/* Left: Mobile Toggle & Brand */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-agriMuted hover:text-agriText hover:bg-slate-100 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <Link
          href={currentRole === 'customer' ? '/customer/marketplace' : '/farmer/dashboard'}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-forest-600 flex items-center justify-center text-white shadow-sm group-hover:bg-forest-700 transition-colors">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg text-forest-700 tracking-tight block leading-tight">
              Agronomist
            </span>
            <span className="text-[10px] text-agriMuted hidden sm:block tracking-wide">
              Smart Agro Advisory
            </span>
          </div>
        </Link>
      </div>

      {/* Middle: Universal Search */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-agriMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crops, fertilizers, mandi prices, land plots..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs text-agriText focus:outline-none focus:ring-2 focus:ring-forest-600 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Voice Assistant Trigger */}
        <button
          onClick={() => setVoiceModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-forest-50 hover:bg-forest-100 text-forest-700 border border-forest-200 rounded-xl text-xs font-semibold shadow-xs transition-all"
          title="Open AI Agro Voice Assistant"
        >
          <Mic className="w-4 h-4 text-forest-600 animate-pulse" />
          <span className="hidden sm:inline">Voice Assistant</span>
        </button>

        {/* Language Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setLangDropdownOpen(!langDropdownOpen);
              setProfileDropdownOpen(false);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-agriBorder hover:bg-slate-50 text-xs font-medium text-agriText"
          >
            <Globe className="w-4 h-4 text-agriMuted" />
            <span className="uppercase font-semibold">{language}</span>
            <ChevronDown className="w-3 h-3 text-agriMuted" />
          </button>

          {langDropdownOpen && (
            <div className="absolute right-0 top-12 w-44 bg-white rounded-xl shadow-lg border border-agriBorder py-1.5 z-50 animate-in fade-in">
              <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-agriMuted uppercase">
                Select Language
              </div>
              {languagesList.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-forest-50 hover:text-forest-700 transition-colors ${
                    language === lang.code ? 'font-bold text-forest-700 bg-forest-50/50' : 'text-agriText'
                  }`}
                >
                  <span>{lang.native}</span>
                  <span className="text-[10px] text-agriMuted uppercase">{lang.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setLangDropdownOpen(false);
              setProfileDropdownOpen(false);
            }}
            className="p-2 rounded-xl border border-agriBorder hover:bg-slate-50 text-agriText relative"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4 text-agriMuted" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <NotificationDrawer
            isOpen={notificationsOpen}
            onClose={() => setNotificationsOpen(false)}
          />
        </div>

        {/* Profile Dropdown & Role Indicator */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileDropdownOpen(!profileDropdownOpen);
              setLangDropdownOpen(false);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-xl border border-agriBorder hover:bg-slate-50 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-forest-100 text-forest-700 font-bold flex items-center justify-center text-xs">
              {currentUserName.charAt(0)}
            </div>
            <div className="text-left hidden lg:block leading-tight pr-1">
              <span className="text-xs font-semibold text-agriText block truncate max-w-[110px]">
                {currentUserName}
              </span>
              <span className="text-[10px] text-forest-700 font-medium block">
                {roleLabel}
              </span>
            </div>
            <ChevronDown className="w-3 h-3 text-agriMuted hidden lg:block" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 top-12 w-60 bg-white rounded-xl shadow-xl border border-agriBorder py-2 z-50 animate-in fade-in">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-semibold text-agriText">{currentUserName}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-forest-100 text-forest-800 uppercase">
                    {roleLabel}
                  </span>
                  <span className="text-[10px] text-slate-400">Demo User</span>
                </div>
              </div>

              {/* Role Switching */}
              <div className="px-2 py-1.5 border-b border-slate-100">
                <p className="px-2 py-1 text-[10px] font-semibold text-agriMuted uppercase">
                  Switch Active Role
                </p>
                <button
                  onClick={() => handleRoleSwitch('farmer')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                    currentRole === 'farmer'
                      ? 'bg-forest-50 font-semibold text-forest-700'
                      : 'hover:bg-slate-100 text-agriText'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-forest-600" /> Farmer Dashboard
                  </span>
                  {currentRole === 'farmer' && <span className="text-[10px]">Active</span>}
                </button>
                <button
                  onClick={() => handleRoleSwitch('customer')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                    currentRole === 'customer'
                      ? 'bg-forest-50 font-semibold text-forest-700'
                      : 'hover:bg-slate-100 text-agriText'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-forest-600" /> Customer Marketplace
                  </span>
                  {currentRole === 'customer' && <span className="text-[10px]">Active</span>}
                </button>
              </div>

              {/* Links */}
              <div className="px-2 py-1">
                <Link
                  href={currentRole === 'farmer' ? '/farmer/profile' : '/customer/profile'}
                  onClick={() => setProfileDropdownOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2 text-agriText hover:bg-slate-100"
                >
                  <User className="w-3.5 h-3.5 text-agriMuted" />
                  <span>Profile Information</span>
                </Link>
                <Link
                  href="/farmer/settings"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2 text-agriText hover:bg-slate-100"
                >
                  <Settings className="w-3.5 h-3.5 text-agriMuted" />
                  <span>Settings & Preferences</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2 text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
