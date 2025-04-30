'use client';
import { useAddToCart } from '../store/addToCart';

export function AddToCartProvider({ children }: { children: React.ReactNode }) {
  const addItem = useAddToCart((state) => state.addItem);

  return children;
}