import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { getCustomerFromLocalStorage } from '../helpers/appHelpers';
import type { AuthState } from '../types/storeTypes';

export const receiveCustomerFromLocalStorage = createAsyncThunk(
  'auth/receiveCustomerFromLocalStorage',
  () => {
    return getCustomerFromLocalStorage();
  },
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
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeUserAuthorization: () => {
      return {
        isDataLoaded: false,
        userType: null,
        customerId: null,
        accessToken: '',
        refreshToken: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      receiveCustomerFromLocalStorage.fulfilled,
      (state, action) => {
        return { isDataLoaded: true, ...action.payload };
      },
    );
  },
});

export const { setUserAuthorization, removeUserAuthorization } =
  authSlice.actions;

export default authSlice.reducer;
