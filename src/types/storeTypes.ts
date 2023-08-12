import type { Address } from '@commercetools/platform-sdk';

export type UserType = 'anonymous' | 'customer' | null;
export type CustomerId = string | null;

export interface AppState {
  isInitialized: boolean;
  isAuthorized: boolean;
  canRerender: boolean;
}

export interface AuthState {
  userType: UserType;
  customerId: CustomerId;
  accessToken: string;
  refreshToken: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  addresses: Address[];
  billingAddressIds: string[];
  shippingAddressIds: string[];
  email: string;
  password: string;
}

export type CustomerCredentials = Pick<Customer, 'email' | 'password'>;
