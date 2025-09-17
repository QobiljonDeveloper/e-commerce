import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct } from "../../types";

export type ICartProduct = IProduct & {
  quantity: number;
};

interface ICart {
  value: ICartProduct[];
}

const loadFromStorage = (): ICartProduct[] => {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]") || [];
  } catch {
    return [];
  }
};

const saveToStorage = (cart: ICartProduct[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const initialState: ICart = {
  value: loadFromStorage(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existing = state.value.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.value.push({ ...action.payload, quantity: 1 });
      }
      saveToStorage(state.value);
    },

    removeFromCart: (state, action: PayloadAction<ICartProduct>) => {
      state.value = state.value.filter((item) => item.id !== action.payload.id);
      saveToStorage(state.value);
    },

    increaseAmount: (state, action: PayloadAction<ICartProduct>) => {
      const item = state.value.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        saveToStorage(state.value);
      }
    },

    decreaseAmount: (state, action: PayloadAction<ICartProduct>) => {
      const item = state.value.find((i) => i.id === action.payload.id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.value = state.value.filter((i) => i.id !== action.payload.id);
        }
        saveToStorage(state.value);
      }
    },

    setQuantity: (
      state,
      action: PayloadAction<{ product: IProduct; quantity: number }>
    ) => {
      const item = state.value.find((i) => i.id === action.payload.product.id);
      if (item) {
        if (action.payload.quantity > 0) {
          item.quantity = action.payload.quantity;
        } else {
          state.value = state.value.filter(
            (i) => i.id !== action.payload.product.id
          );
        }
        saveToStorage(state.value);
      }
    },

    clearCart: (state) => {
      state.value = [];
      saveToStorage(state.value);
    },
  },
});

export const {
  addToCart,
  clearCart,
  decreaseAmount,
  increaseAmount,
  removeFromCart,
  setQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
