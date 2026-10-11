import { create } from 'zustand';
import type { Credentials } from '../types';
import { loadFromStorage, removeFromStorage, saveToStorage } from '../lib/storage';

const STORAGE_KEY = 'credentials';

type AuthStore = {
  credentials: Credentials | null;
  login: (credentials: Credentials) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  credentials: loadFromStorage<Credentials | null>(STORAGE_KEY, null),

  login: (credentials) => {
    saveToStorage(STORAGE_KEY, credentials);
    set({ credentials });
  },

  logout: () => {
    removeFromStorage(STORAGE_KEY);
    set({ credentials: null });
  },
}));
