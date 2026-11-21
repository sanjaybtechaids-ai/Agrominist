'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/constants/translations';
import { mockWeatherForecast, mockCrops } from '@/data/mockData';
import { MetricCard } from '@/components/common/MetricCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  Thermometer,
  Droplets,
  CloudRain,
  MapPin,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  ChevronRight,
  Sprout,
  Info,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function FarmerDashboard() {
  const { farmerProfile, language, setVoiceModalOpen } = useAppStore();
  const t = translations[language] || translations.en;

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening';

  const upcomingTasks = [
    { id: 1, title: 'Top-dress Neem Coated Urea (25kg/acre)', plot: 'Plot A (North Parcel)', date: 'Within 3 days', priority: 'high', type: 'fertilizer' },
    { id: 2, title: 'Clean secondary field drainage bunds', plot: 'Plot B (South Riverway)', date: 'Before tomorrow rain', priority: 'urgent', type: 'maintenance' },
    { id: 3, title: 'Prepare seedbed for Black Gram relay crop', plot: 'Plot B', date: 'In 12 days', priority: 'medium', type: 'planting' },
  ];

  return (
    <div className="space-y-6">
      {/* Demonstration Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start sm:items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-700 shrink-0" />
          <span>{t.dashboard.demoNotice}</span>
        </div>
        <span className="font-semibold px-2 py-0.5 rounded-full bg-amber-200 text-amber-800 text-[10px] shrink-0">
          DEMO DATA
        </span>
      </div>

      {/* Header Greeting & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-agriText tracking-tight">
              {greeting}, {farmerProfile.name}
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-forest-100 text-forest-800 text-xs font-semibold">
              {farmerProfile.location.district}, {farmerProfile.location.state}
            </span>
          </div>
          <p className="text-xs text-agriMuted mt-1">
            Registered Farm: <span className="font-semibold text-agriText">{farmerProfile.landArea} {farmerProfile.measurementUnit}s</span> ({farmerProfile.soilType} Soil) • Irrigation: <span className="font-semibold capitalize text-agriText">{farmerProfile.irrigationFacility}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setVoiceModalOpen(true)}
            className="px-3.5 py-2 bg-white border border-forest-600 text-forest-700 hover:bg-forest-50 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Sparkles className="w-4 h-4 text-forest-600" />
            <span>AI Voice Query</span>
          </button>
          <Link
            href="/farmer/land"
            className="px-4 py-2 bg-forest-600 hover:bg-forest-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <span>Smart Land Planner</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 4 Key Agro-Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Current Temperature"
          value={`${mockWeatherForecast.currentTemp}°C`}
          subtitle="Cauvery Delta weather station"
          icon={Thermometer}
          iconColor="bg-amber-50 text-amber-600"
          trend={{ direction: 'up', label: '+1.5°C vs yesterday' }}
        />
        <MetricCard
          title="Atmospheric Humidity"
          value={`${mockWeatherForecast.humidity}%`}
          subtitle="Optimal delta moisture"
          icon={Droplets}
          iconColor="bg-sky-50 text-sky-600"
          trend={{ direction: 'neutral', label: 'High air moisture' }}
        />
        <MetricCard
          title="Rain Expected"
          value={`${mockWeatherForecast.expectedRainfallMm} mm`}
          subtitle="Tomorrow ~2:00 PM front"
          icon={CloudRain}
          iconColor="bg-blue-50 text-blue-600"
          trend={{ direction: 'down', label: '65% probability' }}
        />
        <MetricCard
          title="Registered Land Area"
          value={farmerProfile.landArea}
          unit={farmerProfile.measurementUnit}
          subtitle={`Soil: ${farmerProfile.soilType}`}
          icon={MapPin}
          iconColor="bg-emerald-50 text-emerald-600"
          badge={<StatusBadge status={farmerProfile.soilStatus} />}
        />
      </div>

      {/* Main Grid: Weather & Urgent Advisory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7-Day Agro-Weather Forecast Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-agriBorder p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <h2 className="font-bold text-base text-agriText">{t.dashboard.weatherForecast7Days}</h2>
              <p className="text-xs text-agriMuted">Daytime Highs, Nighttime Lows & Expected Rainfall (mm)</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-forest-700 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-forest-600" /> Max Temp (°C)
              </span>
              <span className="flex items-center gap-1.5 text-sky-700 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Rainfall (mm)
              </span>
            </div>
          </div>

          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockWeatherForecast.forecast7Days} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#246B45" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#246B45" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4285B8" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#4285B8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F3F0" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#69766D' }} />
                <YAxis tick={{ fontSize: 11, fill: '#69766D' }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border border-agriBorder rounded-xl shadow-lg text-xs space-y-1">
                          <p className="font-bold text-agriText">{data.day}, {data.date}</p>
                          <p className="text-forest-700 font-medium">High: {data.tempMax}°C | Low: {data.tempMin}°C</p>
                          <p className="text-sky-600 font-medium">Rainfall: {data.rainfallMm} mm ({data.condition})</p>
                          <p className="text-agriMuted text-[10px]">Humidity: {data.humidity}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="tempMax" stroke="#246B45" strokeWidth={2.5} fillOpacity={1} fill="url(#tempGradient)" name="Max Temp (°C)" />
                <Area type="monotone" dataKey="rainfallMm" stroke="#4285B8" strokeWidth={2} fillOpacity={1} fill="url(#rainGradient)" name="Rain (mm)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-agriMuted">
            <span>Forecast updated: Today, 6:00 AM (IMD Regional Model Calibration)</span>
            <span className="font-semibold text-agriText">{mockWeatherForecast.nextRainExpected}</span>
          </div>
        </div>

        {/* Agricultural Advisory Card */}
        <div className="bg-white rounded-2xl border border-agriBorder p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-forest-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sprout className="w-4 h-4" /> {t.dashboard.todayAdvisory}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-forest-100 text-forest-800 text-[10px] font-bold">
                HIGH PRIORITY
              </span>
            </div>

            <h3 className="font-bold text-sm text-agriText leading-snug">
              Pause fertilizer broadcasting before tomorrow's 12.5mm delta rainfall
            </h3>

            <p className="text-xs text-agriMuted mt-2 leading-relaxed">
              Based on IMD convective cloud tracking over Thanjavur, incoming rains will cause surface wash-off if soluble nitrogen (Urea/DAP) is applied today. Postpone application to Friday.
            </p>

            <div className="mt-4 p-3 bg-forest-50/70 border border-forest-200 rounded-xl space-y-1.5 text-xs text-forest-900">
              <p className="font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest-700" /> Action Items:
              </p>
              <ul className="list-disc list-inside text-[11px] text-forest-800 space-y-1">
                <li>Drain excess standing water in Plot A to 3-5 cm.</li>
                <li>Clear canal spillways to prevent stagnant flooding.</li>
                <li>Verify stock of Neem-coated Urea for post-rain top-dressing.</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <Link
              href="/farmer/fertilizers"
              className="w-full py-2 px-3 bg-slate-50 hover:bg-forest-50 border border-agriBorder hover:border-forest-200 rounded-xl text-xs font-semibold text-forest-700 flex items-center justify-between transition-colors"
            >
              <span>View Full Fertilizer Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recommended Crops & Upcoming Farm Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Crops Preview (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-agriBorder p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="font-bold text-base text-agriText">{t.dashboard.recommendedCrops}</h2>
              <p className="text-xs text-agriMuted">Top seasonal crop recommendations based on your soil and water profile</p>
            </div>
            <Link
              href="/farmer/suggestions"
              className="text-xs font-bold text-forest-700 hover:text-forest-800 flex items-center gap-1"
            >
              View all 6 crops <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {mockCrops.slice(0, 2).map((crop) => (
              <div
                key={crop.id}
                className="border border-agriBorder rounded-xl overflow-hidden hover:border-forest-300 transition-colors bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="h-32 w-full relative overflow-hidden bg-slate-100">
                    <img
                      src={crop.imageUrl}
                      alt={crop.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[11px] font-bold text-forest-800 shadow-2xs">
                      {crop.suitabilityScore}% Match
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-0.5 rounded-md text-[10px] font-medium">
                      {crop.category} • {crop.season}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div>
                      <h4 className="font-bold text-sm text-agriText leading-tight">{crop.name}</h4>
                      <p className="text-xs text-forest-700 font-medium">{crop.tamilName}</p>
                    </div>

                    <p className="text-xs text-agriMuted line-clamp-2 leading-relaxed">
                      {crop.recommendationReason}
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                      <div>
                        <span className="text-agriMuted block">Est. Yield / Acre</span>
                        <span className="font-bold text-agriText">{crop.expectedYieldPerAcreKg} kg</span>
                      </div>
                      <div>
                        <span className="text-agriMuted block">Est. Market Price</span>
                        <span className="font-bold text-emerald-700">₹{crop.estimatedMarketPricePerKg}/kg</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <Link
                    href={`/farmer/suggestions?crop=${crop.id}`}
                    className="block w-full text-center py-2 bg-forest-50 hover:bg-forest-100 text-forest-700 rounded-lg text-xs font-semibold transition-colors"
                  >
                    View Crop Advisory & Economics
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks Timeline */}
        <div className="bg-white rounded-2xl border border-agriBorder p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-bold text-sm text-agriText flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-forest-600" /> {t.dashboard.upcomingTasks}
              </h2>
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-agriMuted font-medium">
                3 Pending
              </span>
            </div>

            <div className="mt-3 space-y-3">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 rounded-xl border border-agriBorder bg-slate-50/60 hover:bg-white transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-semibold text-agriText leading-tight">{task.title}</p>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 ${
                        task.priority === 'urgent'
                          ? 'bg-rose-100 text-rose-800'
                          : task.priority === 'high'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-[10px] text-agriMuted">
                    <span>{task.plot}</span>
                    <span className="font-medium text-forest-700 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {task.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <Link
              href="/farmer/harvesting"
              className="text-xs font-semibold text-forest-700 hover:text-forest-800 flex items-center justify-between"
            >
              <span>View Full Crop Cultivation Timeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
