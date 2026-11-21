'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/constants/translations';
import { mockPostHarvestGuidance } from '@/data/mockData';
import {
  RotateCcw,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Sprout,
  ShieldAlert,
  ArrowRight,
  Flame,
  Leaf,
  Layers,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function AfterHarvestingPage() {
  const { language } = useAppStore();
  const t = translations[language] || translations.en;
  const guidance = mockPostHarvestGuidance;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <RotateCcw className="w-6 h-6 text-forest-600" />
            <h1 className="text-2xl font-bold text-agriText">{t.harvesting.title}</h1>
          </div>
          <p className="text-xs text-agriMuted mt-1">{t.harvesting.subtitle}</p>
        </div>

        {/* Harvest Summary Badge */}
        <div className="bg-white p-3 rounded-xl border border-agriBorder shadow-xs flex items-center gap-3">
          <div className="p-2 rounded-lg bg-forest-50 text-forest-700">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-agriMuted block">
              Previous Cycle Crop
            </span>
            <span className="text-xs font-bold text-agriText">{guidance.previousCrop}</span>
            <span className="text-[10px] text-emerald-700 block font-medium">
              Harvest Completed: {guidance.harvestDate}
            </span>
          </div>
        </div>
      </div>

      {/* VISUAL INTERACTIVE POST-HARVEST TIMELINE */}
      <div className="bg-white rounded-2xl border border-agriBorder p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-base text-agriText">{t.harvesting.timeline}</h2>
            <p className="text-xs text-agriMuted">
              Scientific progression from crop cut to next planting cycle
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-forest-100 text-forest-800">
            Phase 2 of 5 In Progress
          </span>
        </div>

        {/* Timeline Horizontal Stepper */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-3">
          {guidance.timeline.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isInProgress = step.status === 'in-progress';

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                  isInProgress
                    ? 'border-forest-600 bg-forest-50/70 ring-1 ring-forest-600 shadow-xs'
                    : isCompleted
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : 'border-agriBorder bg-slate-50 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : isInProgress
                          ? 'bg-forest-600 text-white animate-pulse'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </span>
                    <span className="text-[10px] font-bold text-agriMuted">{step.duration}</span>
                  </div>

                  <h4 className="font-bold text-xs text-agriText leading-snug">{step.phase}</h4>
                  <p className="text-[11px] text-agriMuted mt-1.5 leading-relaxed">{step.description}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60">
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider ${
                      isCompleted
                        ? 'text-emerald-700'
                        : isInProgress
                        ? 'text-forest-800 font-extrabold'
                        : 'text-slate-400'
                    }`}
                  >
                    {isCompleted ? '✓ Done' : isInProgress ? '● Active Now' : 'Pending'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Residue Management & Zero Stubble Burning Card */}
      <div className="bg-white rounded-2xl border border-agriBorder p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-forest-600" />
            <h3 className="font-bold text-base text-agriText">{t.harvesting.residueManagement}</h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            Zero Stubble Burning Certified
          </span>
        </div>

        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-start gap-3">
          <Flame className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold block text-rose-950">
              {guidance.residueManagement.avoidBurningNotice}
            </strong>
            <span className="text-[11px] text-rose-800 mt-1 block">
              Burning destroys 100% of organic nitrogen and kills micro-fauna that keep soil alive.
            </span>
          </div>
        </div>

        <div className="p-4 bg-forest-50/70 border border-forest-100 rounded-xl space-y-2 text-xs">
          <p className="font-bold text-forest-900">
            Recommended In-Situ Method: {guidance.residueManagement.method}
          </p>
          <p className="text-forest-800 leading-relaxed">
            {guidance.residueManagement.recommendation}
          </p>
        </div>
      </div>

      {/* Soil Restoration & Recommended Rotations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Soil Restoration Steps */}
        <div className="bg-white rounded-2xl border border-agriBorder p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Layers className="w-4 h-4 text-forest-600" />
              <h3 className="font-bold text-sm text-agriText">{t.harvesting.soilRestoration}</h3>
            </div>

            <ul className="mt-4 space-y-3 text-xs">
              {guidance.soilRestorationSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-agriText">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
              <h4 className="font-bold text-xs text-forest-900">Compost & Organic Matter:</h4>
              <ul className="list-disc list-inside text-xs text-agriMuted space-y-1">
                {guidance.compostGuidance.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recommended Crop Rotation Options */}
        <div className="bg-white rounded-2xl border border-agriBorder p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-forest-600" />
                <h3 className="font-bold text-sm text-agriText">{t.harvesting.cropRotation}</h3>
              </div>
              <span className="text-[10px] text-agriMuted">Pulse Relay Recommended</span>
            </div>

            <div className="mt-4 space-y-3">
              {guidance.rotationSuggestions.map((rot, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-agriBorder bg-slate-50/70 hover:bg-forest-50/50 hover:border-forest-200 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-agriText">{rot.cropName}</span>
                    {rot.nitrogenFixing && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Nitrogen-Fixing (+40 kg N/ha)
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-agriMuted mt-1 leading-relaxed">{rot.benefits}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-100">
            <Link
              href="/farmer/suggestions?crop=crop-blackgram-vbn"
              className="w-full py-2.5 px-4 bg-forest-600 hover:bg-forest-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Explore Black Gram (Urad) Cultivation Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
