export interface MandiPrice {
  commodity: string;
  variety: string;
  market: string;
  district: string;
  modalPricePerQuintal: number;
  minPrice: number;
  maxPrice: number;
  arrivalDate: string;
}

export interface IMandiService {
  getLatestPrices(district: string): Promise<MandiPrice[]>;
}

/** Returns no prices until an authorized Agmarknet/e-NAM adapter is configured. */
export const mandiService: IMandiService = {
  async getLatestPrices(_district: string): Promise<MandiPrice[]> {
    return [];
  },
};
