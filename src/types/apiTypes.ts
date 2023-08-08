import type { ProductProjection } from '@commercetools/platform-sdk';

export interface getAccessTokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: 'Bearer';
}

export interface getCustomerTokenResponse extends getAccessTokenResponse {
  refresh_token: string;
}

export interface CustomerCredentials {
  email: string;
  password: string;
}

interface IntrospectTokenFailureResponse {
  active: boolean;
}

interface IntrospectTokenSuccessResponse
  extends IntrospectTokenFailureResponse {
  scope: string;
  exp: number;
  client_id: string;
}

export type IntrospectTokenResponse =
  | IntrospectTokenSuccessResponse
  | IntrospectTokenFailureResponse;

export type GetHeadersParams = {
  type: 'auth' | 'default';
};

export interface GetProductQueryParams {
  limit: number;
  offset: number;
}

export interface ProductProjectionPagedQueryResponse {
  readonly limit: number;
  readonly count: number;
  readonly total?: number;
  readonly offset: number;
  readonly results: ProductProjection[];
}
