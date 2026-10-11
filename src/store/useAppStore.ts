import { create } from 'zustand';
import type { Locale } from '../types';
import { loadFromStorage, saveToStorage } from '../lib/storage';

const STORAGE_KEY = 'locale';

type AppStore = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const savedLocale = loadFromStorage<Locale>(STORAGE_KEY, 'ru');
document.documentElement.lang = savedLocale;

export const useAppStore = create<AppStore>((set) => ({
  locale: savedLocale,

  setLocale: (locale) => {
    saveToStorage(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
    set({ locale });
  },
}));
