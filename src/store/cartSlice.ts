import type { Cart, CartState } from '../types/storeTypes';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MyCartUpdateAction } from '@commercetools/platform-sdk';

const initialState: CartState = {
  cartId: undefined,
  version: undefined,
  products: [],
  updateActions: [],
  totalProductsQuantity: undefined,
  totalPrice: undefined,
  discountCodes: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setNullCart: (state) => {
      return { ...state, cartId: null };
    },
    setCart: (state, action: PayloadAction<Cart>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    addUpdateActions: (state, action: PayloadAction<MyCartUpdateAction[]>) => {
      return { ...state, updateActions: action.payload };
    },
    clearUpdateActions: (state) => {
      return { ...state, updateActions: [] };
    },
  },
});

export const { setNullCart, setCart, addUpdateActions, clearUpdateActions } =
  cartSlice.actions;

export default cartSlice.reducer;
