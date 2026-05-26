export interface Category {
  id: string;          // e.g. 'furniture', 'accessories'
  name: string;        // e.g. 'Premium Mobilyalar'
  slug: string;        // e.g. 'premium-mobilyalar'
  description: string;
  image: string;       // High-resolution category image
  isActive: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;               // e.g. 'Doğal Meşe / Antrasit Minder'
  sku: string;
  price?: number;             // If differs from base price
  stock: number;
  attributes: Record<string, string>; // e.g. { color: "Oak", size: "M" }
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;         // Short description
  detailedDescription: string; // Markdown/RichText for premium presentation
  price: number;
  compareAtPrice?: number;    // Original price if discounted
  categoryId: string;
  images: string[];           // Product gallery (at least 3-4 images)
  variants: ProductVariant[];
  attributes: Record<string, string>; // e.g. { "Boyut": "60x40x50 cm", "Malzeme": "Masif Meşe" }
  stock: number;
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;        // Whether to feature on homepage
  createdAt: string;
}

export interface Address {
  id: string;
  title: string;              // e.g. 'Ev', 'Ofis'
  fullName: string;
  addressLine: string;
  city: string;
  district: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  addresses: Address[];
  favorites: string[];        // Array of product IDs
  createdAt: string;
}

export type OrderStatus = 'pending_payment' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variantName?: string;
}

export interface Order {
  id: string;
  userId?: string;            // Optional for guest checkout
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  subtotal: number;
  shippingFee: number;
  total: number;
  status: OrderStatus;
  paymentInfo: {
    provider: 'iyzico' | 'mock';
    transactionId: string;
    status: string;
  };
  createdAt: string;
}
