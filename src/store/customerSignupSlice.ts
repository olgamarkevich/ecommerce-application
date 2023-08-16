import type { CustomerSignup } from '../types/storeTypes';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: CustomerSignup = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: null,
  addresses: [],
  defaultShippingAddress: null,
  defaultBillingAddress: null,
  isBillingTheSame: false,
  isShippingDefault: false,
  isBillingDefault: false,
};

export const customerSignupSlice = createSlice({
  name: 'customerSignup',
  initialState,
  reducers: {
    setCustomerSignupData: (state, action: PayloadAction<CustomerSignup>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearCustomerSignupData: (state) => {
      return {
        ...state,
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        addresses: [],
        defaultShippingAddress: null,
        defaultBillingAddress: null,
        isBillingTheSame: false,
        isShippingDefault: false,
        isBillingDefault: false,
      };
    },
  },
});

export const { setCustomerSignupData, clearCustomerSignupData } =
  customerSignupSlice.actions;

export default customerSignupSlice.reducer;
