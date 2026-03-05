import { create } from 'zustand';

interface StoreState {
  currency: 'USD' | 'INR';
  setCurrency: (currency: 'USD' | 'INR') => void;
  toggleCurrency: () => void;
}

export const useStore = create<StoreState>((set) => ({
  currency: 'USD', // Default, will be overridden by site config if needed
  setCurrency: (currency) => set({ currency }),
  toggleCurrency: () => set((state) => ({ 
    currency: state.currency === 'USD' ? 'INR' : 'USD' 
  })),
}));
