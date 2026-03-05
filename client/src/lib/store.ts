import { create } from 'zustand';
import { Product } from '@shared/schema';

export interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  currency: 'USD' | 'INR';
  cart: CartItem[];
  exchangeRate: number;
  setCurrency: (currency: 'USD' | 'INR') => void;
  toggleCurrency: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  fetchExchangeRate: () => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  currency: 'USD',
  cart: [],
  exchangeRate: 83.0,
  setCurrency: (currency) => set({ currency }),
  toggleCurrency: () => set((state) => ({
    currency: state.currency === 'USD' ? 'INR' : 'USD'
  })),
  addToCart: (product) => set((state) => {
    const existing = state.cart.find(item => item.id === product.id);
    if (existing) {
      return {
        cart: state.cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== productId)
  })),
  updateQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map(item =>
      item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
    ).filter(item => item.quantity > 0)
  })),
  clearCart: () => set({ cart: [] }),
  getTotal: () => {
    const { cart, currency, exchangeRate } = get();
    return cart.reduce((total, item) => {
      const price = currency === 'USD' ? item.priceUSD : (item.priceUSD * exchangeRate);
      return total + (price * item.quantity);
    }, 0);
  },
  fetchExchangeRate: async () => {
    try {
      const res = await fetch('https://api.frankfurter.app/latest?from=USD&to=INR');
      const data = await res.json();
      if (data.rates && data.rates.INR) {
        set({ exchangeRate: data.rates.INR });
      }
    } catch (e) {
      console.error("Exchange rate fetch failed", e);
    }
  },
}));
