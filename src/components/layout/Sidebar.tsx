'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/constants/translations';
import {
  LayoutDashboard,
  MapPin,
  Sparkles,
  FlaskConical,
  RotateCcw,
  ShoppingBag,
  BarChart3,
  Bell,
  UserCheck,
  Shield,
  HelpCircle,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { currentRole, language, notifications } = useAppStore();
  const t = translations[language] || translations.en;

  const unreadCount = notifications.filter((n) => !n.read).length;

  interface NavItem {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }

  const farmerNavItems: NavItem[] = [
    { label: t.nav.overview, href: '/farmer/dashboard', icon: LayoutDashboard },
    { label: t.nav.myLand, href: '/farmer/land', icon: MapPin },
    { label: t.nav.cropSuggestions, href: '/farmer/suggestions', icon: Sparkles },
    { label: t.nav.fertilizerAdvisory, href: '/farmer/fertilizers', icon: FlaskConical },
    { label: t.nav.afterHarvesting, href: '/farmer/harvesting', icon: RotateCcw },
    { label: t.nav.marketplace, href: '/farmer/marketplace', icon: ShoppingBag },
    { label: t.nav.analytics, href: '/farmer/analytics', icon: BarChart3 },
    {
      label: t.nav.notifications,
      href: '/farmer/notifications',
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { label: t.nav.profileSettings, href: '/farmer/profile', icon: UserCheck },
  ];

  const customerNavItems: NavItem[] = [
    { label: 'Direct Marketplace', href: '/customer/marketplace', icon: ShoppingBag },
    { label: 'My Enquiries', href: '/customer/marketplace?view=enquiries', icon: Bell },
    { label: 'Customer Profile', href: '/customer/profile', icon: UserCheck },
  ];

  const navItems = currentRole === 'customer' ? customerNavItems : farmerNavItems;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-agriBorder flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:z-0`}
      >
        {/* Mobile Header Inside Sidebar */}
        <div className="flex items-center justify-between p-4 border-b border-agriBorder lg:hidden">
          <span className="font-bold text-forest-700 text-sm">Navigation Menu</span>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-agriMuted hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Banner */}
        <div className="px-5 py-3.5 bg-forest-50/70 border-b border-agriBorder flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-forest-600" />
            <span className="text-xs font-semibold text-forest-800 uppercase tracking-wider">
              {currentRole === 'farmer' ? t.roles.farmer : t.roles.customer}
            </span>
          </div>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-forest-200/80 text-forest-900">
            Active
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/farmer/dashboard' && pathname?.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-forest-600 text-white shadow-xs'
                    : 'text-agriText hover:bg-slate-100 hover:text-forest-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-agriMuted'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${
                      isActive ? 'bg-white text-forest-700' : 'bg-rose-500 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Helpful Info / Offline Indicator */}
        <div className="p-4 border-t border-agriBorder bg-slate-50/60 text-xs">
          <div className="flex items-center gap-2 text-agriMuted mb-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="font-medium text-[11px]">Offline-Ready Mode</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            Data is securely cached in local storage for access during intermittent mobile connectivity.
          </p>
        </div>
      </aside>
    </>
  );
};
