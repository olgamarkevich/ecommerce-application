import type { Address } from '@commercetools/platform-sdk';

export type UserType = 'anonymous' | 'customer' | null;
export type CustomerId = string | null;

export interface TextInfoState {
  msgText: string;
  isOnView: boolean;
}

export interface AppState {
  isInitialized: boolean;
  isAuthorized: boolean;
  isCustomerLogged: boolean;
  textInfo: TextInfoState | null;
}

export interface AuthState {
  userType: UserType;
  customerId: CustomerId;
  accessToken: string;
  refreshToken: string;
}

export interface Customer {
  id: string;
  version: number | null;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
  billingAddressIds: string[];
  shippingAddressIds: string[];
  email: string;
  password: string;
}

export type CustomerCredentials = Pick<Customer, 'email' | 'password'>;

export interface RegistrationAddress {
  country: 'US' | 'DE' | '';
  firstName: string;
  lastName: string;
  streetName: string;
  postalCode: string;
  city: string;
}

export interface CustomerSignUp {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
  addresses: RegistrationAddress[];
  isBillingTheSame: boolean;
  isShippingDefault: boolean;
  isBillingDefault: boolean;
}
