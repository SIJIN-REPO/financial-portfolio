export type AssetType = 'stock' | 'bond' | 'crypto' | 'mutual-fund' | 'etf';

export interface Investment {
  id: string;
  assetType: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string; // ISO string
}