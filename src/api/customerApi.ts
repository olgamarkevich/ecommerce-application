import { apiClient } from './apiClient';
import type {
  CustomerSignin,
  CustomerSignInResult,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';

const customerApi = apiClient.injectEndpoints({
  endpoints: (build) => {
    return {
      loginCustomer: build.query<CustomerSignInResult, CustomerSignin>({
        query: (body) => {
          const method = 'POST';
          const url = encodeURI(
            `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_PROJECT_KEY}/login`,
          );

          return { method, url, body };
        },
      }),
    };
  },
});

export const { useLoginCustomerQuery } = customerApi;
