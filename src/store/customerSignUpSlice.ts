import type { CustomerSignUp } from '../types/storeTypes';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: CustomerSignUp = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: null,
  addresses: [],
  isBillingTheSame: false,
  isShippingDefault: false,
  isBillingDefault: false,
};

export const customerSignUpSlice = createSlice({
  name: 'customerSignup',
  initialState,
  reducers: {
    setCustomerSignUpData: (state, action: PayloadAction<CustomerSignUp>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearCustomerSignUpData: (state) => {
      return {
        ...state,
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        addresses: [],
        isBillingTheSame: false,
        isShippingDefault: false,
        isBillingDefault: false,
      };
    },
  },
});

export const { setCustomerSignUpData, clearCustomerSignUpData } =
  customerSignUpSlice.actions;

export default customerSignUpSlice.reducer;
