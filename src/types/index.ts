export type UserRole = 'farmer' | 'customer';

export type SupportedLanguage = 'en' | 'ta' | 'hi' | 'te' | 'kn' | 'ml';

export type MeasurementUnit = 'Acre' | 'Cent' | 'Hectare';

export type FarmingType = 'individual' | 'family' | 'worker-assisted';

export type FarmingSchedule = 'full-time' | 'part-time';

export type IrrigationType = 'drip' | 'sprinkler' | 'canal' | 'borewell' | 'rainfed' | 'none';

export type SoilType = 'Red Loam' | 'Black Clay' | 'Alluvial' | 'Sandy Loam' | 'Clay Loam' | 'Laterite' | 'Unknown';

export interface FarmerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  profilePhoto?: string;
  preferredLanguage: SupportedLanguage;
  landArea: number;
  measurementUnit: MeasurementUnit;
  location: {
    district: string;
    state: string;
    village: string;
    lat?: number;
    lng?: number;
    gpsAllowed: boolean;
  };
  soilType: SoilType;
  soilStatus: 'measured' | 'estimated' | 'unavailable';
  irrigationFacility: IrrigationType;
  existingCrops: string[];
  farmingType: FarmingType;
  farmingSchedule: FarmingSchedule;
  availableWorkers: number;
  ownSellingMarket: boolean;
  onboardingCompleted: boolean;
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: {
    district: string;
    state: string;
    address?: string;
  };
  preferredLanguage: SupportedLanguage;
}

export interface LandPlot {
  id: string;
  farmerId: string;
  name: string;
  area: number; // in current measurement unit
  unit: MeasurementUnit;
  soilType: SoilType;
  soilHealth: {
    status: 'measured' | 'estimated' | 'unavailable';
    ph?: number;
    nitrogen?: number; // kg/ha
    phosphorus?: number; // kg/ha
    potassium?: number; // kg/ha
    organicCarbon?: number; // %
    moisture?: number; // %
    waterHoldingCapacity?: string; // High, Medium, Low
  };
  irrigationType: IrrigationType;
  allocatedCrop?: string;
  coordinates?: { lat: number; lng: number }[];
}

export interface LandAllocation {
  id: string;
  plotName: string;
  area: number;
  cropId: string;
  cropName: string;
  estimatedExpenses: number;
  estimatedYieldKg: number;
  estimatedRevenue: number;
  estimatedProfit: number;
}

export interface WeatherDayForecast {
  day: string;
  date: string;
  tempMax: number;
  tempMin: number;
  humidity: number;
  rainfallMm: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Cloudy' | 'Light Rain' | 'Heavy Rain' | 'Thunderstorm';
  iconName: string;
}

export interface WeatherForecast {
  locationName: string;
  currentTemp: number;
  humidity: number;
  windSpeedKmh: number;
  rainfallProbability: number;
  expectedRainfallMm: number;
  condition: string;
  nextRainExpected: string;
  forecast7Days: WeatherDayForecast[];
}

export interface Crop {
  id: string;
  name: string;
  tamilName: string;
  category: 'Cereal' | 'Pulse' | 'Cash Crop' | 'Vegetable' | 'Fruit' | 'Oilseed' | 'Spice';
  season: 'Kharif' | 'Rabi' | 'Zaid' | 'All-Season';
  suitableSoil: SoilType[];
  waterRequirement: 'Low' | 'Moderate' | 'High';
  sowingPeriod: string;
  harvestPeriod: string;
  durationDays: number;
  expectedYieldPerAcreKg: number;
  estimatedMarketPricePerKg: number;
  estimatedCultivationExpensePerAcre: number;
  suitabilityScore: number; // 0 - 100
  recommendationReason: string;
  imageUrl: string;
}

export interface FertilizerRecommendation {
  id: string;
  name: string;
  category: 'organic' | 'chemical' | 'soil-amendment';
  targetCrop: string;
  recommendedPerAcre: string;
  dosageKgPerAcre: number;
  costPerUnit: number; // INR per kg/bag
  unitType: 'kg' | 'bag (50kg)' | 'litre';
  schedule: string;
  precautions: string;
  isProvisional: boolean;
}

export interface PostHarvestGuidance {
  id: string;
  previousCrop: string;
  harvestDate: string;
  soilRestorationSteps: string[];
  rotationSuggestions: {
    cropName: string;
    benefits: string;
    nitrogenFixing: boolean;
  }[];
  residueManagement: {
    method: string;
    recommendation: string;
    avoidBurningNotice: string;
  };
  compostGuidance: string[];
  soilNutrientImprovement: string[];
  landPreparationGuidance: string[];
  timeline: {
    phase: string;
    duration: string;
    description: string;
    status: 'completed' | 'in-progress' | 'pending';
  }[];
}

export interface MarketplaceProduct {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerLocation: {
    village: string;
    district: string;
    state: string;
  };
  title: string;
  category: 'Vegetables' | 'Grains & Cereals' | 'Fruits' | 'Pulses' | 'Spices' | 'Organic Specialty';
  description: string;
  availableQuantity: number;
  unit: 'kg' | 'quintal' | 'tonne' | 'bag';
  pricePerUnit: number;
  harvestDate: string;
  images: string[];
  hasOwnMarket: boolean;
  deliveryOption: 'pickup' | 'delivery' | 'both';
  isOrganicCertified?: boolean;
  status: 'active' | 'sold' | 'draft';
  inquiriesCount: number;
  interestedBuyers?: {
    customerName: string;
    customerPhone: string;
    offeredPrice?: number;
    requestedQty: number;
    date: string;
  }[];
}

export interface FarmingExpenseAnalytics {
  season: string;
  cropName: string;
  cultivationExpenses: number;
  fertilizerExpenses: number;
  waterExpenses: number;
  labourExpenses: number;
  seedAndPesticideExpenses: number;
  totalEstimatedInvestment: number;
  harvestQuantityKg: number;
  sellingPricePerKg: number;
  grossRevenue: number;
  estimatedNetProfit: number;
  historicalYield: {
    year: string;
    yieldQuintals: number;
    revenue: number;
    expense: number;
  }[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  category: 'weather' | 'advisory' | 'fertilizer' | 'harvest' | 'marketplace' | 'system';
  severity: 'info' | 'warning' | 'alert' | 'success';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface VoiceState {
  isListening: boolean;
  transcript: string;
  response: string;
  isProcessing: boolean;
  isPlayingAudio: boolean;
}
