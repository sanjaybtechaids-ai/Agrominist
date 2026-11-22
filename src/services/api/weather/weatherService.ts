import { WeatherForecast } from '@/types';

export interface IWeatherService {
  getForecast(lat: number, lng: number): Promise<WeatherForecast>;
  getAlerts(district: string): Promise<string[]>;
}

export const weatherService: IWeatherService = {
  async getForecast(lat: number, lng: number): Promise<WeatherForecast> {
    void lat;
    void lng;
    throw new Error('Live weather is unavailable until an authorized provider is configured.');
  },

  async getAlerts(district: string): Promise<string[]> {
    void district;
    return [];
  },
};
