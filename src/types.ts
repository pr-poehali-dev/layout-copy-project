export type Language = "ru" | "en";

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  memberCount: number;
  views: number;
  clicks: number;
  favorites: number;
  isFavorite: boolean;
  serverLink: string;
  createdAt: string;
}