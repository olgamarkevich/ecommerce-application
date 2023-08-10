import type { CustomerCredentials } from '../types/storeTypes';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: CustomerCredentials = {
  email: '',
  password: '',
};

export const loginPageSlice = createSlice({
  name: 'loginPage',
  initialState,
  reducers: {
    setCustomerCredentials: (
      state,
      action: PayloadAction<CustomerCredentials>,
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeCustomerCredentials: () => {
      return {
        email: '',
        password: '',
      };
    },
  },
});

export const { setCustomerCredentials, removeCustomerCredentials } =
  loginPageSlice.actions;

export default loginPageSlice.reducer;
