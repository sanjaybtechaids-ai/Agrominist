import { SoilType } from '@/types';

export interface SoilTestRecord {
  plotId: string;
  testedOn: string;
  labName: string;
  ph: number;
  nitrogenKgHa: number;
  phosphorusKgHa: number;
  potassiumKgHa: number;
  organicCarbonPercent: number;
  recommendations: string[];
}

export interface ISoilService {
  getSoilTest(plotId: string): Promise<SoilTestRecord | null>;
  estimateSoilNutrients(soilType: SoilType, district: string): Promise<{ ph: number; npkEstimate: string }>;
}

export const soilService: ISoilService = {
  async getSoilTest(_plotId: string): Promise<SoilTestRecord | null> {
    return null;
  },

  async estimateSoilNutrients(_soilType: SoilType, _district: string) {
    throw new Error('Soil nutrient estimates require an authorized soil data source or a laboratory test.');
  },
};
