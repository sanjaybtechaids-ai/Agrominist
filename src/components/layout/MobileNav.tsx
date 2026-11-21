'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { LayoutDashboard, MapPin, Sparkles, ShoppingBag, Mic, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const { currentRole, setVoiceModalOpen } = useAppStore();

  const isCustomer = currentRole === 'customer';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-agriBorder px-3 py-1.5 flex items-center justify-around lg:hidden shadow-lg">
      <Link
        href={isCustomer ? '/customer/marketplace' : '/farmer/dashboard'}
        className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-medium ${
          pathname === '/farmer/dashboard' || pathname === '/customer/marketplace'
            ? 'text-forest-700 font-bold'
            : 'text-agriMuted'
        }`}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span>Overview</span>
      </Link>

      {!isCustomer ? (
        <Link
          href="/farmer/land"
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-medium ${
            pathname?.startsWith('/farmer/land') ? 'text-forest-700 font-bold' : 'text-agriMuted'
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span>My Land</span>
        </Link>
      ) : (
        <Link
          href="/customer/marketplace"
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-medium ${
            pathname?.startsWith('/customer/marketplace') ? 'text-forest-700 font-bold' : 'text-agriMuted'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Products</span>
        </Link>
      )}

      {/* Center Elevated Voice Mic Action */}
      <button
        onClick={() => setVoiceModalOpen(true)}
        className="flex flex-col items-center justify-center -mt-5"
        title="Open Voice Assistant"
      >
        <div className="w-12 h-12 rounded-full bg-forest-600 hover:bg-forest-700 text-white flex items-center justify-center shadow-lg border-2 border-white">
          <Mic className="w-5 h-5" />
        </div>
        <span className="text-[10px] text-forest-700 font-semibold mt-0.5">Voice</span>
      </button>

      {!isCustomer ? (
        <Link
          href="/farmer/suggestions"
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-medium ${
            pathname?.startsWith('/farmer/suggestions') ? 'text-forest-700 font-bold' : 'text-agriMuted'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span>Crops</span>
        </Link>
      ) : (
        <Link
          href="/customer/profile"
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-medium ${
            pathname?.startsWith('/customer/profile') ? 'text-forest-700 font-bold' : 'text-agriMuted'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
      )}

      {!isCustomer ? (
        <Link
          href="/farmer/marketplace"
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-medium ${
            pathname?.startsWith('/farmer/marketplace') ? 'text-forest-700 font-bold' : 'text-agriMuted'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Market</span>
        </Link>
      ) : (
        <Link
          href="/farmer/dashboard"
          className="flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-medium text-agriMuted"
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Farmer</span>
        </Link>
      )}
    </nav>
  );
};
