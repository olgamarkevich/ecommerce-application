import { apiClient } from './apiClient';
import type {
  getAccessTokenResponse,
  getCustomerTokenResponse,
  IntrospectTokenResponse,
  CustomerCredentials,
} from '../types/apiTypes';
import type { RootState } from '../store/store';

const authApi = apiClient.injectEndpoints({
  endpoints: (build) => ({
    getAnonymousToken: build.query<getCustomerTokenResponse, void>({
      query: () => {
        const method = 'POST';
        const url = `${process.env.REACT_APP_AUTH_URL}/oauth/${process.env.REACT_APP_PROJECT_KEY}/anonymous/token?grant_type=client_credentials&scope=${process.env.REACT_APP_SCOPES}`;

        return { url, method };
      },
    }),
    getCustomerToken: build.query<
      getCustomerTokenResponse,
      CustomerCredentials
    >({
      query: ({ email, password }) => {
        const method = 'POST';
        const url = `${process.env.REACT_APP_AUTH_URL}/oauth/${process.env.REACT_APP_PROJECT_KEY}/customers/token?grant_type=password&username=${email}&password=${password}&scope=${process.env.REACT_APP_SCOPES}`;

        return { url, method };
      },
    }),
    getAccessToken: build.query<getAccessTokenResponse, void>({
      query: () => {
        const method = 'POST';
        const url = `${process.env.REACT_APP_AUTH_URL}/oauth/token?grant_type=client_credentials&scope=${process.env.REACT_APP_SCOPES}`;

        return { url, method };
      },
    }),
    introspectToken: build.query<IntrospectTokenResponse, string>({
      query: (token) => {
        const method = 'POST';
        const url = `${process.env.REACT_APP_AUTH_URL}/oauth/introspect?token=${token}`;

        return { url, method };
      },
    }),
    refreshToken: build.query<getAccessTokenResponse, string>({
      query: (refreshToken) => {
        const method = 'POST';
        const url = `${process.env.REACT_APP_AUTH_URL}/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`;

        return { url, method };
      },
    }),
  }),
});

// Built-in hooks to make request
export const {
  useGetAnonymousTokenQuery,
  useGetCustomerTokenQuery,
  useGetAccessTokenQuery,
  useRefreshTokenQuery,
  useIntrospectTokenQuery,
} = authApi;

// Custom hooks to get data from cache
export const useDataFromGetAnonymousToken = (state: RootState) =>
  authApi.endpoints.getAnonymousToken.select()(state).data;
export const useDataFromGetCustomerToken = (
  state: RootState,
  { email, password }: CustomerCredentials,
) => authApi.endpoints.getCustomerToken.select({ email, password })(state).data;
