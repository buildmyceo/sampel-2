export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  rentalYield: number;
  appreciation: number;
  beds: number;
  baths: number;
  sqft: number;
  type: 'Apartment' | 'House' | 'Villa' | 'Condo';
  isTrending?: boolean;
}

export interface MarketInsight {
  location: string;
  growthRate: number;
  demandScore: number; // 0-100
  summary: string;
}

export interface User {
  name: string;
  savedProperties: string[]; // IDs
}
