import { defineStore } from 'pinia';
import type { CartItem } from '@/types';

const STORAGE_KEY = 'ade:cart';
const FREE_SHIPPING_THRESHOLD = 5000; // €50 in cents
const STANDARD_SHIPPING = 490; // €4.90 in cents

interface CartState {
  items: CartItem[];
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
  }),

  getters: {
    totalQty: (state): number => {
      return state.items.reduce((sum, item) => sum + item.qty, 0);
    },

    subtotalCents: (state): number => {
      return state.items.reduce((sum, item) => sum + item.priceCents * item.qty, 0);
    },

    shippingCents(): number {
      return this.subtotalCents >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
    },

    totalCents(): number {
      return this.subtotalCents + this.shippingCents;
    },

    isEmpty: (state): boolean => {
      return state.items.length === 0;
    },
  },

  actions: {
    add(item: Omit<CartItem, 'qty'> & { qty?: number }) {
      const existingIndex = this.items.findIndex(
        (i) => i.id === item.id && i.shade === item.shade,
      );

      if (existingIndex !== -1) {
        this.items[existingIndex].qty += item.qty || 1;
      } else {
        this.items.push({
          ...item,
          qty: item.qty || 1,
        });
      }

      this.persist();
    },

    remove(id: string, shade?: string) {
      this.items = this.items.filter((item) => {
        if (shade) {
          return !(item.id === id && item.shade === shade);
        }
        return item.id !== id;
      });

      this.persist();
    },

    setQty(id: string, shade: string | undefined, qty: number) {
      const item = this.items.find((i) => i.id === id && i.shade === shade);
      if (item) {
        if (qty <= 0) {
          this.remove(id, shade);
        } else {
          item.qty = qty;
          this.persist();
        }
      }
    },

    clear() {
      this.items = [];
      this.persist();
    },

    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    },

    restore() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          this.items = JSON.parse(stored);
        }
      } catch (error) {
        console.error('Failed to restore cart from localStorage:', error);
        this.items = [];
      }
    },
  },
});

