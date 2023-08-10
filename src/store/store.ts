import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import loginPageReducer from './loginPageSlice';
import { apiClient } from '../api/apiClient';

const store = configureStore({
  reducer: {
    auth: authReducer,
    loginPage: loginPageReducer,
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
