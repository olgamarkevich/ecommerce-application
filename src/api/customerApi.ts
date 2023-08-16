import { apiClient } from './apiClient';
import type {
  Customer,
  MyCustomerSignin,
  CustomerSignInResult,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import type {
  MyCustomerDraft,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';

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
      signInCustomer: build.query<CustomerSignInResult, MyCustomerSignin>({
        query: (body) => {
          const method = 'POST';
          const url = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_PROJECT_KEY}/me/login`;

          return { method, url, body };
        },
      }),
      signUpCustomer: build.query<CustomerSignInResult, MyCustomerDraft>({
        query: (body) => {
          const method = 'POST';
          const url = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_PROJECT_KEY}/me/signup`;

          return { method, url, body };
        },
      }),
      updateCustomer: build.query<
        Customer,
        { version: number; actions: MyCustomerUpdateAction[] }
      >({
        query: (body) => {
          const method = 'POST';
          const url = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_PROJECT_KEY}/me`;

          return { method, url, body };
        },
      }),
    };
  },
});

export const {
  useGetCustomerQuery,
  useSignInCustomerQuery,
  useSignUpCustomerQuery,
  useUpdateCustomerQuery,
} = customerApi;
