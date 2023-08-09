import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { getCustomerFromLocalStorage } from '../helpers/appHelpers';
import type { AuthState } from '../types/storeTypes';

export const receiveCustomerFromLocalStorage = createAsyncThunk(
  'auth/receiveCustomerFromLocalStorage',
  () => getCustomerFromLocalStorage(),
);

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
  extraReducers: (builder) => {
    builder.addCase(
      receiveCustomerFromLocalStorage.fulfilled,
      (state, action) => ({ ...action.payload }),
    );
  },
});

export const { setUserAuthorization, removeUserAuthorization } =
  authSlice.actions;

export default authSlice.reducer;
