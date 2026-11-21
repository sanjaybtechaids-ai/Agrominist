'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/constants/translations';
import { mockCrops } from '@/data/mockData';
import { Crop } from '@/types';
import { formatCurrency } from '@/lib/utils';
import {
  Sparkles,
  Filter,
  Check,
  ArrowRight,
  Droplets,
  Calendar,
  Clock,
  TrendingUp,
  Scale,
  X,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export default function CropSuggestionsPage() {
  const { language } = useAppStore();
  const t = translations[language] || translations.en;

  // Filters
  const [selectedSeason, setSelectedSeason] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedWater, setSelectedWater] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'suitability' | 'profit' | 'duration'>('suitability');

  // Comparison State
  const [compareList, setCompareList] = useState<string[]>(['crop-paddy-ponni', 'crop-blackgram-vbn']);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Filter crops
  const filteredCrops = mockCrops
    .filter((crop) => {
      const matchSeason = selectedSeason === 'All' || crop.season === selectedSeason;
      const matchCategory = selectedCategory === 'All' || crop.category === selectedCategory;
      const matchWater = selectedWater === 'All' || crop.waterRequirement === selectedWater;
      return matchSeason && matchCategory && matchWater;
    })
    .sort((a, b) => {
      if (sortBy === 'suitability') return b.suitabilityScore - a.suitabilityScore;
      if (sortBy === 'profit') {
        const profitA = a.expectedYieldPerAcreKg * a.estimatedMarketPricePerKg - a.estimatedCultivationExpensePerAcre;
        const profitB = b.expectedYieldPerAcreKg * b.estimatedMarketPricePerKg - b.estimatedCultivationExpensePerAcre;
        return profitB - profitA;
      }
      return a.durationDays - b.durationDays;
    });

  const toggleCompare = (cropId: string) => {
    if (compareList.includes(cropId)) {
      setCompareList(compareList.filter((id) => id !== cropId));
    } else {
      if (compareList.length >= 3) {
        alert('You can compare a maximum of 3 crops at once.');
        return;
      }
      setCompareList([...compareList, cropId]);
    }
  };

  const comparedCropObjects = mockCrops.filter((c) => compareList.includes(c.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-forest-600" />
            <h1 className="text-2xl font-bold text-agriText">{t.crops.title}</h1>
          </div>
          <p className="text-xs text-agriMuted mt-1">{t.crops.subtitle}</p>
        </div>

        {/* Compare Floating Button */}
        <div className="flex items-center gap-3">
          {compareList.length > 0 && (
            <button
              onClick={() => setShowCompareModal(true)}
              className="px-4 py-2 bg-leaf-600 hover:bg-leaf-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Scale className="w-4 h-4" />
              <span>Compare Selected ({compareList.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Scientific Disclaimer Alert */}
      <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">{t.crops.disclaimer}</p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-agriBorder shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-agriText pb-2 border-b border-slate-100">
          <Filter className="w-4 h-4 text-forest-600" /> Filter & Sort Recommendations
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {/* Season Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-agriMuted mb-1">Farming Season</label>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-1 focus:ring-forest-600 focus:outline-none"
            >
              <option value="All">All Seasons</option>
              <option value="Kharif">Kharif (Monsoon / Samba)</option>
              <option value="Rabi">Rabi (Winter / Navarai)</option>
              <option value="Zaid">Zaid (Summer)</option>
              <option value="All-Season">All-Season</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-agriMuted mb-1">Crop Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-1 focus:ring-forest-600 focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Cereal">Cereal (Paddy, etc.)</option>
              <option value="Pulse">Pulse (Urad, etc.)</option>
              <option value="Oilseed">Oilseed (Sesame, etc.)</option>
              <option value="Vegetable">Vegetable (Bhendi, etc.)</option>
              <option value="Spice">Spice (Turmeric, etc.)</option>
              <option value="Fruit">Fruit (Banana, etc.)</option>
            </select>
          </div>

          {/* Water Requirement Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-agriMuted mb-1">Water Need</label>
            <select
              value={selectedWater}
              onChange={(e) => setSelectedWater(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-1 focus:ring-forest-600 focus:outline-none"
            >
              <option value="All">Any Water Availability</option>
              <option value="Low">Low Water (Drought Tolerant)</option>
              <option value="Moderate">Moderate Water</option>
              <option value="High">High Water (Inundation/Canal)</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[11px] font-semibold text-agriMuted mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:ring-1 focus:ring-forest-600 focus:outline-none"
            >
              <option value="suitability">Highest Suitability Score</option>
              <option value="profit">Estimated Net Profit</option>
              <option value="duration">Shortest Cultivation Duration</option>
            </select>
          </div>
        </div>
      </div>

      {/* Crops Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map((crop) => {
          const grossRevenue = crop.expectedYieldPerAcreKg * crop.estimatedMarketPricePerKg;
          const netProfit = grossRevenue - crop.estimatedCultivationExpensePerAcre;
          const isSelectedForCompare = compareList.includes(crop.id);

          return (
            <div
              key={crop.id}
              className={`bg-white rounded-2xl border transition-all overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md ${
                isSelectedForCompare ? 'border-forest-600 ring-2 ring-forest-600/30' : 'border-agriBorder'
              }`}
            >
              <div>
                {/* Crop Image & Badges */}
                <div className="h-44 w-full relative bg-slate-100 overflow-hidden">
                  <img
                    src={crop.imageUrl}
                    alt={crop.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-forest-800 shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-forest-600" />
                    <span>{crop.suitabilityScore}% Match</span>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => toggleCompare(crop.id)}
                      className={`px-2 py-1 rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1 transition-colors ${
                        isSelectedForCompare
                          ? 'bg-forest-600 text-white'
                          : 'bg-white/90 text-agriText hover:bg-white'
                      }`}
                    >
                      {isSelectedForCompare ? (
                        <>
                          <Check className="w-3 h-3" /> Compared
                        </>
                      ) : (
                        '+ Compare'
                      )}
                    </button>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 bg-black/70 text-white px-2 py-0.5 rounded-md text-[10px] font-medium">
                    {crop.category} • {crop.season} Season
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-base text-agriText leading-tight">{crop.name}</h3>
                    <p className="text-xs font-semibold text-forest-700">{crop.tamilName}</p>
                  </div>

                  <p className="text-xs text-agriMuted leading-relaxed line-clamp-2">
                    {crop.recommendationReason}
                  </p>

                  {/* Attributes Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="flex items-center gap-1.5 text-agriText">
                      <Clock className="w-3.5 h-3.5 text-agriMuted" />
                      <span>{crop.durationDays} Days Duration</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-agriText">
                      <Droplets className="w-3.5 h-3.5 text-sky-600" />
                      <span>{crop.waterRequirement} Water</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-agriText col-span-2 text-[11px] text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-agriMuted" />
                      <span>Sow: {crop.sowingPeriod}</span>
                    </div>
                  </div>

                  {/* Economics Box */}
                  <div className="p-3 bg-forest-50/60 rounded-xl border border-forest-100 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-agriMuted">Est. Yield / Acre:</span>
                      <span className="font-bold text-agriText">{crop.expectedYieldPerAcreKg} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-agriMuted">Market Price:</span>
                      <span className="font-bold text-agriText">₹{crop.estimatedMarketPricePerKg}/kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-agriMuted">Cultivation Expense:</span>
                      <span className="font-bold text-slate-700">{formatCurrency(crop.estimatedCultivationExpensePerAcre)}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-forest-200">
                      <span className="font-bold text-forest-900">Est. Net Profit / Acre:</span>
                      <span className="font-bold text-emerald-700 text-sm">{formatCurrency(netProfit)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => toggleCompare(crop.id)}
                  className="w-full py-2 bg-slate-50 hover:bg-forest-50 text-forest-700 border border-agriBorder hover:border-forest-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>{isSelectedForCompare ? 'Remove from Comparison' : 'Add to Crop Comparison'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CROP COMPARISON MODAL */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 border border-agriBorder shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-agriBorder">
              <div>
                <h3 className="font-bold text-lg text-agriText flex items-center gap-2">
                  <Scale className="w-5 h-5 text-forest-600" /> Side-by-Side Crop Comparison
                </h3>
                <p className="text-xs text-agriMuted">
                  Compare economics, cultivation duration, and agro-climatic needs between candidate crops.
                </p>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="p-1.5 rounded-lg text-agriMuted hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Matrix Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-agriBorder bg-slate-50">
                    <th className="p-3 font-bold text-agriMuted uppercase text-[10px] w-1/4">Metric</th>
                    {comparedCropObjects.map((crop) => (
                      <th key={crop.id} className="p-3 font-bold text-forest-800 text-sm">
                        {crop.name}
                        <span className="block text-[11px] font-normal text-forest-600">{crop.tamilName}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-semibold text-agriMuted">Suitability Score</td>
                    {comparedCropObjects.map((crop) => (
                      <td key={crop.id} className="p-3 font-bold text-forest-700">
                        {crop.suitabilityScore}% Match
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-agriMuted">Season & Category</td>
                    {comparedCropObjects.map((crop) => (
                      <td key={crop.id} className="p-3 text-agriText">
                        {crop.season} • {crop.category}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-agriMuted">Duration</td>
                    {comparedCropObjects.map((crop) => (
                      <td key={crop.id} className="p-3 font-medium text-agriText">
                        {crop.durationDays} Days
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-agriMuted">Water Requirement</td>
                    {comparedCropObjects.map((crop) => (
                      <td key={crop.id} className="p-3">
                        <span className="px-2 py-0.5 rounded-full bg-sky-50 text-sky-800 font-medium text-[11px]">
                          {crop.waterRequirement}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-agriMuted">Est. Yield / Acre</td>
                    {comparedCropObjects.map((crop) => (
                      <td key={crop.id} className="p-3 font-bold text-agriText">
                        {crop.expectedYieldPerAcreKg} kg
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-agriMuted">Market Price / kg</td>
                    {comparedCropObjects.map((crop) => (
                      <td key={crop.id} className="p-3 font-bold text-agriText">
                        ₹{crop.estimatedMarketPricePerKg}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-agriMuted">Cultivation Cost / Acre</td>
                    {comparedCropObjects.map((crop) => (
                      <td key={crop.id} className="p-3 font-bold text-slate-700">
                        {formatCurrency(crop.estimatedCultivationExpensePerAcre)}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-emerald-50/60 font-bold">
                    <td className="p-3 font-bold text-emerald-900">Est. Net Profit / Acre</td>
                    {comparedCropObjects.map((crop) => {
                      const net =
                        crop.expectedYieldPerAcreKg * crop.estimatedMarketPricePerKg -
                        crop.estimatedCultivationExpensePerAcre;
                      return (
                        <td key={crop.id} className="p-3 text-emerald-700 text-sm font-bold">
                          {formatCurrency(net)}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-agriMuted">Suitable Soils</td>
                    {comparedCropObjects.map((crop) => (
                      <td key={crop.id} className="p-3 text-[11px] text-slate-600">
                        {crop.suitableSoil.join(', ')}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-agriMuted">
                Notice: All metrics are modeled regional projections for planning purposes.
              </span>
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-4 py-2 bg-forest-600 text-white rounded-xl text-xs font-semibold hover:bg-forest-700"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
