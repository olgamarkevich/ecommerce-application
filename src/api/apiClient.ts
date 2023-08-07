import {
  createApi,
  fetchBaseQuery,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query/react';
import { removeUserAuthorization } from '../store/authSlice';
import {
  applyResponseEffects,
  getBaseUrl,
  prepareHeaders,
} from '../helpers/apiHelpers';
import {
  getRefreshTokenFromLocalStorage,
  saveTokensToLocalStorage,
} from '../helpers/appHelpers';
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes';

const baseQueryFn: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const { endpoint, dispatch } = api;
  const baseUrl = getBaseUrl(endpoint);
  // TODO Change error handling - return Error No BaseUrl
  if (!baseUrl) console.error('Can`t get api URLs from environment variables');

  const makeQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  });

  let result = await makeQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = getRefreshTokenFromLocalStorage();
    const method = 'POST';
    const url = `/token?grant_type=refresh_token&refresh_token=${refreshToken}`;
    const refreshEndpointName = 'refreshToken';
    const refreshBaseUrl = getBaseUrl(refreshEndpointName) as string;
    const makeRefreshQuery = fetchBaseQuery({
      baseUrl: refreshBaseUrl,
      prepareHeaders,
    });

    const refreshResult = await makeRefreshQuery(
      { url, method },
      { ...api, endpoint: refreshEndpointName },
      extraOptions,
    );
    if (refreshResult.data) {
      // TODO Decide if it should effect here or at another place???
      applyResponseEffects(
        refreshEndpointName,
        { ...refreshResult.data, refresh_token: refreshToken },
        dispatch,
      );
      result = await makeQuery(args, api, extraOptions);
    } else {
      dispatch(removeUserAuthorization());
      // TODO Decide if this needed?
      saveTokensToLocalStorage({
        accessToken: '',
        refreshToken: '',
      });
      // TODO Change error handling - return Error Authorization
      console.error('Can`t get correct authorization token');
    }
  }
  // TODO Decide if it should effect here or at another place???
  if (!result.error && result.data) {
    applyResponseEffects(endpoint, result.data, dispatch);
  }

  return result;
};

export const apiClient = createApi({
  reducerPath: 'apiClient',
  baseQuery: baseQueryFn,
  endpoints: () => ({}),
});
