import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import {
  getCustomerFromLocalStorage,
  saveCustomerToLocalStorage,
} from '../helpers/appHelpers';
import type { AuthState } from '../types/storeTypes';
import type { CustomerId, UserType } from '../types/storeTypes';

export const loadCustomerFromLocalStorage = createAsyncThunk(
  'auth/receiveCustomerFromLocalStorage',
  () => {
    return getCustomerFromLocalStorage();
  },
);

export const setCustomerToken = createAsyncThunk(
  'auth/setCustomerToken',
  (customer: {
    userType: UserType;
    customerId: CustomerId;
    accessToken: string;
    refreshToken: string;
  }) => {
    saveCustomerToLocalStorage(customer);

    return customer;
  },
);

export const logoutCustomer = createAsyncThunk('auth/logoutCustomer', () => {
  const customer = {
    userType: null,
    customerId: null,
    accessToken: '',
    refreshToken: '',
  };

  saveCustomerToLocalStorage(customer);

  return customer;
});

const initialState: AuthState = {
  userType: null,
  customerId: null,
  accessToken: '',
  refreshToken: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAuthorization: (state, action: PayloadAction<AuthState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeUserAuthorization: (state) => {
      return {
        ...state,
        userType: null,
        customerId: null,
        accessToken: '',
        refreshToken: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCustomerFromLocalStorage.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
    builder.addCase(setCustomerToken.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
    builder.addCase(logoutCustomer.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
  },
});

export const { setUserAuthorization, removeUserAuthorization } =
  authSlice.actions;

export default authSlice.reducer;
