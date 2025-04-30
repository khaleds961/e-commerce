import { create } from "zustand";

interface AddToCartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
}


export const useAddToCart = create<AddToCartState>((set) => ({
    items: [],
    addItem: (item: CartItem) => set((state) => ({ items: [...state.items, item] })),
}));



