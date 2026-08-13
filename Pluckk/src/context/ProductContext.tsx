"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { products, type Product } from "@/data/products";

interface ProductContextType {
  currentIndex: number;
  product: Product;
  setCurrentIndex: (index: number) => void;
  nextProduct: () => void;
  prevProduct: () => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [currentIndex, setCurrentIndexState] = useState(0);
  const product = products[currentIndex] ?? products[0];

  const setCurrentIndex = useCallback((index: number) => {
    const validIndex =
      ((Math.floor(index) % products.length) + products.length) % products.length;
    setCurrentIndexState(validIndex);
  }, []);

  const nextProduct = useCallback(() => {
    setCurrentIndexState((prev) => (prev + 1) % products.length);
  }, []);

  const prevProduct = useCallback(() => {
    setCurrentIndexState(
      (prev) => (prev - 1 + products.length) % products.length
    );
  }, []);

  return (
    <ProductContext.Provider
      value={{ currentIndex, product, setCurrentIndex, nextProduct, prevProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProduct must be used within ProductProvider");
  return ctx;
}
