import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AppState } from '../types/storeTypes';

const initialState: AppState = {
  isInitialized: false,
  isAuthorized: false,
  canRerender: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitializationState: (state, action: PayloadAction<boolean>) => {
      return { ...state, isInitialized: action.payload };
    },
    setAuthorizationState: (state, action: PayloadAction<boolean>) => {
      return { ...state, isInitialized: action.payload };
    },
    setRerenderAbility: (state, action: PayloadAction<boolean>) => {
      return { ...state, canRerender: action.payload };
    },
  },
});

export const {
  setInitializationState,
  setAuthorizationState,
  setRerenderAbility,
} = appSlice.actions;

export default appSlice.reducer;
