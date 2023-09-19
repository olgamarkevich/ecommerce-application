import React, { type PropsWithChildren, type ReactElement } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import type { AppStore, RootState } from '../store/store';
import appReducer from '../store/appSlice';
import authReducer from '../store/authSlice';
import cartReducer from '../store/cartSlice';
import catalogReducer from '../store/catalogSlice';
import customerReducer from '../store/customerSlice';
import customerSignUpReducer from '../store/customerSignUpSlice';
import { apiClient } from '../api/apiClient';
import { enableMapSet } from 'immer';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<PreloadedState<RootState>>;
  store?: AppStore;
}

enableMapSet();

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        app: appReducer,
        auth: authReducer,
        cart: cartReducer,
        catalog: catalogReducer,
        customer: customerReducer,
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
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<object>): ReactElement {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
