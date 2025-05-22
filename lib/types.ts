
export interface Product {
  id: string;
  name: string;
  store: string;
  location: string;
  price: number;
  description: string;
  imageUrl?: string; // Optional now, as we are using icons
  category: string; // e.g., "Brake System", "Engine Parts"
  reviews: number; // Average star rating
  storeAddress: string;
}

export interface Service {
  id: string;
  name: string;
  store: string;
  location: string;
  price: number;
  description: string;
  imageUrl?: string; // Optional now
  category: string; // e.g., "Maintenance", "Repair"
  reviews: number; // Average star rating
  storeAddress: string;
}

export interface Store {
  id: string;
  name: string;
  location: string;
  type: string; // e.g., "Parts Retailer", "Service Center"
  address: string;
  imageUrl?: string; // Optional now
  rating: number;
}

export interface Order {
  orderId: string;
  itemId: string;
  itemType: 'product' | 'service';
  itemName: string;
  itemPrice: number;
  timestamp: number;
  buyerId: string; // Mock buyer ID
  qrCodeValue: string; // String to be encoded in QR
  confirmationCode: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: keyof typeof import('lucide-react'); // To ensure we use valid Lucide icon names
}
