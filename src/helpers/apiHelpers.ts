import { setUserAuthorization } from '../store/authSlice';
import {
  getCustomerIdFromScopes,
  saveCustomerToLocalStorage,
} from './appHelpers';
import type { getCustomerTokenResponse } from '../types/apiTypes';
import type { RootDispatch, RootState } from '../store/store';
import type { GetProductQueryParams } from '../types/apiTypes';
import type { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import type { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';

export const prepareHeaders = (
  headers: Headers,
  {
    getState,
    endpoint,
  }: Pick<BaseQueryApi, 'getState' | 'extra' | 'endpoint' | 'type' | 'forced'>,
): MaybePromise<Headers | void> => {
  if (endpoint.endsWith('Token')) {
    headers.set(
      'Authorization',
      `Basic ${btoa(
        `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`,
      )}==`,
    );
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
  } else {
    headers.set(
      'Authorization',
      `Bearer ${(getState() as RootState).auth.accessToken}`,
    );
  }

  return headers;
};

export const applyResponseEffects = (
  endpoint: string,
  data: getCustomerTokenResponse | unknown,
  dispatch: RootDispatch,
): void => {
  if (
    endpoint.endsWith('Token') &&
    data &&
    typeof data === 'object' &&
    'access_token' in data &&
    typeof data.access_token === 'string' &&
    'refresh_token' in data &&
    typeof data.refresh_token === 'string' &&
    'scope' in data &&
    typeof data.scope === 'string'
  ) {
    const customer = getCustomerIdFromScopes(data.scope);
    if (customer) {
      const customerData = {
        ...customer,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      };

      dispatch(setUserAuthorization(customerData));
      saveCustomerToLocalStorage(customerData);
    }
  }
};

export const getPathParams = (
  params: Partial<GetProductQueryParams>,
): string => {
  return Object.entries(params)
    .map((entry) => {
      return `${entry[0]}=${entry[1]}`;
    })
    .join('&');
};
