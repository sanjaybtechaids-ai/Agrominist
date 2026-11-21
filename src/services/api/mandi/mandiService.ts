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

export const mandiService: IMandiService = {
  async getLatestPrices(district: string): Promise<MandiPrice[]> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return [
      {
        commodity: 'Paddy (Dhan)',
        variety: 'Common / Ponni',
        market: `${district} Regulated Market`,
        district,
        modalPricePerQuintal: 2450,
        minPrice: 2300,
        maxPrice: 2550,
        arrivalDate: '2026-11-18',
      },
      {
        commodity: 'Black Gram (Urad)',
        variety: 'FAQ / VBN-8',
        market: 'Kumbakonam Mandi',
        district,
        modalPricePerQuintal: 8500,
        minPrice: 8100,
        maxPrice: 8900,
        arrivalDate: '2026-11-18',
      },
      {
        commodity: 'Sesame (Gingelly)',
        variety: 'Black / Cleaned',
        market: 'Thanjavur APMC',
        district,
        modalPricePerQuintal: 13000,
        minPrice: 12400,
        maxPrice: 13600,
        arrivalDate: '2026-11-18',
      },
      {
        commodity: 'Turmeric',
        variety: 'Finger / Steam Boiled',
        market: 'Erode Market Committee',
        district: 'Erode',
        modalPricePerQuintal: 16000,
        minPrice: 15200,
        maxPrice: 16800,
        arrivalDate: '2026-11-18',
      },
    ];
  },
};
