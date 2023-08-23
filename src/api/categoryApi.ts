import { apiClient } from './apiClient';
import { getPathParams } from '../helpers/apiHelpers';
import type { CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import type { GetProductQueryParams } from '../types/apiTypes';

const categoryApi = apiClient.injectEndpoints({
  endpoints: (build) => {
    return {
      getCategories: build.query<
        CategoryPagedQueryResponse,
        Partial<GetProductQueryParams>
      >({
        query: (params = {}) => {
          const method = 'GET';
          const pathParams = Object.keys(params).length
            ? getPathParams(params)
            : '';
          const url = `${process.env.REACT_APP_API_URL}/${
            process.env.REACT_APP_PROJECT_KEY
          }/categories${pathParams.length ? '?' : ''}${pathParams}`;

          return { url, method };
        },
      }),
    };
  },
});

// Built-in hooks to make request
export const { useGetCategoriesQuery } = categoryApi;
