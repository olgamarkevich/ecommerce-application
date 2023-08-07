import { apiClient } from './apiClient';
import { getPathParams } from '../helpers/apiHelpers';
import type {
  GetProductQueryParams,
  ProductProjectionPagedQueryResponse,
} from '../types/apiTypes';

const productApi = apiClient.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<
      ProductProjectionPagedQueryResponse,
      Partial<GetProductQueryParams>
    >({
      query: (params = {}) => {
        const method = 'GET';
        const pathParams = Object.keys(params).length
          ? getPathParams(params)
          : '';
        const url = `/product-projections${
          pathParams.length ? '?' : ''
        }${pathParams}`;

        return { url, method };
      },
    }),
  }),
});

// Built-in hooks to make request
export const { useGetProductsQuery } = productApi;
