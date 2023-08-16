import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import authReducer from './authSlice';
import customerReducer from './customerSlice';
import customerSignupReducer from './customerSignupSlice';
import { apiClient } from '../api/apiClient';

const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    customer: customerReducer,
    customerSignup: customerSignupReducer,
    [apiClient.reducerPath]: apiClient.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiClient.middleware);
  },
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export default store;
