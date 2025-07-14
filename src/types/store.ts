export interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: "RUB" | "USDT";
  category: "effects" | "frames" | "badges" | "animations" | "themes";
  preview: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  duration?: number; // в днях, если временное
  isPermanent: boolean;
  isOwned?: boolean;
  cssClass?: string;
  gradient?: string;
  animation?: string;
  icon?: string;
}

export interface StoreCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  items: StoreItem[];
}

export interface UserPurchase {
  itemId: string;
  purchaseDate: Date;
  expiryDate?: Date;
  isActive: boolean;
}