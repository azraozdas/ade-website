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
    // Calculate the total quantity of all items in the cart
    // This sums up the quantity of each item
    totalQty: (state): number => {
      let totalQuantity = 0;
      for (const item of state.items) {
        totalQuantity = totalQuantity + item.qty;
      }
      return totalQuantity;
    },

    // Calculate the subtotal (total price of all items before shipping)
    // This multiplies each item's price by its quantity and sums everything up
    subtotalCents: (state): number => {
      let subtotal = 0;
      for (const item of state.items) {
        const itemTotal = item.priceCents * item.qty;
        subtotal = subtotal + itemTotal;
      }
      return subtotal;
    },

    // Calculate shipping cost based on the subtotal
    // Free shipping if subtotal is €50 or more, otherwise €4.90
    shippingCents(): number {
      if (this.subtotalCents >= FREE_SHIPPING_THRESHOLD) {
        return 0; // Free shipping
      } else {
        return STANDARD_SHIPPING; // Standard shipping: €4.90
      }
    },

    // Calculate the final total (subtotal + shipping)
    totalCents(): number {
      return this.subtotalCents + this.shippingCents;
    },

    // Check if the cart is empty (has no items)
    isEmpty: (state): boolean => {
      return state.items.length === 0;
    },
  },

  actions: {
    // Add an item to the cart
    // If the same item (same ID and shade) already exists, increase its quantity
    // Otherwise, add it as a new item
    add(item: Omit<CartItem, 'qty'> & { qty?: number }) {
      // Find the index of an existing item with the same ID and shade
      // For products with shades, we treat each shade as a separate item
      const existingIndex = this.items.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.shade === item.shade,
      );

      // If item already exists in cart, increase its quantity
      if (existingIndex !== -1) {
        const quantityToAdd = item.qty || 1;
        this.items[existingIndex].qty += quantityToAdd;
      } else {
        // If item doesn't exist, add it as a new item with quantity 1 (or specified quantity)
        this.items.push({
          ...item,
          qty: item.qty || 1,
        });
      }

      // Save the updated cart to localStorage
      this.persist();
    },

    // Remove an item from the cart
    // If shade is provided, only remove that specific shade
    // Otherwise, remove all items with that product ID
    remove(id: string, shade?: string) {
      // Filter out the item(s) to remove
      this.items = this.items.filter((cartItem) => {
        // If a shade is specified, only remove items matching both ID and shade
        if (shade) {
          const shouldRemove = cartItem.id === id && cartItem.shade === shade;
          return !shouldRemove; // Keep items that don't match
        }
        // If no shade specified, remove all items with this product ID
        return cartItem.id !== id; // Keep items with different IDs
      });

      // Save the updated cart to localStorage
      this.persist();
    },

    // Update the quantity of a specific item in the cart
    // If quantity is 0 or less, the item is removed instead
    setQty(id: string, shade: string | undefined, qty: number) {
      // Find the item to update (matching both ID and shade)
      const itemToUpdate = this.items.find((cartItem) => cartItem.id === id && cartItem.shade === shade);
      
      if (itemToUpdate) {
        // If quantity is 0 or negative, remove the item
        if (qty <= 0) {
          this.remove(id, shade);
        } else {
          // Otherwise, update the quantity
          itemToUpdate.qty = qty;
          // Save the updated cart to localStorage
          this.persist();
        }
      }
    },

    // Clear all items from the cart
    clear() {
      this.items = [];
      // Save the empty cart to localStorage
      this.persist();
    },

    // Save the current cart state to localStorage
    // This allows the cart to persist across page refreshes
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    },

    // Restore the cart from localStorage when the app loads
    // This allows the cart to persist across page refreshes
    restore() {
      try {
        // Get the stored cart data from localStorage
        const storedCartData = localStorage.getItem(STORAGE_KEY);
        if (storedCartData) {
          // Parse the JSON string back into an array of items
          this.items = JSON.parse(storedCartData);
        }
      } catch (error) {
        // If something goes wrong (corrupted data, etc.), reset the cart to empty
        console.error('Failed to restore cart from localStorage:', error);
        this.items = [];
      }
    },
  },
});

