import { apiClient } from './apiClient';
import type { ProductProjectionPagedQueryResponse } from '../types/apiTypes';
import type { ProductProjection } from '@commercetools/platform-sdk';

const productApi = apiClient.injectEndpoints({
  endpoints: (build) => {
    return {
      getProducts: build.query<ProductProjectionPagedQueryResponse, string>({
        query: (params) => {
          const method = 'GET';
          const url = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_PROJECT_KEY}/product-projections?${params}`;

          return { url, method };
        },
      }),
      getProductById: build.query<ProductProjection, string>({
        query: (id) => {
          const method = 'GET';
          const url = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_PROJECT_KEY}/product-projections/${id}`;

          return { url, method };
        },
      }),
      searchProducts: build.query<ProductProjectionPagedQueryResponse, string>({
        query: (params) => {
          const method = 'GET';
          const url = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_PROJECT_KEY}/product-projections/search?${params}`;

          return { url, method };
        },
      }),
    };
  },
});

// Built-in hooks to make request
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
} = productApi;
