import { setUserAuthorization } from '../store/authSlice';
import {
  getAccessTokenFromLocalStorage,
  getCustomerIdFromScopes,
  saveTokensToLocalStorage,
} from './appHelpers';
import type { getCustomerTokenResponse } from '../types/apiTypes';
import type { RootDispatch } from '../store/store';
import type { GetProductQueryParams } from '../types/apiTypes';
import type { BaseQueryApi } from '@reduxjs/toolkit/dist/query/react';
import type { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';

export const getBaseUrl = (endpoint: string): string | undefined => {
  let baseUrl: string | undefined;

  if (endpoint.endsWith('Token') && process.env.REACT_APP_AUTH_URL) {
    baseUrl = `${process.env.REACT_APP_AUTH_URL}/oauth`;
  } else if (
    process.env.REACT_APP_API_URL &&
    process.env.REACT_APP_PROJECT_KEY !== undefined
  ) {
    baseUrl = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_PROJECT_KEY}`;
  }

  return baseUrl;
};

export const prepareHeaders = (
  headers: Headers,
  {
    endpoint,
  }: Pick<BaseQueryApi, 'getState' | 'extra' | 'endpoint' | 'type' | 'forced'>,
): MaybePromise<Headers | void> => {
  if (endpoint.endsWith('Token')) {
    const authorizationHeaderText = `Basic ${btoa(
      `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`,
    )}==`;
    headers.set('Authorization', authorizationHeaderText);
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
  } else {
    headers.set('Authorization', `Bearer ${getAccessTokenFromLocalStorage()}`);
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
      dispatch(setUserAuthorization(customer));
      saveTokensToLocalStorage({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
    }
  }
};

export const getPathParams = (params: Partial<GetProductQueryParams>): string =>
  Object.entries(params)
    .map((entry) => `${entry[0]}=${entry[1]}`)
    .join('&');
