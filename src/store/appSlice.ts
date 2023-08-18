import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AppState } from '../types/storeTypes';

const initialState: AppState = {
  isInitialized: false,
  isAuthorized: false,
  isCustomerLogged: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitializationState: (state, action: PayloadAction<boolean>) => {
      return { ...state, isInitialized: action.payload };
    },
    setAuthorizationState: (state, action: PayloadAction<boolean>) => {
      return { ...state, isAuthorized: action.payload };
    },
    setCustomerLoggedState: (state, action: PayloadAction<boolean>) => {
      return { ...state, isCustomerLogged: action.payload };
    },
  },
});

export const {
  setInitializationState,
  setAuthorizationState,
  setCustomerLoggedState,
} = appSlice.actions;

export default appSlice.reducer;
