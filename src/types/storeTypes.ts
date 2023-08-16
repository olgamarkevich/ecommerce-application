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
  addresses: Address[];
  billingAddressIds: string[];
  shippingAddressIds: string[];
  email: string;
  password: string;
}

export type CustomerCredentials = Pick<Customer, 'email' | 'password'>;

export interface RegistrationAddress {
  country: 'US' | 'DE';
  firstName: string;
  lastName: string;
  streetName: string;
  postalCode: string;
  city: string;
}

export interface CustomerSignup {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  addresses: RegistrationAddress[];
  defaultShippingAddress: number | null;
  defaultBillingAddress: number | null;
  isBillingTheSame: boolean;
  isShippingDefault: boolean;
  isBillingDefault: boolean;
}
