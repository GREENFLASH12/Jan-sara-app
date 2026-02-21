"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import type { CartItem } from "@/types/cart"

interface CartContextValue {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "menge">) => void
  removeItem: (produktId: string) => void
  updateMenge: (produktId: string, menge: number) => void
  clearCart: () => void
  totalItems: number
  totalPreis: number
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = "dulaan-cart"

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage after mount
  useEffect(() => {
    setItems(loadCart())
    setHydrated(true)
  }, [])

  // Persist on change (skip initial hydration)
  useEffect(() => {
    if (hydrated) {
      saveCart(items)
    }
  }, [items, hydrated])

  const addItem = useCallback((newItem: Omit<CartItem, "menge">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.produktId === newItem.produktId)
      if (existing) {
        return prev.map((i) =>
          i.produktId === newItem.produktId
            ? { ...i, menge: i.menge + 1 }
            : i
        )
      }
      return [...prev, { ...newItem, menge: 1 }]
    })
  }, [])

  const removeItem = useCallback((produktId: string) => {
    setItems((prev) => prev.filter((i) => i.produktId !== produktId))
  }, [])

  const updateMenge = useCallback((produktId: string, menge: number) => {
    if (menge < 1) return
    setItems((prev) =>
      prev.map((i) => (i.produktId === produktId ? { ...i, menge } : i))
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.menge, 0),
    [items]
  )

  const totalPreis = useMemo(
    () => items.reduce((sum, i) => sum + i.preis * i.menge, 0),
    [items]
  )

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      updateMenge,
      clearCart,
      totalItems,
      totalPreis,
    }),
    [items, addItem, removeItem, updateMenge, clearCart, totalItems, totalPreis]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
