'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/constants/translations';
import { mockCrops } from '@/data/mockData';
import { LandPlot, LandAllocation, SoilType, IrrigationType } from '@/types';
import { StatusBadge } from '@/components/common/StatusBadge';
import { MetricCard } from '@/components/common/MetricCard';
import { formatCurrency } from '@/lib/utils';
import {
  MapPin,
  Layers,
  Plus,
  Trash2,
  PieChart as PieIcon,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Droplets,
  FlaskConical,
  Compass,
  Sparkles,
  Info,
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export default function MyLandPage() {
  const { farmerProfile, landPlots, addLandPlot, removeLandPlot, language } = useAppStore();
  const t = translations[language] || translations.en;

  const totalLand = farmerProfile.landArea || 2.0;
  const unit = farmerProfile.measurementUnit || 'Acre';

  // State for Land Division Planner
  const [allocations, setAllocations] = useState<LandAllocation[]>([
    {
      id: 'alloc-1',
      plotName: 'Plot A (North Parcel)',
      area: 1.0,
      cropId: 'crop-paddy-ponni',
      cropName: 'Traditional Samba Paddy (Ponni)',
      estimatedExpenses: 26500,
      estimatedYieldKg: 2400,
      estimatedRevenue: 58800,
      estimatedProfit: 32300,
    },
    {
      id: 'alloc-2',
      plotName: 'Plot B (South Riverway)',
      area: 1.0,
      cropId: 'crop-blackgram-vbn',
      cropName: 'Black Gram / Urad (VBN 8)',
      estimatedExpenses: 9800,
      estimatedYieldKg: 420,
      estimatedRevenue: 35700,
      estimatedProfit: 25900,
    },
  ]);

  // Add Plot Modal State
  const [showAddPlotModal, setShowAddPlotModal] = useState(false);
  const [newPlotName, setNewPlotName] = useState('');
  const [newPlotArea, setNewPlotArea] = useState<number>(0.5);
  const [newPlotSoil, setNewPlotSoil] = useState<SoilType>('Alluvial');
  const [newPlotIrrigation, setNewPlotIrrigation] = useState<IrrigationType>('drip');

  // Allocation calculations
  const totalAllocated = allocations.reduce((acc, curr) => acc + curr.area, 0);
  const unallocatedArea = Math.max(0, Number((totalLand - totalAllocated).toFixed(2)));
  const isOverAllocated = totalAllocated > totalLand;

  const totalEstimatedExpense = allocations.reduce((acc, curr) => acc + curr.estimatedExpenses, 0);
  const totalEstimatedRevenue = allocations.reduce((acc, curr) => acc + curr.estimatedRevenue, 0);
  const totalEstimatedProfit = totalEstimatedRevenue - totalEstimatedExpense;

  // Preset Handlers
  const applyPreset = (preset: 'single' | 'two' | 'three') => {
    if (preset === 'single') {
      const crop = mockCrops[0];
      setAllocations([
        {
          id: `alloc-${Date.now()}-1`,
          plotName: 'Entire Farm (Plot 1)',
          area: totalLand,
          cropId: crop.id,
          cropName: crop.name,
          estimatedExpenses: crop.estimatedCultivationExpensePerAcre * totalLand,
          estimatedYieldKg: crop.expectedYieldPerAcreKg * totalLand,
          estimatedRevenue: crop.expectedYieldPerAcreKg * crop.estimatedMarketPricePerKg * totalLand,
          estimatedProfit:
            crop.expectedYieldPerAcreKg * crop.estimatedMarketPricePerKg * totalLand -
            crop.estimatedCultivationExpensePerAcre * totalLand,
        },
      ]);
    } else if (preset === 'two') {
      const half = Number((totalLand / 2).toFixed(2));
      const crop1 = mockCrops[0];
      const crop2 = mockCrops[1];
      setAllocations([
        {
          id: `alloc-${Date.now()}-1`,
          plotName: 'Plot A (50%)',
          area: half,
          cropId: crop1.id,
          cropName: crop1.name,
          estimatedExpenses: crop1.estimatedCultivationExpensePerAcre * half,
          estimatedYieldKg: crop1.expectedYieldPerAcreKg * half,
          estimatedRevenue: crop1.expectedYieldPerAcreKg * crop1.estimatedMarketPricePerKg * half,
          estimatedProfit:
            crop1.expectedYieldPerAcreKg * crop1.estimatedMarketPricePerKg * half -
            crop1.estimatedCultivationExpensePerAcre * half,
        },
        {
          id: `alloc-${Date.now()}-2`,
          plotName: 'Plot B (50%)',
          area: Number((totalLand - half).toFixed(2)),
          cropId: crop2.id,
          cropName: crop2.name,
          estimatedExpenses: crop2.estimatedCultivationExpensePerAcre * (totalLand - half),
          estimatedYieldKg: crop2.expectedYieldPerAcreKg * (totalLand - half),
          estimatedRevenue: crop2.expectedYieldPerAcreKg * crop2.estimatedMarketPricePerKg * (totalLand - half),
          estimatedProfit:
            crop2.expectedYieldPerAcreKg * crop2.estimatedMarketPricePerKg * (totalLand - half) -
            crop2.estimatedCultivationExpensePerAcre * (totalLand - half),
        },
      ]);
    } else if (preset === 'three') {
      const a1 = Number((totalLand * 0.4).toFixed(2));
      const a2 = Number((totalLand * 0.3).toFixed(2));
      const a3 = Number((totalLand - a1 - a2).toFixed(2));
      const c1 = mockCrops[0];
      const c2 = mockCrops[1];
      const c3 = mockCrops[2];
      setAllocations([
        {
          id: `alloc-${Date.now()}-1`,
          plotName: 'Plot A (40%)',
          area: a1,
          cropId: c1.id,
          cropName: c1.name,
          estimatedExpenses: c1.estimatedCultivationExpensePerAcre * a1,
          estimatedYieldKg: c1.expectedYieldPerAcreKg * a1,
          estimatedRevenue: c1.expectedYieldPerAcreKg * c1.estimatedMarketPricePerKg * a1,
          estimatedProfit:
            c1.expectedYieldPerAcreKg * c1.estimatedMarketPricePerKg * a1 -
            c1.estimatedCultivationExpensePerAcre * a1,
        },
        {
          id: `alloc-${Date.now()}-2`,
          plotName: 'Plot B (30%)',
          area: a2,
          cropId: c2.id,
          cropName: c2.name,
          estimatedExpenses: c2.estimatedCultivationExpensePerAcre * a2,
          estimatedYieldKg: c2.expectedYieldPerAcreKg * a2,
          estimatedRevenue: c2.expectedYieldPerAcreKg * c2.estimatedMarketPricePerKg * a2,
          estimatedProfit:
            c2.expectedYieldPerAcreKg * c2.estimatedMarketPricePerKg * a2 -
            c2.estimatedCultivationExpensePerAcre * a2,
        },
        {
          id: `alloc-${Date.now()}-3`,
          plotName: 'Plot C (30%)',
          area: a3,
          cropId: c3.id,
          cropName: c3.name,
          estimatedExpenses: c3.estimatedCultivationExpensePerAcre * a3,
          estimatedYieldKg: c3.expectedYieldPerAcreKg * a3,
          estimatedRevenue: c3.expectedYieldPerAcreKg * c3.estimatedMarketPricePerKg * a3,
          estimatedProfit:
            c3.expectedYieldPerAcreKg * c3.estimatedMarketPricePerKg * a3 -
            c3.estimatedCultivationExpensePerAcre * a3,
        },
      ]);
    }
  };

  const handleUpdateAllocationCrop = (id: string, cropId: string) => {
    const crop = mockCrops.find((c) => c.id === cropId);
    if (!crop) return;

    setAllocations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const expenses = crop.estimatedCultivationExpensePerAcre * item.area;
          const yieldKg = crop.expectedYieldPerAcreKg * item.area;
          const revenue = yieldKg * crop.estimatedMarketPricePerKg;
          return {
            ...item,
            cropId: crop.id,
            cropName: crop.name,
            estimatedExpenses: Math.round(expenses),
            estimatedYieldKg: Math.round(yieldKg),
            estimatedRevenue: Math.round(revenue),
            estimatedProfit: Math.round(revenue - expenses),
          };
        }
        return item;
      })
    );
  };

  const handleUpdateAllocationArea = (id: string, newArea: number) => {
    setAllocations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const crop = mockCrops.find((c) => c.id === item.cropId) || mockCrops[0];
          const expenses = crop.estimatedCultivationExpensePerAcre * newArea;
          const yieldKg = crop.expectedYieldPerAcreKg * newArea;
          const revenue = yieldKg * crop.estimatedMarketPricePerKg;
          return {
            ...item,
            area: newArea,
            estimatedExpenses: Math.round(expenses),
            estimatedYieldKg: Math.round(yieldKg),
            estimatedRevenue: Math.round(revenue),
            estimatedProfit: Math.round(revenue - expenses),
          };
        }
        return item;
      })
    );
  };

  const handleAddPlotToPlanner = () => {
    const defaultCrop = mockCrops[0];
    const initialArea = Math.min(0.5, unallocatedArea > 0 ? unallocatedArea : 0.5);
    setAllocations((prev) => [
      ...prev,
      {
        id: `alloc-${Date.now()}`,
        plotName: `Plot ${String.fromCharCode(65 + prev.length)}`,
        area: initialArea,
        cropId: defaultCrop.id,
        cropName: defaultCrop.name,
        estimatedExpenses: Math.round(defaultCrop.estimatedCultivationExpensePerAcre * initialArea),
        estimatedYieldKg: Math.round(defaultCrop.expectedYieldPerAcreKg * initialArea),
        estimatedRevenue: Math.round(
          defaultCrop.expectedYieldPerAcreKg * defaultCrop.estimatedMarketPricePerKg * initialArea
        ),
        estimatedProfit: Math.round(
          defaultCrop.expectedYieldPerAcreKg * defaultCrop.estimatedMarketPricePerKg * initialArea -
            defaultCrop.estimatedCultivationExpensePerAcre * initialArea
        ),
      },
    ]);
  };

  const handleRemoveAllocation = (id: string) => {
    setAllocations((prev) => prev.filter((a) => a.id !== id));
  };

  // Pie chart data
  const pieData = allocations.map((a, i) => ({
    name: `${a.plotName}: ${a.cropName.split(' ')[0]}`,
    value: a.area,
    color: ['#246B45', '#4B9561', '#E8A23A', '#4285B8', '#8B5CF6'][i % 5],
  }));

  if (unallocatedArea > 0) {
    pieData.push({
      name: 'Unallocated Land',
      value: unallocatedArea,
      color: '#E2E8F0',
    });
  }

  const handleCreateNewPlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlotName.trim()) return;

    const newPlot: LandPlot = {
      id: `plot-${Date.now()}`,
      farmerId: farmerProfile.id,
      name: newPlotName,
      area: newPlotArea,
      unit,
      soilType: newPlotSoil,
      soilHealth: {
        status: 'estimated',
        ph: 6.9,
        nitrogen: 220,
        phosphorus: 20,
        potassium: 270,
        organicCarbon: 0.58,
        moisture: 30,
        waterHoldingCapacity: 'Medium',
      },
      irrigationType: newPlotIrrigation,
    };

    addLandPlot(newPlot);
    setShowAddPlotModal(false);
    setNewPlotName('');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-agriText">{t.land.title}</h1>
          <p className="text-xs text-agriMuted mt-1">{t.land.subtitle}</p>
        </div>
        <button
          onClick={() => setShowAddPlotModal(true)}
          className="px-4 py-2 bg-forest-600 hover:bg-forest-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Physical Plot
        </button>
      </div>

      {/* Primary Land Overview & Interactive Geo-Map Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Visual Map Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-agriBorder p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-forest-600" />
              <h2 className="font-bold text-sm text-agriText">Interactive Field Boundary & Soil Map</h2>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status="measured" />
              <span className="text-[10px] text-agriMuted">GPS: 10.787° N, 79.138° E</span>
            </div>
          </div>

          {/* Map Canvas Visualizer */}
          <div className="relative mt-3 h-72 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
            {/* Visual satellite agricultural terrain representation */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-80"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse at center, rgba(36, 107, 69, 0.4) 0%, rgba(18, 55, 36, 0.8) 100%), linear-gradient(to right, #1b3a29 1px, transparent 1px), linear-gradient(to bottom, #1b3a29 1px, transparent 1px)',
                backgroundSize: '100% 100%, 32px 32px, 32px 32px',
              }}
            />

            {/* Overlaid Plot Outlines */}
            <svg className="absolute inset-0 w-full h-full p-6" viewBox="0 0 500 300">
              {/* Outer boundary */}
              <rect
                x="40"
                y="30"
                width="420"
                height="240"
                rx="10"
                fill="none"
                stroke="#4B9561"
                strokeWidth="2"
                strokeDasharray="6 3"
              />
              <text x="50" y="25" fill="#E1EFE7" fontSize="11" fontWeight="bold">
                Kallaperambur Survey No. 142/3A (Total 2.00 Acres)
              </text>

              {/* Plot A representation */}
              <rect
                x="50"
                y="45"
                width="200"
                height="210"
                rx="6"
                fill="rgba(36, 107, 69, 0.45)"
                stroke="#62AB83"
                strokeWidth="2"
              />
              <text x="65" y="75" fill="#FFFFFF" fontSize="13" fontWeight="bold">
                Plot A (1.00 Acre)
              </text>
              <text x="65" y="95" fill="#C2DFCE" fontSize="11">
                Crop: Samba Paddy (CR 1009)
              </text>
              <text x="65" y="115" fill="#E1EFE7" fontSize="10">
                Soil: Alluvial • pH 6.8 (Lab Measured)
              </text>
              <text x="65" y="135" fill="#E1EFE7" fontSize="10">
                Irrigation: Borewell Pump
              </text>

              {/* Plot B representation */}
              <rect
                x="260"
                y="45"
                width="190"
                height="210"
                rx="6"
                fill="rgba(75, 149, 97, 0.35)"
                stroke="#95C7AB"
                strokeWidth="2"
              />
              <text x="275" y="75" fill="#FFFFFF" fontSize="13" fontWeight="bold">
                Plot B (1.00 Acre)
              </text>
              <text x="275" y="95" fill="#C2DFCE" fontSize="11">
                Crop: Black Gram (VBN 8)
              </text>
              <text x="275" y="115" fill="#E1EFE7" fontSize="10">
                Soil: Clay Loam • pH 7.1 (Regional Est.)
              </text>
              <text x="275" y="135" fill="#E1EFE7" fontSize="10">
                Irrigation: Drip Installed
              </text>
            </svg>

            {/* Map Legend Floating Tag */}
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs p-2 rounded-lg text-[10px] text-agriText space-y-1 shadow-sm border border-agriBorder">
              <div className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 bg-forest-600 rounded-xs" /> Plot A (Paddy Samba)
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 bg-leaf-500 rounded-xs" /> Plot B (Black Gram)
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-agriMuted">
            <span>Coordinates verified with village revenue records.</span>
            <span className="text-forest-700 font-semibold cursor-pointer hover:underline">
              Calibrate with GPS Point
            </span>
          </div>
        </div>

        {/* Soil Health Parameter Cards */}
        <div className="bg-white rounded-2xl border border-agriBorder p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-forest-600" />
                <h3 className="font-bold text-sm text-agriText">Certified Soil Nutrient Card</h3>
              </div>
              <StatusBadge status="measured" />
            </div>

            <div className="mt-4 space-y-3.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-agriMuted">Soil Reaction (pH):</span>
                <span className="font-bold text-agriText px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                  6.8 (Neutral - Optimum)
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-agriMuted">Available Nitrogen (N):</span>
                  <span className="font-bold text-agriText">245 kg/ha (Medium)</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-forest-600" style={{ width: '65%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-agriMuted">Available Phosphorus (P):</span>
                  <span className="font-bold text-agriText">22 kg/ha (Medium-High)</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-leaf-600" style={{ width: '75%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-agriMuted">Available Potassium (K):</span>
                  <span className="font-bold text-agriText">290 kg/ha (Adequate)</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600" style={{ width: '82%' }} />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-agriMuted block">Soil Moisture</span>
                  <span className="font-bold text-agriText flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-sky-600" /> 32% (Optimum)
                  </span>
                </div>
                <div>
                  <span className="text-agriMuted block">Water Holding</span>
                  <span className="font-bold text-agriText">High (Delta Silt)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-agriMuted">
            Tested by: Thanjavur Govt. Soil Testing Lab (Sample ID: THJ-2025-081)
          </div>
        </div>
      </div>

      {/* SMART LAND DIVISION PLANNER MODULE */}
      <div className="bg-white rounded-2xl border border-agriBorder p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-agriBorder gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-forest-600" />
              <h2 className="font-bold text-lg text-agriText">{t.land.divisionPlanner}</h2>
            </div>
            <p className="text-xs text-agriMuted mt-0.5">
              Simulate dividing your registered {totalLand} {unit}s into multiple plots to diversify risk, compare yields, and optimize farm revenue.
            </p>
          </div>

          {/* Allocation Presets Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-agriMuted">Presets:</span>
            <button
              onClick={() => applyPreset('single')}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-forest-50 hover:text-forest-700 text-xs font-medium rounded-lg transition-colors"
            >
              Single Crop (100%)
            </button>
            <button
              onClick={() => applyPreset('two')}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-forest-50 hover:text-forest-700 text-xs font-medium rounded-lg transition-colors"
            >
              50% + 50%
            </button>
            <button
              onClick={() => applyPreset('three')}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-forest-50 hover:text-forest-700 text-xs font-medium rounded-lg transition-colors"
            >
              40% + 30% + 30%
            </button>
          </div>
        </div>

        {/* Validation Warning Alert */}
        {isOverAllocated && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>
                <strong>Warning:</strong> Total allocated area ({totalAllocated} {unit}s) exceeds your registered farm size ({totalLand} {unit}s). Adjust plot areas below.
              </span>
            </div>
            <span className="font-bold">+{Number((totalAllocated - totalLand).toFixed(2))} {unit}s over limit</span>
          </div>
        )}

        {/* Allocation Status Indicator */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-agriBorder text-xs">
          <div>
            <span className="text-agriMuted block font-medium">Registered Land Area</span>
            <span className="text-lg font-bold text-agriText">{totalLand} {unit}s</span>
          </div>
          <div>
            <span className="text-agriMuted block font-medium">Total Allocated Area</span>
            <span className={`text-lg font-bold ${isOverAllocated ? 'text-rose-600' : 'text-forest-700'}`}>
              {totalAllocated.toFixed(2)} {unit}s
            </span>
          </div>
          <div>
            <span className="text-agriMuted block font-medium">Remaining Unused Area</span>
            <span className="text-lg font-bold text-agriText">
              {unallocatedArea.toFixed(2)} {unit}s
            </span>
          </div>
        </div>

        {/* Plots List & Visual Allocation Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editable Plot Table (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-agriText">Allocated Farm Plots</h3>
              <button
                onClick={handleAddPlotToPlanner}
                className="text-xs font-semibold text-forest-700 hover:text-forest-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Plot Division
              </button>
            </div>

            <div className="space-y-3">
              {allocations.map((alloc, idx) => (
                <div
                  key={alloc.id}
                  className="p-4 rounded-xl border border-agriBorder bg-white hover:border-forest-200 transition-colors shadow-2xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-forest-100 text-forest-700 font-bold text-xs flex items-center justify-center">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="font-bold text-sm text-agriText">{alloc.plotName}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <label className="text-xs text-agriMuted">Area ({unit}s):</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0.1"
                          max={totalLand}
                          value={alloc.area}
                          onChange={(e) =>
                            handleUpdateAllocationArea(alloc.id, parseFloat(e.target.value) || 0)
                          }
                          className="w-20 px-2 py-1 bg-slate-50 border border-agriBorder rounded-lg text-xs font-bold text-agriText focus:outline-none focus:ring-1 focus:ring-forest-600"
                        />
                      </div>

                      {allocations.length > 1 && (
                        <button
                          onClick={() => handleRemoveAllocation(alloc.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Remove Plot"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                    <div>
                      <label className="block text-[11px] font-medium text-agriMuted mb-1">
                        Assigned Crop Recommendation
                      </label>
                      <select
                        value={alloc.cropId}
                        onChange={(e) => handleUpdateAllocationCrop(alloc.id, e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-50 border border-agriBorder rounded-lg text-xs font-medium text-agriText focus:outline-none focus:ring-1 focus:ring-forest-600"
                      >
                        {mockCrops.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} ({c.season})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2 rounded-lg text-[11px]">
                      <div>
                        <span className="text-agriMuted block">Est. Yield</span>
                        <span className="font-bold text-agriText">{alloc.estimatedYieldKg} kg</span>
                      </div>
                      <div>
                        <span className="text-agriMuted block">Cultivation Cost</span>
                        <span className="font-bold text-slate-700">{formatCurrency(alloc.estimatedExpenses)}</span>
                      </div>
                      <div>
                        <span className="text-agriMuted block">Est. Net Profit</span>
                        <span className="font-bold text-emerald-700">{formatCurrency(alloc.estimatedProfit)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Allocation Visualization & Projected Economics */}
          <div className="bg-slate-50/70 rounded-xl border border-agriBorder p-4 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-agriMuted flex items-center gap-1.5 mb-2">
                <PieIcon className="w-3.5 h-3.5 text-forest-600" /> Land Allocation Distribution
              </h3>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={3}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: number) => [`${val} ${unit}s`, 'Area']}
                      contentStyle={{ fontSize: 11, borderRadius: 8 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Economic Outcome Projection Summary */}
              <div className="mt-4 pt-3 border-t border-slate-200 space-y-2 text-xs">
                <h4 className="font-bold text-agriText text-[11px] uppercase tracking-wider">
                  Total Farm Projected Returns
                </h4>
                <div className="flex justify-between">
                  <span className="text-agriMuted">Estimated Gross Revenue:</span>
                  <span className="font-bold text-agriText">{formatCurrency(totalEstimatedRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-agriMuted">Estimated Cultivation Cost:</span>
                  <span className="font-bold text-slate-700">{formatCurrency(totalEstimatedExpense)}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200">
                  <span className="font-bold text-forest-800">Projected Net Farm Profit:</span>
                  <span className="font-bold text-emerald-700 text-sm">{formatCurrency(totalEstimatedProfit)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2 text-[10px] text-agriMuted leading-tight">
              Projections are based on current APMC market prices and typical agricultural input expenditure.
            </div>
          </div>
        </div>
      </div>

      {/* Add Physical Plot Modal */}
      {showAddPlotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-agriBorder shadow-xl animate-in fade-in">
            <h3 className="font-bold text-base text-agriText">Add New Farm Plot</h3>
            <p className="text-xs text-agriMuted mt-0.5">
              Register an additional plot parcel under your farmer profile.
            </p>

            <form onSubmit={handleCreateNewPlot} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-agriText mb-1">Plot Name</label>
                <input
                  type="text"
                  required
                  value={newPlotName}
                  onChange={(e) => setNewPlotName(e.target.value)}
                  placeholder="e.g. East Canal Field"
                  className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-agriText mb-1">
                    Area ({unit}s)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    required
                    value={newPlotArea}
                    onChange={(e) => setNewPlotArea(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-agriText mb-1">Irrigation</label>
                  <select
                    value={newPlotIrrigation}
                    onChange={(e) => setNewPlotIrrigation(e.target.value as IrrigationType)}
                    className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest-600"
                  >
                    <option value="borewell">Borewell</option>
                    <option value="drip">Drip</option>
                    <option value="canal">Canal</option>
                    <option value="rainfed">Rainfed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-agriText mb-1">Soil Type</label>
                <select
                  value={newPlotSoil}
                  onChange={(e) => setNewPlotSoil(e.target.value as SoilType)}
                  className="w-full px-3 py-2 bg-slate-50 border border-agriBorder rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-forest-600"
                >
                  <option value="Alluvial">Alluvial Soil</option>
                  <option value="Clay Loam">Clay Loam</option>
                  <option value="Red Loam">Red Loam</option>
                  <option value="Black Clay">Black Clay</option>
                  <option value="Sandy Loam">Sandy Loam</option>
                </select>
              </div>

              <div className="flex gap-2 justify-end pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddPlotModal(false)}
                  className="px-4 py-2 text-xs text-agriMuted hover:text-agriText font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-forest-600 text-white rounded-xl text-xs font-semibold hover:bg-forest-700"
                >
                  Save Plot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
