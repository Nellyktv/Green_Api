import { create } from 'zustand';
import type { Locale, ThemeMode } from '../types';
import { loadFromStorage, saveToStorage } from '../lib/storage';

const LOCALE_KEY = 'locale';
const THEME_KEY = 'themeMode';

type AppStore = {
  locale: Locale;
  themeMode: ThemeMode;
  setLocale: (locale: Locale) => void;
  toggleThemeMode: () => void;
};

const savedLocale = loadFromStorage<Locale>(LOCALE_KEY, 'ru');
document.documentElement.lang = savedLocale;

// Until the user picks a theme, follow the system one. matchMedia is missing in some environments (jsdom)
const systemMode: ThemeMode = window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const useAppStore = create<AppStore>((set) => ({
  locale: savedLocale,
  themeMode: loadFromStorage<ThemeMode>(THEME_KEY, systemMode),

  setLocale: (locale) => {
    saveToStorage(LOCALE_KEY, locale);
    document.documentElement.lang = locale;
    set({ locale });
  },

  toggleThemeMode: () =>
    set((state) => {
      const themeMode = state.themeMode === 'dark' ? 'light' : 'dark';
      saveToStorage(THEME_KEY, themeMode);
      return { themeMode };
    }),
}));
