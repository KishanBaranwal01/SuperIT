// types/index.ts

export interface Plan {
  id: string;
  name: string;
  speed: string;
  price: number;
  category: 'home' | 'enterprise' | 'ott';
  features: string[];
  isPopular?: boolean;
}

export interface Lead {
  id?: string;
  fullName: string;
  phone: string;
  pincode: string;
  address?: string;
  planName?: string;
  status?: 'Pending' | 'Contacted' | 'Installed' | 'Cancelled';
  createdAt?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}