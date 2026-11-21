import { WeatherForecast } from '@/types';
import { mockWeatherForecast } from '@/data/mockData';

export interface IWeatherService {
  getForecast(lat: number, lng: number): Promise<WeatherForecast>;
  getAlerts(district: string): Promise<string[]>;
}

export const weatherService: IWeatherService = {
  async getForecast(lat: number, lng: number): Promise<WeatherForecast> {
    // Simulated network delay
    await new Promise((resolve) => setTimeout(resolve, 150));
    return {
      ...mockWeatherForecast,
      locationName: lat && lng ? `Cauvery Delta Basin (${lat.toFixed(2)}°N, ${lng.toFixed(2)}°E)` : mockWeatherForecast.locationName,
    };
  },

  async getAlerts(district: string): Promise<string[]> {
    return [
      `Rain alert for ${district}: 12.5mm expected with delta cloud cover.`,
      `Optimal sowing window for pulse relay cropping active.`,
    ];
  },
};
