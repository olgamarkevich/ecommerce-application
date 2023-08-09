import {
  createApi,
  fetchBaseQuery,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query/react';
import { removeUserAuthorization } from '../store/authSlice';
import { applyResponseEffects, prepareHeaders } from '../helpers/apiHelpers';
import { saveCustomerToLocalStorage } from '../helpers/appHelpers';
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes';
import type { RootState } from '../store/store';

const baseQueryFn: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const { endpoint, dispatch } = api;
  const baseUrl = '/';

  const makeQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  });

  let result = await makeQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;
    const method = 'POST';
    const url = `${process.env.REACT_APP_AUTH_URL}/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`;
    const endpoint = 'refreshToken';

    const refreshResult = await makeQuery(
      { url, method },
      { ...api, endpoint },
      extraOptions,
    );
    if (
      refreshResult.data &&
      typeof refreshResult.data === 'object' &&
      'access_token' in refreshResult.data
    ) {
      // TODO Decide if it should effect here or at another place???
      applyResponseEffects(
        endpoint,
        { ...refreshResult.data, refresh_token: refreshToken },
        dispatch,
      );
      result = await makeQuery(args, api, extraOptions);
    } else {
      dispatch(removeUserAuthorization());
      // TODO Decide if this needed?
      saveCustomerToLocalStorage({
        userType: null,
        customerId: null,
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
