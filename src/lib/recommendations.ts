export interface CropRule {
  cropName: string; soils: string[]; irrigation: Array<'rainfed' | 'irrigated'>; season: string;
  yieldKgPerAcre: number; pricePerKg: number; expensePerAcre: number; source: string;
}

// Conservative starter rules. They are estimates, never fertilizer prescriptions.
export const cropRules: CropRule[] = [
  { cropName: 'Black gram', soils: ['Alluvial', 'Clay Loam', 'Red Loam'], irrigation: ['rainfed', 'irrigated'], season: 'Rabi', yieldKgPerAcre: 350, pricePerKg: 85, expensePerAcre: 10500, source: 'TNAU crop production guidance—validate locally' },
  { cropName: 'Sesame', soils: ['Sandy Loam', 'Red Loam', 'Alluvial'], irrigation: ['rainfed', 'irrigated'], season: 'Rabi', yieldKgPerAcre: 250, pricePerKg: 130, expensePerAcre: 12000, source: 'TNAU crop production guidance—validate locally' },
  { cropName: 'Paddy', soils: ['Alluvial', 'Clay Loam', 'Black Clay'], irrigation: ['irrigated'], season: 'Kharif / Samba', yieldKgPerAcre: 2200, pricePerKg: 24, expensePerAcre: 30000, source: 'TNAU crop production guidance—validate locally' },
];

export function recommendCrops(input: { soilType: string; irrigationType: string; areaAcres: number }) {
  const irrigation = input.irrigationType === 'rainfed' || input.irrigationType === 'none' ? 'rainfed' : 'irrigated';
  return cropRules.filter((rule) => rule.soils.includes(input.soilType) && rule.irrigation.includes(irrigation)).map((rule) => {
    const estimatedYield = rule.yieldKgPerAcre * input.areaAcres;
    const estimatedExpenses = rule.expensePerAcre * input.areaAcres;
    const estimatedRevenue = estimatedYield * rule.pricePerKg;
    return { ...rule, suitabilityScore: 70, estimatedYield, estimatedExpenses, estimatedRevenue, estimatedProfit: estimatedRevenue - estimatedExpenses, confidenceLevel: 'provisional' };
  });
}
