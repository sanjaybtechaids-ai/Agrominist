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
  async getSoilTest(plotId: string): Promise<SoilTestRecord | null> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return {
      plotId,
      testedOn: '2025-08-12',
      labName: 'Thanjavur District Soil Health Laboratory (Govt. of TN)',
      ph: 6.8,
      nitrogenKgHa: 245,
      phosphorusKgHa: 22,
      potassiumKgHa: 290,
      organicCarbonPercent: 0.65,
      recommendations: [
        'Apply 1500 kg/acre vermicompost basal to build organic carbon reserve.',
        'Nitrogen split application recommended in 3 vegetative intervals.',
        'Phosphorus fixation is moderate; apply DAP in root zone depth.',
      ],
    };
  },

  async estimateSoilNutrients(soilType: SoilType, district: string) {
    return {
      ph: soilType === 'Alluvial' ? 6.9 : soilType === 'Black Clay' ? 7.8 : 6.4,
      npkEstimate: `Estimated regional baseline for ${soilType} in ${district}: Moderate N, Medium P, Adequate K.`,
    };
  },
};
