import { create } from 'zustand';

type ConnectionStore = {
  online: boolean;
  setOnline: (online: boolean) => void;
};

export const useConnectionStore = create<ConnectionStore>((set) => ({
  online: true,

  setOnline: (online) => set({ online }),
}));
