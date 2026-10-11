import { create } from 'zustand';
import type { Credentials } from '../types';
import { loadFromStorage, removeFromStorage, saveToStorage } from '../lib/storage';
import { useChatStore } from './useChatStore';

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

  // Logging out always clears the conversations too, wherever it is called from
  logout: () => {
    useChatStore.getState().reset();
    removeFromStorage(STORAGE_KEY);
    set({ credentials: null });
  },
}));
