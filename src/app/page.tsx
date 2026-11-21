'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/constants/translations';
import {
  Sprout,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  MapPin,
  Layers,
  FlaskConical,
  RotateCcw,
  Mic,
  ArrowRight,
  TrendingUp,
  Globe,
  CheckCircle2,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { loginAsFarmer, loginAsCustomer, language, setLanguage, setVoiceModalOpen } = useAppStore();
  const t = translations[language] || translations.en;

  const handleEnterFarmer = () => {
    loginAsFarmer();
    router.push('/farmer/dashboard');
  };

  const handleEnterCustomer = () => {
    loginAsCustomer();
    router.push('/customer/marketplace');
  };

  return (
    <div className="min-h-screen bg-agriBg flex flex-col text-agriText">
      {/* Top Header */}
      <header className="border-b border-agriBorder bg-white/80 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-forest-600 text-white flex items-center justify-center shadow-xs">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <span className="font-bold text-lg text-forest-800 tracking-tight block leading-tight">
              Agronomist
            </span>
            <span className="text-[10px] text-agriMuted tracking-wide block">
              Smart Farming. Better Decisions. Fair Markets.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setVoiceModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-forest-50 hover:bg-forest-100 text-forest-700 border border-forest-200 rounded-xl text-xs font-semibold transition-all"
          >
            <Mic className="w-3.5 h-3.5 text-forest-600 animate-pulse" />
            <span>Voice Assistant</span>
          </button>

          <Link
            href="/login"
            className="px-4 py-2 bg-forest-600 hover:bg-forest-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            Sign In / Demo
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-semibold border border-forest-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multilingual AI Agricultural Platform for Indian Farmers</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-agriText max-w-4xl mx-auto leading-tight">
          Smart Farming. Better Decisions.{' '}
          <span className="text-forest-700 underline decoration-leaf-400 decoration-wavy">
            Fair Markets.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-agriMuted max-w-2xl mx-auto leading-relaxed">
          An integrated agro-intelligence platform delivering hyper-local weather alerts, certified soil nutrient advisories, smart multi-plot land division, and a direct farmer-to-consumer marketplace with zero middlemen.
        </p>

        {/* Dual Role Direct Entry Action Cards */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
          <button
            type="button"
            onClick={handleEnterFarmer}
            className="p-5 rounded-2xl bg-white border-2 border-forest-600 hover:bg-forest-50/50 text-left shadow-sm hover:shadow transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-forest-600 text-white flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-forest-900 group-hover:text-forest-700">
                Farmer Experience →
              </h2>
              <p className="text-xs text-agriMuted mt-1 leading-relaxed">
                Manage land parcels, plan multi-crop plot divisions, view fertilizer schedules, and sell produce directly.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-forest-700">
              <span>Demo Login: farmer@agronomist.demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button
            type="button"
            onClick={handleEnterCustomer}
            className="p-5 rounded-2xl bg-white border-2 border-leaf-600 hover:bg-leaf-50/50 text-left shadow-sm hover:shadow transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-leaf-600 text-white flex items-center justify-center mb-3">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-leaf-900 group-hover:text-leaf-700">
                Customer Marketplace →
              </h2>
              <p className="text-xs text-agriMuted mt-1 leading-relaxed">
                Source fresh vegetables, aged rice, tender coconuts, and spices straight from verified regional growers.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-leaf-700">
              <span>Demo Login: customer@agronomist.demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </section>

      {/* 6 Key Modules Showcase */}
      <section className="py-12 bg-white border-t border-b border-agriBorder px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-agriText tracking-tight">
              Designed Specifically for Indian Agriculture
            </h2>
            <p className="text-xs sm:text-sm text-agriMuted">
              Built from ground up with regional Indian measurements (Acre, Cent, Quintal), local soil profiles, and regional Indian language support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Layers,
                title: 'Smart Land Division Planner',
                desc: 'Divide 2.0 Acres into multiple plots (e.g. 1 Acre Paddy + 1 Acre Urad). Compare yields, input expenses, and net profit side-by-side.',
                color: 'text-forest-600 bg-forest-50',
              },
              {
                icon: Sparkles,
                title: 'AI Crop Recommendations',
                desc: 'Intelligent suitability scoring based on soil texture, season (Kharif/Rabi/Zaid), duration, and current mandi commodity prices.',
                color: 'text-leaf-600 bg-leaf-50',
              },
              {
                icon: FlaskConical,
                title: 'Soil-Specific Fertilizer Advisory',
                desc: 'Distinguish lab-measured NPK vs regional estimates. Calculate exact organic and chemical fertilizer requirements for your plot acreage.',
                color: 'text-purple-600 bg-purple-50',
              },
              {
                icon: RotateCcw,
                title: 'Post-Harvest & Zero Burning',
                desc: 'Rejuvenate soil fertility with nitrogen-fixing pulse relays (Black Gram/VBN 8), stubble decomposition, and sustainable land prep.',
                color: 'text-amber-600 bg-amber-50',
              },
              {
                icon: ShoppingBag,
                title: 'Direct Farmer Marketplace',
                desc: 'List produce directly from farm gate with photos, unit prices, harvest dates, and connect directly with local consumers & hotels.',
                color: 'text-emerald-600 bg-emerald-50',
              },
              {
                icon: Mic,
                title: 'Multilingual Voice Assistant',
                desc: 'Ask questions in Tamil, Hindi, Telugu, Kannada, Malayalam, or English to receive instant audio and text advisory.',
                color: 'text-sky-600 bg-sky-50',
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-agriBorder bg-white hover:border-forest-200 transition-colors shadow-2xs space-y-3"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${feature.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-agriText">{feature.title}</h3>
                  <p className="text-xs text-agriMuted leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 px-4 text-center border-t border-agriBorder text-xs text-agriMuted bg-agriBg">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-forest-600" />
            <span className="font-bold text-agriText">Agronomist Platform</span>
            <span>• Demonstration Version</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Thanjavur, Tamil Nadu • Indian Agriculture Tech</span>
            <Link href="/login" className="text-forest-700 font-bold hover:underline">
              Demo Accounts
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
