export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  registrationDate: string;
  discordProfile?: string;
}

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: string;
  isSystem?: boolean;
}

export interface Chat {
  id: string;
  user: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  listing: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  owner: string;
  category: string;
}