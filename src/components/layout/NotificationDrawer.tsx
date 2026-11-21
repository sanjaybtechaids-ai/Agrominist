'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { X, CheckCheck, Bell, CloudRain, ShoppingBag, Sprout, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppStore();

  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'weather':
        return <CloudRain className="w-4 h-4 text-sky-600" />;
      case 'marketplace':
        return <ShoppingBag className="w-4 h-4 text-emerald-600" />;
      case 'fertilizer':
      case 'advisory':
        return <Sprout className="w-4 h-4 text-forest-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="absolute right-0 top-14 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-agriBorder z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
      <div className="p-4 border-b border-agriBorder flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-forest-600" />
          <h4 className="font-semibold text-sm text-agriText">Notifications</h4>
          {unreadCount > 0 && (
            <span className="bg-forest-100 text-forest-800 text-xs px-2 py-0.5 rounded-full font-medium">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-forest-700 hover:text-forest-800 font-medium flex items-center gap-1"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" /> Read all
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-md text-agriMuted hover:text-agriText hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-xs text-agriMuted">No notifications available.</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-4 transition-colors cursor-pointer ${
                n.read ? 'bg-white hover:bg-slate-50' : 'bg-forest-50/40 hover:bg-forest-50/60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-100 shrink-0 mt-0.5">
                  {getCategoryIcon(n.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-xs font-semibold ${n.read ? 'text-agriText' : 'text-forest-900'}`}>
                      {n.title}
                    </p>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-forest-600 shrink-0" />}
                  </div>
                  <p className="text-xs text-agriMuted mt-1 line-clamp-2">{n.message}</p>
                  <div className="flex items-center justify-between mt-2 pt-1">
                    <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                    {n.actionUrl && (
                      <Link
                        href={n.actionUrl}
                        onClick={onClose}
                        className="text-[11px] font-medium text-forest-700 hover:underline"
                      >
                        Open module →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
