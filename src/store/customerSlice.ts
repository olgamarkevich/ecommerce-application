import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Customer, CustomerCredentials } from '../types/storeTypes';

const initialState: Customer = {
  id: '',
  firstName: '',
  lastName: '',
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
        addresses: [],
        billingAddressIds: [],
        shippingAddressIds: [],
        email: '',
        password: '',
      };
    },
  },
});

export const { setCustomerData, setCustomerCredentials, removeCustomer } =
  customerSlice.actions;

export default customerSlice.reducer;
