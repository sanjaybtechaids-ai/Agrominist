'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/constants/translations';
import { mockFertilizers } from '@/data/mockData';
import { FertilizerRecommendation } from '@/types';
import { formatCurrency } from '@/lib/utils';
import {
  FlaskConical,
  Sprout,
  Calculator,
  Calendar,
  AlertTriangle,
  ShieldAlert,
  Info,
  CheckCircle2,
  DollarSign,
  Layers,
} from 'lucide-react';

export default function FertilizerAdvisoryPage() {
  const { farmerProfile, language } = useAppStore();
  const t = translations[language] || translations.en;

  // Selected plot area for dynamic dosage calculation
  const [selectedArea, setSelectedArea] = useState<number>(farmerProfile.landArea || 2.0);
  const [activeTab, setActiveTab] = useState<'all' | 'organic' | 'chemical'>('all');

  // Filtered lists
  const organicList = mockFertilizers.filter((f) => f.category === 'organic');
  const chemicalList = mockFertilizers.filter((f) => f.category === 'chemical' || f.category === 'soil-amendment');

  const displayList =
    activeTab === 'organic' ? organicList : activeTab === 'chemical' ? chemicalList : mockFertilizers;

  // Total cost calculations for selectedArea
  const totalOrganicCost = organicList.reduce((acc, f) => {
    return acc + f.dosageKgPerAcre * f.costPerUnit * selectedArea;
  }, 0);

  const totalChemicalCost = chemicalList.reduce((acc, f) => {
    // For 50kg bag items, dosageKgPerAcre / 50 is bag count
    const units = f.unitType.includes('bag') ? (f.dosageKgPerAcre / 50) : f.dosageKgPerAcre;
    return acc + units * f.costPerUnit * selectedArea;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-forest-600" />
            <h1 className="text-2xl font-bold text-agriText">{t.fertilizers.title}</h1>
          </div>
          <p className="text-xs text-agriMuted mt-1">{t.fertilizers.subtitle}</p>
        </div>

        {/* Plot Area Dynamic Selector */}
        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-agriBorder shadow-xs">
          <Layers className="w-4 h-4 text-forest-600" />
          <label className="text-xs font-semibold text-agriText">Calculate for:</label>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(parseFloat(e.target.value) || 1)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-forest-800 focus:outline-none focus:ring-1 focus:ring-forest-600"
          >
            <option value={1.0}>1.00 Acre (Plot A)</option>
            <option value={farmerProfile.landArea || 2.0}>
              {farmerProfile.landArea || 2.0} Acres (Full Farm)
            </option>
            <option value={0.5}>0.50 Acre</option>
            <option value={3.0}>3.00 Acres</option>
          </select>
        </div>
      </div>

      {/* Provisional Scientific Notice */}
      <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold block">{t.fertilizers.disclaimer}</strong>
          <span className="text-[11px] text-amber-800">
            Certified soil testing is required before high-potency chemical topdressing to prevent nitrate toxicity and groundwater leaching.
          </span>
        </div>
      </div>

      {/* Fertilizer Cost Calculator Summary Card */}
      <div className="bg-white rounded-2xl border border-agriBorder p-5 shadow-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Calculator className="w-5 h-5 text-forest-600" />
          <h2 className="font-bold text-sm text-agriText">{t.fertilizers.calculator}</h2>
          <span className="text-xs text-agriMuted">({selectedArea} Acres Coverage)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
              Organic Amendments
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xl font-bold text-emerald-900">
                {formatCurrency(totalOrganicCost)}
              </span>
            </div>
            <p className="text-[10px] text-emerald-700 mt-1">Vermicompost, FYM & Green Manure</p>
          </div>

          <div className="p-4 bg-sky-50/60 rounded-xl border border-sky-100">
            <span className="text-xs font-semibold text-sky-800 uppercase tracking-wider block">
              Chemical & Micronutrients
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xl font-bold text-sky-900">
                {formatCurrency(totalChemicalCost)}
              </span>
            </div>
            <p className="text-[10px] text-sky-700 mt-1">Urea, DAP, NPK 20:20 & Zinc Sulphate</p>
          </div>

          <div className="p-4 bg-forest-50 rounded-xl border border-forest-200">
            <span className="text-xs font-semibold text-forest-800 uppercase tracking-wider block">
              Total Fertilizer Investment
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-forest-900">
                {formatCurrency(totalOrganicCost + totalChemicalCost)}
              </span>
            </div>
            <p className="text-[10px] text-forest-700 mt-1">Comprehensive balanced crop nutrition</p>
          </div>
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center gap-2 border-b border-agriBorder pb-1 text-xs">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-forest-600 text-white shadow-xs'
              : 'text-agriMuted hover:text-agriText hover:bg-slate-100'
          }`}
        >
          All Recommendations ({mockFertilizers.length})
        </button>
        <button
          onClick={() => setActiveTab('organic')}
          className={`px-4 py-2 rounded-xl font-bold transition-all ${
            activeTab === 'organic'
              ? 'bg-forest-600 text-white shadow-xs'
              : 'text-agriMuted hover:text-agriText hover:bg-slate-100'
          }`}
        >
          Organic Fertilizers ({organicList.length})
        </button>
        <button
          onClick={() => setActiveTab('chemical')}
          className={`px-4 py-2 rounded-xl font-bold transition-all ${
            activeTab === 'chemical'
              ? 'bg-forest-600 text-white shadow-xs'
              : 'text-agriMuted hover:text-agriText hover:bg-slate-100'
          }`}
        >
          Chemical & Mineral ({chemicalList.length})
        </button>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayList.map((fert) => {
          // Dynamic calculation for selectedArea
          const totalQtyKg = fert.dosageKgPerAcre * selectedArea;
          const isBag = fert.unitType.includes('bag');
          const totalUnits = isBag ? totalQtyKg / 50 : totalQtyKg;
          const totalItemCost = totalUnits * fert.costPerUnit;

          return (
            <div
              key={fert.id}
              className="bg-white rounded-2xl border border-agriBorder p-5 shadow-xs hover:border-forest-200 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Card Title & Category Tag */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-base text-agriText">{fert.name}</h3>
                    <p className="text-xs text-forest-700 font-medium">Target: {fert.targetCrop}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        fert.category === 'organic'
                          ? 'bg-emerald-100 text-emerald-800'
                          : fert.category === 'chemical'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {fert.category}
                    </span>
                    {fert.isProvisional && (
                      <span className="text-[9px] text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        Provisional Dose
                      </span>
                    )}
                  </div>
                </div>

                {/* Dosage & Quantity Metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl text-xs">
                  <div>
                    <span className="text-agriMuted block text-[10px] uppercase font-semibold">
                      Per Acre Rate
                    </span>
                    <span className="font-bold text-agriText">{fert.dosageKgPerAcre} kg</span>
                  </div>
                  <div>
                    <span className="text-agriMuted block text-[10px] uppercase font-semibold">
                      For {selectedArea} Acre(s)
                    </span>
                    <span className="font-bold text-forest-700">
                      {isBag ? `${totalUnits.toFixed(1)} Bags (${totalQtyKg} kg)` : `${totalQtyKg} kg`}
                    </span>
                  </div>
                  <div>
                    <span className="text-agriMuted block text-[10px] uppercase font-semibold">
                      Est. Total Cost
                    </span>
                    <span className="font-bold text-emerald-700">{formatCurrency(totalItemCost)}</span>
                  </div>
                </div>

                {/* Application Schedule */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-agriText">
                    <Calendar className="w-3.5 h-3.5 text-forest-600" />
                    <span>{t.fertilizers.schedule}:</span>
                  </div>
                  <p className="text-agriMuted pl-5 leading-relaxed">{fert.schedule}</p>
                </div>

                {/* Safety & Precautions */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-amber-800">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                    <span>{t.fertilizers.precautions}:</span>
                  </div>
                  <p className="text-slate-600 pl-5 leading-relaxed bg-amber-50/50 p-2 rounded-lg border border-amber-100">
                    {fert.precautions}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-agriMuted">
                <span>Unit Rate: ₹{fert.costPerUnit} / {fert.unitType}</span>
                <span className="text-forest-700 font-semibold">Subsidized / Standard Rate</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
