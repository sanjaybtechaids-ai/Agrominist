'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  UserRole,
  SupportedLanguage,
  FarmerProfile,
  CustomerProfile,
  LandPlot,
  LandAllocation,
  MarketplaceProduct,
  AppNotification,
} from '@/types';

const emptyFarmerProfile: FarmerProfile = {
  id: '', name: '', email: '', phone: '', preferredLanguage: 'en', landArea: 0,
  measurementUnit: 'Acre', location: { village: '', district: '', state: '', gpsAllowed: false },
  soilType: 'Unknown', soilStatus: 'unavailable', irrigationFacility: 'none', existingCrops: [],
  farmingType: 'individual', farmingSchedule: 'full-time', availableWorkers: 0,
  ownSellingMarket: false, onboardingCompleted: false,
};

const emptyCustomerProfile: CustomerProfile = {
  id: '', name: '', email: '', phone: '', location: { district: '', state: '' }, preferredLanguage: 'en',
};

interface AppState {
  currentRole: UserRole | null;
  isAuthenticated: boolean;
  language: SupportedLanguage;
  farmerProfile: FarmerProfile;
  customerProfile: CustomerProfile;
  landPlots: LandPlot[];
  landAllocations: LandAllocation[];
  products: MarketplaceProduct[];
  notifications: AppNotification[];
  voiceModalOpen: boolean;
  offlineEnabled: boolean;

  // Actions
  setRole: (role: UserRole | null) => void;
  loginAsFarmer: () => void;
  loginAsCustomer: () => void;
  logout: () => void;
  setLanguage: (lang: SupportedLanguage) => void;
  updateFarmerProfile: (updates: Partial<FarmerProfile>) => void;
  updateCustomerProfile: (updates: Partial<CustomerProfile>) => void;
  setLandPlots: (plots: LandPlot[]) => void;
  addLandPlot: (plot: LandPlot) => void;
  removeLandPlot: (id: string) => void;
  setLandAllocations: (allocations: LandAllocation[]) => void;
  addProduct: (product: MarketplaceProduct) => void;
  updateProduct: (id: string, updates: Partial<MarketplaceProduct>) => void;
  deleteProduct: (id: string) => void;
  markProductAsSold: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  setVoiceModalOpen: (open: boolean) => void;
  toggleOfflineMode: () => void;
  resetLocalData: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentRole: null,
      isAuthenticated: false,
      language: 'en',
      farmerProfile: emptyFarmerProfile,
      customerProfile: emptyCustomerProfile,
      landPlots: [],
      landAllocations: [],
      products: [],
      notifications: [],
      voiceModalOpen: false,
      offlineEnabled: true,

      setRole: (role) => set({ currentRole: role }),
      loginAsFarmer: () => set({ currentRole: 'farmer', isAuthenticated: true }),
      loginAsCustomer: () => set({ currentRole: 'customer', isAuthenticated: true }),
      logout: () => set({ currentRole: null, isAuthenticated: false }),
      setLanguage: (language) => set({ language }),

      updateFarmerProfile: (updates) =>
        set((state) => ({
          farmerProfile: { ...state.farmerProfile, ...updates },
        })),

      updateCustomerProfile: (updates) =>
        set((state) => ({
          customerProfile: { ...state.customerProfile, ...updates },
        })),

      setLandPlots: (landPlots) => set({ landPlots }),

      addLandPlot: (plot) =>
        set((state) => ({
          landPlots: [...state.landPlots, plot],
        })),

      removeLandPlot: (id) =>
        set((state) => ({
          landPlots: state.landPlots.filter((p) => p.id !== id),
        })),

      setLandAllocations: (landAllocations) => set({ landAllocations }),

      addProduct: (product) =>
        set((state) => ({
          products: [product, ...state.products],
        })),

      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      markProductAsSold: (id) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, status: 'sold' as const } : p
          ),
        })),

      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      markAllNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),

      setVoiceModalOpen: (voiceModalOpen) => set({ voiceModalOpen }),

      toggleOfflineMode: () =>
        set((state) => ({ offlineEnabled: !state.offlineEnabled })),

      resetLocalData: () =>
        set({
          farmerProfile: emptyFarmerProfile,
          customerProfile: emptyCustomerProfile,
          landPlots: [],
          landAllocations: [],
          products: [],
          notifications: [],
        }),
    }),
    {
      // v2 deliberately discards the former demo-filled browser cache.
      name: 'agronomist-app-storage-v2',
      version: 2,
    }
  )
);
