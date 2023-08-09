import { setUserAuthorization } from '../store/authSlice';
import {
  getAccessTokenFromLocalStorage,
  getCustomerIdFromScopes,
  saveTokensToLocalStorage,
} from './appHelpers';
import type {
  getCustomerTokenResponse,
  GetHeadersParams,
} from '../types/apiTypes';
import type { RootDispatch } from '../store/store';
import type { GetProductQueryParams } from '../types/apiTypes';

export const getHeaders = (
  { type }: GetHeadersParams = { type: 'default' },
): Headers => {
  if (type === 'auth') {
    return new Headers({
      Authorization: `Basic ${btoa(
        `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`,
      )}==`,
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  }

  return new Headers({
    Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
  });
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
