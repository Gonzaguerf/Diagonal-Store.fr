"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import { EMPTY_CART, type Cart, type CartLine, type CartLineMerchandise } from "./types";

const STORAGE_KEY = "diagonal:cart";
const FREE_SHIPPING_THRESHOLD = 80;
const FLAT_SHIPPING = 6.9;

type CartAction =
  | { type: "HYDRATE"; cart: Cart }
  | { type: "ADD"; merchandise: CartLineMerchandise; quantity: number }
  | { type: "REMOVE"; lineId: string }
  | { type: "SET_QUANTITY"; lineId: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "TOGGLE" };

type CartState = Cart & { isOpen: boolean };
const INITIAL_STATE: CartState = { ...EMPTY_CART, isOpen: false };

function recompute(lines: CartLine[]) {
  const subtotal = lines.reduce((acc, line) => acc + parseFloat(line.merchandise.price.amount) * line.quantity, 0);
  const totalQuantity = lines.reduce((acc, line) => acc + line.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : FLAT_SHIPPING;
  const currencyCode = lines[0]?.merchandise.price.currencyCode ?? "EUR";
  return {
    totalQuantity,
    subtotal: { amount: subtotal.toFixed(2), currencyCode },
    shipping: { amount: shipping.toFixed(2), currencyCode },
    total: { amount: (subtotal + shipping).toFixed(2), currencyCode },
  };
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...action.cart, isOpen: state.isOpen };
    case "ADD": {
      const existing = state.lines.find((l) => l.merchandise.id === action.merchandise.id);
      const lines = existing
        ? state.lines.map((l) => (l.merchandise.id === action.merchandise.id ? { ...l, quantity: l.quantity + action.quantity } : l))
        : [...state.lines, { id: action.merchandise.id, quantity: action.quantity, merchandise: action.merchandise } satisfies CartLine];
      return { ...state, lines, ...recompute(lines), isOpen: true };
    }
    case "REMOVE": {
      const lines = state.lines.filter((l) => l.id !== action.lineId);
      return { ...state, lines, ...recompute(lines) };
    }
    case "SET_QUANTITY": {
      if (action.quantity <= 0) {
        const lines = state.lines.filter((l) => l.id !== action.lineId);
        return { ...state, lines, ...recompute(lines) };
      }
      const lines = state.lines.map((l) => (l.id === action.lineId ? { ...l, quantity: action.quantity } : l));
      return { ...state, lines, ...recompute(lines) };
    }
    case "CLEAR":
      return { ...INITIAL_STATE, isOpen: state.isOpen };
    case "OPEN":
      return { ...state, isOpen: true };
    case "CLOSE":
      return { ...state, isOpen: false };
    case "TOGGLE":
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

interface CartContextValue {
  cart: Cart;
  isOpen: boolean;
  addItem: (merchandise: CartLineMerchandise, quantity?: number) => void;
  removeItem: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  freeShippingThreshold: number;
  freeShippingProgress: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Cart;
      if (parsed?.lines && Array.isArray(parsed.lines)) dispatch({ type: "HYDRATE", cart: parsed });
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const { isOpen: _omit, ...cart } = state;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [state]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (state.isOpen) document.body.classList.add("no-scroll");
    else document.body.classList.remove("no-scroll");
  }, [state.isOpen]);

  const addItem = useCallback((merchandise: CartLineMerchandise, quantity = 1) => dispatch({ type: "ADD", merchandise, quantity }), []);
  const removeItem = useCallback((lineId: string) => dispatch({ type: "REMOVE", lineId }), []);
  const setQuantity = useCallback((lineId: string, quantity: number) => dispatch({ type: "SET_QUANTITY", lineId, quantity }), []);
  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const open = useCallback(() => dispatch({ type: "OPEN" }), []);
  const close = useCallback(() => dispatch({ type: "CLOSE" }), []);
  const toggle = useCallback(() => dispatch({ type: "TOGGLE" }), []);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = parseFloat(state.subtotal.amount);
    return {
      cart: {
        id: state.id,
        checkoutUrl: state.checkoutUrl,
        lines: state.lines,
        totalQuantity: state.totalQuantity,
        subtotal: state.subtotal,
        total: state.total,
        shipping: state.shipping,
      },
      isOpen: state.isOpen,
      addItem, removeItem, setQuantity, clear, open, close, toggle,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      freeShippingProgress: Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD),
    };
  }, [state, addItem, removeItem, setQuantity, clear, open, close, toggle]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
