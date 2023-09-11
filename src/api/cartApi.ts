import { apiClient } from './apiClient';
import type {
  Cart,
  MyCartDraft,
  MyCartUpdateAction,
  ResourceNotFoundError,
} from '@commercetools/platform-sdk';

const cartApi = apiClient.injectEndpoints({
  endpoints: (build) => {
    return {
      getActiveCart: build.query<Cart | ResourceNotFoundError, void>({
        query: () => {
          const method = 'GET';
          const url = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_PROJECT_KEY}/me/active-cart`;

          return { method, url };
        },
      }),
      createCart: build.query<Cart, MyCartDraft>({
        query: (body) => {
          const method = 'POST';
          const url = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_PROJECT_KEY}/me/carts`;

          return { method, url, body };
        },
      }),
      updateCart: build.query<
        Cart,
        { id: string; body: { version: number; actions: MyCartUpdateAction[] } }
      >({
        query: ({ id, body }) => {
          const method = 'POST';
          const url = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_PROJECT_KEY}/me/carts/${id}`;

          return { method, url, body };
        },
      }),
    };
  },
});

export const { useGetActiveCartQuery, useCreateCartQuery, useUpdateCartQuery } =
  cartApi;
