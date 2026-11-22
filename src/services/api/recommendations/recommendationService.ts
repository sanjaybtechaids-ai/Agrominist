import { Crop, FertilizerRecommendation, SoilType } from '@/types';

export interface IRecommendationService {
  getCropRecommendations(soilType: SoilType, waterAvailability: string): Promise<Crop[]>;
  getFertilizerSchedule(cropId: string, plotAreaAcre: number): Promise<FertilizerRecommendation[]>;
}

export const recommendationService: IRecommendationService = {
  async getCropRecommendations(soilType: SoilType, waterAvailability: string): Promise<Crop[]> {
    void soilType;
    void waterAvailability;
    return [];
  },

  async getFertilizerSchedule(_cropId: string, _plotAreaAcre: number): Promise<FertilizerRecommendation[]> {
    return [];
  },
};
