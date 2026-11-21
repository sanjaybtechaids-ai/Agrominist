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
import {
  mockFarmerProfile,
  mockCustomerProfile,
  mockLandPlots,
  mockMarketplaceProducts,
  mockNotifications,
} from '@/data/mockData';

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
  resetToMockData: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentRole: 'farmer',
      isAuthenticated: true,
      language: 'en',
      farmerProfile: mockFarmerProfile,
      customerProfile: mockCustomerProfile,
      landPlots: mockLandPlots,
      landAllocations: [
        {
          id: 'alloc-1',
          plotName: 'North Parcel (Plot A)',
          area: 1.0,
          cropId: 'crop-paddy-ponni',
          cropName: 'Traditional Samba Paddy (Ponni)',
          estimatedExpenses: 26500,
          estimatedYieldKg: 2400,
          estimatedRevenue: 58800,
          estimatedProfit: 32300,
        },
        {
          id: 'alloc-2',
          plotName: 'South Riverway (Plot B)',
          area: 1.0,
          cropId: 'crop-blackgram-vbn',
          cropName: 'Black Gram / Urad (VBN 8)',
          estimatedExpenses: 9800,
          estimatedYieldKg: 420,
          estimatedRevenue: 35700,
          estimatedProfit: 25900,
        },
      ],
      products: mockMarketplaceProducts,
      notifications: mockNotifications,
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

      resetToMockData: () =>
        set({
          farmerProfile: mockFarmerProfile,
          customerProfile: mockCustomerProfile,
          landPlots: mockLandPlots,
          products: mockMarketplaceProducts,
          notifications: mockNotifications,
        }),
    }),
    {
      name: 'agronomist-app-storage-v1',
    }
  )
);
