import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AddToCartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (itemToRemove: CartItem) => void;
    clearCart: () => void;
}

export const useAddToCart = create<AddToCartState>()(
    persist(
        (set) => ({
            items: [],
            addItem: (item: CartItem) =>
                set((state) => {
                    // Check if item already exists (same id, size, color)
                    const existingItemIndex = state.items.findIndex(
                        existingItem =>
                            existingItem.id === item.id &&
                            existingItem.size === item.size &&
                            existingItem.color === item.color
                    );

                    // If item exists and it comes from the adjusted page
                    if (existingItemIndex !== -1 && item.adjusted) {
                        const updatedItems = [...state.items];
                        updatedItems[existingItemIndex].quantity = item.quantity; // Set the quantity directly
                        return { items: updatedItems };
                    }


                    // If item exists, update quantity
                    if (existingItemIndex !== -1) {
                        const updatedItems = [...state.items];
                        updatedItems[existingItemIndex].quantity += item.quantity;
                        return { items: updatedItems };
                    }

                    // Otherwise add new item
                    return { items: [...state.items, item] };
                }),
            removeItem: (itemToRemove: CartItem) =>
                set((state) => {
                    return {
                        items: state.items.filter(
                            item =>
                                !(item.id === itemToRemove.id &&
                                    item.size === itemToRemove.size &&
                                    item.color === itemToRemove.color)
                        ),
                    };
                }),
            clearCart: () => set({ items: [] }),
        }),
        {
            name: "shopping-cart", // unique name for localStorage
            storage: createJSONStorage(() => localStorage),
        }
    )
);



