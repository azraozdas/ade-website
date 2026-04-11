import { defineStore } from 'pinia';

type Language = 'en' | 'de';

interface LanguageState {
  currentLanguage: Language;
}

const STORAGE_KEY = 'ade:language';

export const useLanguageStore = defineStore('language', {
  state: (): LanguageState => ({
    currentLanguage: (localStorage.getItem(STORAGE_KEY) as Language) || 'en',
  }),

  getters: {
    isEnglish: (state): boolean => state.currentLanguage === 'en',
    isGerman: (state): boolean => state.currentLanguage === 'de',
  },

  actions: {
    setLanguage(lang: Language) {
      this.currentLanguage = lang;
      localStorage.setItem(STORAGE_KEY, lang);
    },

    toggleLanguage() {
      const newLang = this.currentLanguage === 'en' ? 'de' : 'en';
      this.setLanguage(newLang);
    },
  },
});

