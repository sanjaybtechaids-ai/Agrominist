'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/constants/translations';
import {
  Bell,
  CheckCheck,
  CloudRain,
  ShoppingBag,
  Sprout,
  AlertTriangle,
  ArrowRight,
  Filter,
} from 'lucide-react';
import Link from 'next/link';

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead, language } = useAppStore();
  const t = translations[language] || translations.en;

  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filtered = notifications.filter((n) => {
    if (filterCategory === 'all') return true;
    return n.category === filterCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'weather':
        return <CloudRain className="w-5 h-5 text-sky-600" />;
      case 'marketplace':
        return <ShoppingBag className="w-5 h-5 text-emerald-600" />;
      case 'fertilizer':
      case 'advisory':
        return <Sprout className="w-5 h-5 text-forest-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-forest-600" />
            <h1 className="text-2xl font-bold text-agriText">{t.nav.notifications}</h1>
          </div>
          <p className="text-xs text-agriMuted mt-1">
            Real-time agro-climatic advisories, buyer requests, and farming schedule reminders.
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="px-4 py-2 bg-white border border-agriBorder hover:bg-slate-50 text-forest-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors self-start sm:self-auto"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['all', 'weather', 'marketplace', 'advisory', 'fertilizer'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-xl font-semibold capitalize transition-colors ${
              filterCategory === cat
                ? 'bg-forest-600 text-white'
                : 'bg-white border border-agriBorder text-agriText hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-agriBorder text-xs text-agriMuted">
            No notifications in this category.
          </div>
        ) : (
          filtered.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                n.read
                  ? 'bg-white border-agriBorder'
                  : 'bg-forest-50/50 border-forest-200 shadow-2xs'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-2xs shrink-0">
                  {getCategoryIcon(n.category)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`font-bold text-sm ${n.read ? 'text-agriText' : 'text-forest-900'}`}>
                      {n.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                      {!n.read && <span className="w-2.5 h-2.5 rounded-full bg-forest-600 shrink-0" />}
                    </div>
                  </div>

                  <p className="text-xs text-agriMuted mt-1 leading-relaxed">{n.message}</p>

                  {n.actionUrl && (
                    <div className="mt-3 pt-2 border-t border-slate-100">
                      <Link
                        href={n.actionUrl}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-forest-700 hover:underline"
                      >
                        Open Action Window <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
