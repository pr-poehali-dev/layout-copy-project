export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: "RUB" | "USD" | "EUR" | "LTC" | "USDT";
  category: string;
  serverLink: string;
  memberCount: number;
  views: number;
  clicks: number;
  favorites: number;
  isFavorite: boolean;
  createdAt: Date;
}

export type SortBy = "newest" | "cheapest" | "expensive";
export type ViewMode = "list" | "gallery";
export type Language = "ru" | "en";
export type TabType = "public" | "my" | "favorites";

export interface FormData {
  title: string;
  description: string;
  price: string;
  currency: string;
  category: string;
  serverLink: string;
}