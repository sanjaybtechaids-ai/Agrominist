import { z } from 'zod';
import { fail, handleApiError, ok } from '@/lib/api';

const query = z.object({ lat: z.coerce.number().min(-90).max(90), lng: z.coerce.number().min(-180).max(180) });

type OpenWeatherCurrent = {
  main?: { temp?: number; humidity?: number };
  wind?: { speed?: number };
  weather?: Array<{ main?: string; description?: string }>;
  rain?: { '1h'?: number; '3h'?: number };
  dt?: number;
  name?: string;
};

export async function GET(request: Request) {
  try {
    const input = query.parse(Object.fromEntries(new URL(request.url).searchParams));
    const apiKey = process.env.WEATHER_API_KEY;
    const provider = process.env.WEATHER_PROVIDER ?? 'openweathermap';
    if (!apiKey || provider !== 'openweathermap') {
      return fail('WEATHER_UNAVAILABLE', 'Live weather is not configured with an authorized provider.', 503);
    }
    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    url.searchParams.set('lat', String(input.lat));
    url.searchParams.set('lon', String(input.lng));
    url.searchParams.set('units', 'metric');
    url.searchParams.set('appid', apiKey);
    const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(8_000) });
    if (!response.ok) {
      return fail('WEATHER_PROVIDER_ERROR', 'The weather provider could not return current conditions.', 502);
    }
    const data = await response.json() as OpenWeatherCurrent;
    const updatedAt = data.dt ? new Date(data.dt * 1000).toISOString() : new Date().toISOString();
    const cacheSeconds = Math.min(3600, Math.max(60, Number(process.env.WEATHER_CACHE_SECONDS ?? 600)));
    return Response.json({
      data: {
        status: 'VERIFIED', provider: 'OpenWeatherMap', location: { latitude: input.lat, longitude: input.lng, name: data.name ?? null },
        temperatureC: data.main?.temp ?? null, humidityPercent: data.main?.humidity ?? null,
        windSpeedMetresPerSecond: data.wind?.speed ?? null,
        rainfallMm: data.rain?.['1h'] ?? data.rain?.['3h'] ?? 0,
        condition: data.weather?.[0]?.main ?? null, description: data.weather?.[0]?.description ?? null,
        lastUpdated: updatedAt,
      },
    }, { headers: { 'Cache-Control': `private, max-age=${cacheSeconds}` } });
  } catch (error) { return handleApiError(error); }
}
