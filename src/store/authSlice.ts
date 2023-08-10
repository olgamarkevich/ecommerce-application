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
    setUserAuthorization: (state, action: PayloadAction<AuthState>) => {
      return {
        ...action.payload,
      };
    },
    removeUserAuthorization: () => {
      return { userType: null, customerId: null };
    },
  },
});

export const { setUserAuthorization, removeUserAuthorization } =
  authSlice.actions;

export default authSlice.reducer;
