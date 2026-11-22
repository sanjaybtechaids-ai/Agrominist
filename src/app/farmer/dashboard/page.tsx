'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CloudSun, MapPin, Sprout, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { MetricCard } from '@/components/common/MetricCard';

export default function FarmerDashboard() {
  const { farmerProfile, landPlots } = useAppStore();
  const latitude = farmerProfile.location.lat;
  const longitude = farmerProfile.location.lng;
  const hasLocation = Number.isFinite(latitude) && Number.isFinite(longitude);
  const [weather, setWeather] = useState<{ temperatureC: number; condition: string | null; lastUpdated: string } | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  useEffect(() => {
    if (!hasLocation) return;
    const controller = new AbortController();
    const loadWeather = async () => {
      try {
        setWeatherError(null);
        const response = await fetch(`/api/weather/current?lat=${encodeURIComponent(String(latitude))}&lng=${encodeURIComponent(String(longitude))}`, { signal: controller.signal });
        const payload = await response.json() as { data?: { temperatureC?: number; condition?: string | null; lastUpdated?: string }; error?: { message?: string } };
        if (!response.ok || typeof payload.data?.temperatureC !== 'number') throw new Error(payload.error?.message ?? 'Live weather is unavailable.');
        setWeather({ temperatureC: payload.data.temperatureC, condition: payload.data.condition ?? null, lastUpdated: payload.data.lastUpdated ?? new Date().toISOString() });
      } catch (error) {
        if (!controller.signal.aborted) setWeatherError(error instanceof Error ? error.message : 'Live weather is unavailable.');
      }
    };
    void loadWeather();
    return () => controller.abort();
  }, [hasLocation, latitude, longitude]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-agriText">Welcome{farmerProfile.name ? `, ${farmerProfile.name}` : ''}</h1>
        <p className="mt-1 text-sm text-agriMuted">Your farm information, verified advisories, and marketplace activity.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Registered plots" value={landPlots.length} subtitle={landPlots.length ? 'Saved to your farm record' : 'No plots added yet'} icon={MapPin} iconColor="bg-emerald-50 text-emerald-700" />
        <MetricCard title="Weather" value={weather ? `${Math.round(weather.temperatureC)}°C` : hasLocation && !weatherError ? 'Loading…' : 'Needs location'} subtitle={weather ? `${weather.condition ?? 'Current conditions'} · updated ${new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date(weather.lastUpdated))}` : weatherError ?? 'Add farm coordinates to retrieve live conditions'} icon={CloudSun} iconColor="bg-sky-50 text-sky-700" />
        <MetricCard title="Crop planning" value={farmerProfile.soilStatus === 'measured' ? 'Ready to assess' : 'Needs soil test'} subtitle={farmerProfile.soilStatus === 'measured' ? 'Use verified soil results for recommendations' : 'Add a laboratory soil test before planning crops'} icon={Sprout} iconColor="bg-amber-50 text-amber-700" />
      </div>

      <section className="rounded-2xl border border-agriBorder bg-white p-6">
        <h2 className="text-base font-bold text-agriText">Start with your farm record</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-agriMuted">
          Add your plot coordinates and a laboratory soil test. Weather is retrieved live from OpenWeatherMap; crop, fertilizer, and financial guidance is shown only after verified or clearly labelled source data is available.
        </p>
        <Link href={hasLocation ? '/farmer/land' : '/onboarding'} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-forest-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest-700">
          {hasLocation ? 'Manage land plots' : 'Add farm location'} <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
