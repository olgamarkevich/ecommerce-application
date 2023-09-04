import { apiClient } from './apiClient';
import type { ProductProjectionPagedQueryResponse } from '../types/apiTypes';

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
export const { useGetProductsQuery, useSearchProductsQuery } = productApi;
