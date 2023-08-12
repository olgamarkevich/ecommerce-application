import type { Customer, CustomerCredentials } from '../types/storeTypes';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: Customer = {
  id: '',
  firstName: '',
  lastName: '',
  middleName: '',
  addresses: [],
  billingAddressIds: [],
  shippingAddressIds: [],
  email: '',
  password: '',
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomerData: (state, action: PayloadAction<Partial<Customer>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setCustomerCredentials: (
      state,
      action: PayloadAction<CustomerCredentials>,
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeCustomer: (state) => {
      return {
        ...state,
        id: '',
        firstName: '',
        lastName: '',
        middleName: '',
        addresses: [],
        billingAddressIds: [],
        shippingAddressIds: [],
      };
    },
    removeCustomerCredentials: (state) => {
      return {
        ...state,
        email: '',
        password: '',
      };
    },
  },
});

export const {
  setCustomerData,
  setCustomerCredentials,
  removeCustomer,
  removeCustomerCredentials,
} = customerSlice.actions;

export default customerSlice.reducer;
