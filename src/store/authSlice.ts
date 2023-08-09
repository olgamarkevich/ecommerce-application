import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '../types/storeTypes';

const initialState: AuthState = {
  userType: null,
  customerId: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAuthorization: (state, action: PayloadAction<AuthState>) => ({
      ...action.payload,
    }),
    removeUserAuthorization: () => ({ userType: null, customerId: null }),
  },
});

export const { setUserAuthorization, removeUserAuthorization } =
  authSlice.actions;

export default authSlice.reducer;
