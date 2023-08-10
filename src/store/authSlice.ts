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

export const receiveCustomerFromLocalStorage = createAsyncThunk(
  'auth/receiveCustomerFromLocalStorage',
  () => {
    return getCustomerFromLocalStorage();
  },
);

export const setCustomer = createAsyncThunk(
  'auth/setCustomer',
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
    builder.addCase(setCustomer.fulfilled, (state, action) => {
      return { isDataLoaded: true, ...action.payload };
    });
    builder.addCase(logoutCustomer.fulfilled, (state, action) => {
      return { isDataLoaded: true, ...action.payload };
    });
  },
});

export const { setUserAuthorization, removeUserAuthorization } =
  authSlice.actions;

export default authSlice.reducer;
