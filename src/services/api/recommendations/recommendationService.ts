import { Crop, FertilizerRecommendation, SoilType } from '@/types';
import { mockCrops, mockFertilizers } from '@/data/mockData';

export interface IRecommendationService {
  getCropRecommendations(soilType: SoilType, waterAvailability: string): Promise<Crop[]>;
  getFertilizerSchedule(cropId: string, plotAreaAcre: number): Promise<FertilizerRecommendation[]>;
}

export const recommendationService: IRecommendationService = {
  async getCropRecommendations(soilType: SoilType, waterAvailability: string): Promise<Crop[]> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return mockCrops.filter((crop) => {
      const soilMatch = crop.suitableSoil.includes(soilType);
      const waterMatch = waterAvailability === 'High' ? true : crop.waterRequirement !== 'High';
      return soilMatch || waterMatch;
    });
  },

  async getFertilizerSchedule(_cropId: string, _plotAreaAcre: number): Promise<FertilizerRecommendation[]> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return mockFertilizers;
  },
};
