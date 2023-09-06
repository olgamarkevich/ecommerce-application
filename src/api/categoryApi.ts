import { apiClient } from './apiClient';
import type { CategoryPagedQueryResponse } from '@commercetools/platform-sdk';

const categoryApi = apiClient.injectEndpoints({
  endpoints: (build) => {
    return {
      getCategories: build.query<CategoryPagedQueryResponse, string>({
        query: (params) => {
          const method = 'GET';
          const url = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_PROJECT_KEY}/categories?${params}`;

          return { url, method };
        },
      }),
    };
  },
});

// Built-in hooks to make request
export const { useGetCategoriesQuery } = categoryApi;
