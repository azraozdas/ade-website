export type Category = 'FACE' | 'LIPS' | 'EYES';

export interface Product {
  id: string;
  name: string;
  category: Category;
  priceCents: number;
  image: string;
  short: string;
  shades: string[];
}

export interface CartItem {
  id: string;
  name: string;
  priceCents: number;
  qty: number;
  shade?: string;
  image?: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface OrderSummary {
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
}

export interface CreateOrderPayload {
  email: string;
  fullName: string;
  phone: string;
  addressCountry: string;
  addressCity: string;
  postalCode: string;
  addressLine: string;
  items: CartItem[];
}

export interface CreateOrderResponse {
  orderNumber: string;
  summary: OrderSummary;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

