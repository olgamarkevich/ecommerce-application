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
  isDataLoaded: false,
  userType: null,
  customerId: null,
  accessToken: '',
  refreshToken: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAuthorization: (
      state,
      action: PayloadAction<Omit<AuthState, 'isDataLoaded'>>,
    ) => ({
      ...state,
      ...action.payload,
    }),
    removeUserAuthorization: () => ({
      isDataLoaded: false,
      userType: null,
      customerId: null,
      accessToken: '',
      refreshToken: '',
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(
      receiveCustomerFromLocalStorage.fulfilled,
      (state, action) => ({ isDataLoaded: true, ...action.payload }),
    );
  },
});

export const { setUserAuthorization, removeUserAuthorization } =
  authSlice.actions;

export default authSlice.reducer;
