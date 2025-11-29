/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

import { apiRequest } from "@/services/apiClient";
import { getUserProfile } from "@/services/Auth/auth.api";
import { ICartItem } from "@/types";



interface CartContextType {
  cart: ICartItem[];
  addToCart: (item: ICartItem) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [cart, setCart] = useState<ICartItem[]>([]);

  // Load user
  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      try {
        const res = await getUserProfile();
        if (active) setUser(res || null);
      } catch {
        if (active) setUser(null);
      }
    };

    loadUser();
    return () => {
      active = false;
    };
  }, []);

  // Load cart
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        const res = await apiRequest<ICartItem[]>(`/cart/my-cart`);
        setCart(res.data || []);
      } else {
        const saved = localStorage.getItem("cart");
        if (saved) setCart(JSON.parse(saved));
      }
    };

    loadCart();
  }, [user]);

  // Save guest cart
  const saveLocalCart = useCallback(
    (updated: ICartItem[] | ((prev: ICartItem[]) => ICartItem[])) => {
      setCart((prev) => {
        const next = typeof updated === "function" ? updated(prev) : updated;
        if (!user) localStorage.setItem("cart", JSON.stringify(next));
        return next;
      });
    },
    [user]
  );

  // Add
  const addToCart = useCallback(
    async (item: ICartItem) => {
      if (user) {
        await apiRequest(`/cart/add`, {
          method: "POST",
          body: JSON.stringify({
            bookId: item.book._id,
            quantity: item.quantity,
          }),
        });

        setCart((prev) => {
          const exists = prev.find((i) => i.book._id === item.book._id);
          if (exists) {
            return prev.map((i) =>
              i.book._id === item.book._id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            );
          }
          return [...prev, item];
        });
      } else {
        saveLocalCart((prev) => {
          const exists = prev.find((i) => i.book._id === item.book._id);
          if (exists) {
            return prev.map((i) =>
              i.book._id === item.book._id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            );
          }
          return [...prev, item];
        });
      }
    },
    [user, saveLocalCart]
  );

  // Remove
  const removeFromCart = useCallback(
    async (id: string) => {
      if (user) {
        await apiRequest(`/cart/remove/${id}`, { method: "DELETE" });
        setCart((prev) => prev.filter((i) => i._id !== id));
      } else {
        saveLocalCart((prev) => prev.filter((i) => i.book._id !== id));
      }
    },
    [user, saveLocalCart]
  );

  // Update quantity
  const updateQuantity = useCallback(
    async (id: string, quantity: number) => {
      if (user) {
        await apiRequest(`/cart/update/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ quantity }),
        });

        setCart((prev) =>
          prev.map((i) => (i._id === id ? { ...i, quantity } : i))
        );
      } else {
        saveLocalCart((prev) =>
          prev.map((i) => (i.book._id === id ? { ...i, quantity } : i))
        );
      }
    },
    [user, saveLocalCart]
  );

  // Clear cart
  const clearCart = useCallback(async () => {
    if (user) {
      await apiRequest(`/cart/clear`, { method: "DELETE" });
      setCart([]);
    } else {
      saveLocalCart([]);
    }
  }, [user, saveLocalCart]);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [cart, addToCart, removeFromCart, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
