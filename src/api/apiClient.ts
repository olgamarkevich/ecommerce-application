import {
  createApi,
  fetchBaseQuery,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query/react';
import { removeUserAuthorization } from '../store/authSlice';
import { applyResponseEffects, getHeaders } from '../helpers/apiHelpers';
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
  const baseUrl = '/';

  const makeQuery = fetchBaseQuery({
    baseUrl,
  });

  let result = await makeQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = getRefreshTokenFromLocalStorage();
    const method = 'POST';
    const url = `${process.env.REACT_APP_AUTH_URL}/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`;
    const endpoint = 'refreshToken';
    const headers = getHeaders({ type: 'auth' });

    const refreshResult = await makeQuery(
      { url, method, headers },
      { ...api, endpoint },
      extraOptions,
    );
    if (refreshResult.data) {
      // TODO Decide if it should effect here or at another place???
      applyResponseEffects(
        endpoint,
        { ...refreshResult.data, refresh_token: refreshToken },
        dispatch,
      );
      const headers = getHeaders();
      result = await makeQuery(
        { ...(args as FetchArgs), headers },
        api,
        extraOptions,
      );
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
