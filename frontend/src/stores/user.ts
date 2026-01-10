import { defineStore } from 'pinia';
import type { User } from '@/types';
import { api } from '@/lib/api';

const STORAGE_KEY = 'ade:user';

interface UserState {
  user: User | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
  }),

  getters: {
    isLoggedIn: (state): boolean => {
      return state.user !== null;
    },

    fullName: (state): string => {
      return state.user ? `${state.user.firstName} ${state.user.lastName}` : '';
    },

    firstName: (state): string => {
      return state.user?.firstName || '';
    },
  },

  actions: {
    async register(data: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      agreeToPrivacy: boolean;
    }): Promise<void> {
      const user = await api.register(data);
      this.user = user;
      this.persist();
    },

    async login(data: { email: string; password: string }): Promise<void> {
      const user = await api.login(data);
      this.user = user;
      this.persist();
    },

    logout() {
      this.user = null;
      localStorage.removeItem(STORAGE_KEY);
    },

    persist() {
      if (this.user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.user));
      }
    },

    restore() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          this.user = JSON.parse(stored);
        }
      } catch (error) {
        console.error('Failed to restore user from localStorage:', error);
        this.user = null;
      }
    },
  },
});

