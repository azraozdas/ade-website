import { defineStore } from 'pinia';
import type { Toast } from '@/types';

interface UIState {
  toasts: Toast[];
  searchOpen: boolean;
  modalOpen: boolean;
  modalContent: string | null;
}

let toastIdCounter = 0;

export const useUIStore = defineStore('ui', {
  state: (): UIState => ({
    toasts: [],
    searchOpen: false,
    modalOpen: false,
    modalContent: null,
  }),

  actions: {
    showToast(message: string, type: Toast['type'] = 'success') {
      const id = `toast-${++toastIdCounter}`;
      const toast: Toast = { id, message, type };

      this.toasts.push(toast);

      // Auto-dismiss after 2.5 seconds
      setTimeout(() => {
        this.dismissToast(id);
      }, 2500);
    },

    dismissToast(id: string) {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    },

    openSearch() {
      this.searchOpen = true;
    },

    closeSearch() {
      this.searchOpen = false;
    },

    openModal(content: string) {
      this.modalContent = content;
      this.modalOpen = true;
    },

    closeModal() {
      this.modalOpen = false;
      this.modalContent = null;
    },
  },
});

