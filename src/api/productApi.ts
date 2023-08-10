import { apiClient } from './apiClient';
import { getPathParams } from '../helpers/apiHelpers';
import type {
  GetProductQueryParams,
  ProductProjectionPagedQueryResponse,
} from '../types/apiTypes';

const productApi = apiClient.injectEndpoints({
  endpoints: (build) => {
    return {
      getProducts: build.query<
        ProductProjectionPagedQueryResponse,
        Partial<GetProductQueryParams>
      >({
        query: (params = {}) => {
          const method = 'GET';
          const pathParams = Object.keys(params).length
            ? getPathParams(params)
            : '';
          const url = `${process.env.REACT_APP_API_URL}/${
            process.env.REACT_APP_PROJECT_KEY
          }/product-projections${pathParams.length ? '?' : ''}${pathParams}`;

          return { url, method };
        },
      }),
    };
  },
});

// Built-in hooks to make request
export const { useGetProductsQuery } = productApi;
