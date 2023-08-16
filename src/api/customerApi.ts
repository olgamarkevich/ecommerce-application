import { apiClient } from './apiClient';
import type {
  Customer,
  CustomerSignin,
  CustomerSignInResult,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';

const customerApi = apiClient.injectEndpoints({
  endpoints: (build) => {
    return {
      getCustomer: build.query<Customer, void>({
        query: () => {
          const method = 'GET';
          const url = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_PROJECT_KEY}/me`;

          return { method, url };
        },
      }),
      signInCustomer: build.query<CustomerSignInResult, CustomerSignin>({
        query: (body) => {
          const method = 'POST';
          const url = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_PROJECT_KEY}/me/login`;

          return { method, url, body };
        },
      }),
    };
  },
});

export const { useGetCustomerQuery, useSignInCustomerQuery } = customerApi;
