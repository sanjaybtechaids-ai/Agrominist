'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/constants/translations';
import { mockFarmingAnalytics } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  PieChart as PieIcon,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Sprout,
  Users,
  Droplets,
  FlaskConical,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function FarmingAnalyticsPage() {
  const { language } = useAppStore();
  const t = translations[language] || translations.en;

  const [selectedSeason, setSelectedSeason] = useState('Kharif Samba 2025-2026');
  const [selectedCrop, setSelectedCrop] = useState('Paddy (Ponni) - 2.0 Acres');

  const analytics = mockFarmingAnalytics;

  // Pie chart for expenses breakdown
  const expenseBreakdown = [
    { name: 'Labour & Harvesting', value: analytics.labourExpenses, color: '#246B45' },
    { name: 'Seed & Land Prep', value: analytics.cultivationExpenses, color: '#4B9561' },
    { name: 'Fertilizer & Micronutrients', value: analytics.fertilizerExpenses, color: '#E8A23A' },
    { name: 'Crop Protection & Pesticides', value: analytics.seedAndPesticideExpenses, color: '#8B5CF6' },
    { name: 'Irrigation & Pumping', value: analytics.waterExpenses, color: '#4285B8' },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-forest-600" />
            <h1 className="text-2xl font-bold text-agriText">{t.nav.analytics}</h1>
          </div>
          <p className="text-xs text-agriMuted mt-1">
            Financial breakdown of input investments, crop yields, and seasonal net margins.
          </p>
        </div>

        {/* Season & Crop Filter */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-xl border border-agriBorder shadow-xs">
          <Filter className="w-4 h-4 text-agriMuted ml-1" />
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="px-2.5 py-1 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg text-agriText focus:outline-none"
          >
            <option value="Kharif Samba 2025-2026">Kharif Samba 2025-2026</option>
            <option value="Rabi Navarai 2025">Rabi Navarai 2025</option>
            <option value="Kharif 2024">Kharif 2024</option>
          </select>

          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-2.5 py-1 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg text-agriText focus:outline-none"
          >
            <option value="Paddy (Ponni) - 2.0 Acres">Paddy (Ponni) - 2.0 Acres</option>
            <option value="Black Gram (Urad) - 1.0 Acre">Black Gram (Urad) - 1.0 Acre</option>
          </select>
        </div>
      </div>

      {/* Top 4 Financial Performance Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-agriBorder shadow-xs">
          <span className="text-xs font-semibold text-agriMuted uppercase tracking-wider block">
            Total Investment
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-800">
              {formatCurrency(analytics.totalEstimatedInvestment)}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">All agricultural input expenditures</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-agriBorder shadow-xs">
          <span className="text-xs font-semibold text-agriMuted uppercase tracking-wider block">
            Harvest Realization
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-agriText">{analytics.harvestQuantityKg}</span>
            <span className="text-xs text-agriMuted">kg (49 Quintals)</span>
          </div>
          <p className="text-[10px] text-emerald-700 mt-2 font-medium">Avg: ₹{analytics.sellingPricePerKg}/kg</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-agriBorder shadow-xs">
          <span className="text-xs font-semibold text-agriMuted uppercase tracking-wider block">
            Gross Market Revenue
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-forest-800">
              {formatCurrency(analytics.grossRevenue)}
            </span>
          </div>
          <p className="text-[10px] text-forest-700 mt-2 flex items-center gap-1 font-semibold">
            <ArrowUpRight className="w-3 h-3" /> +6.4% vs 2024 cycle
          </p>
        </div>

        <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 shadow-xs">
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
            Estimated Net Profit
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-emerald-900">
              {formatCurrency(analytics.estimatedNetProfit)}
            </span>
          </div>
          <p className="text-[10px] text-emerald-700 mt-2 font-medium">54.2% Return on Farm Investment</p>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Historical Revenue vs Expense Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-agriBorder p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="font-bold text-sm text-agriText">Yearly Revenue vs. Input Cost (4-Year Trend)</h2>
              <p className="text-xs text-agriMuted">Track farm revenue growth across cultivation seasons</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-forest-700 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-forest-600" /> Revenue (₹)
              </span>
              <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Expense (₹)
              </span>
            </div>
          </div>

          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.historicalYield} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F3F0" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#69766D' }} />
                <YAxis tick={{ fontSize: 11, fill: '#69766D' }} />
                <Tooltip
                  formatter={(val: number) => [formatCurrency(val), '']}
                  contentStyle={{ fontSize: 11, borderRadius: 8 }}
                />
                <Bar dataKey="revenue" name="Revenue" fill="#246B45" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" name="Expense" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Input Expense Breakdown Donut Chart */}
        <div className="bg-white rounded-2xl border border-agriBorder p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-agriText flex items-center gap-1.5">
                <PieIcon className="w-4 h-4 text-forest-600" /> Expense Allocation
              </h3>
              <span className="text-[10px] text-agriMuted">Kharif Cycle</span>
            </div>

            <div className="h-48 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseBreakdown}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                  >
                    {expenseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: number) => [formatCurrency(val), 'Expense']}
                    contentStyle={{ fontSize: 11, borderRadius: 8 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Breakdown List */}
            <div className="space-y-1.5 mt-2 text-xs">
              {expenseBreakdown.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-agriMuted text-[11px]">
                    <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: item.color }} />
                    {item.name}:
                  </span>
                  <span className="font-bold text-agriText">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
