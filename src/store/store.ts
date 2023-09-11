import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import appReducer from './appSlice';
import authReducer from './authSlice';
import customerReducer from './customerSlice';
import catalogReducer from './catalogSlice';
import cartReducer from './cartSlice';
import customerSignUpReducer from './customerSignUpSlice';
import { apiClient } from '../api/apiClient';

enableMapSet();

const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    customer: customerReducer,
    catalog: catalogReducer,
    cart: cartReducer,
    customerSignUp: customerSignUpReducer,
    [apiClient.reducerPath]: apiClient.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['app.loadingSet'],
      },
    }).concat(apiClient.middleware);
  },
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export default store;
