export type UserType = 'anonymous' | 'customer' | null;
export type CustomerId = string | null;

export interface AuthState {
  isDataLoaded: boolean;
  userType: UserType;
  customerId: CustomerId;
  accessToken: string;
  refreshToken: string;
}

export interface CustomerCredentials {
  email: string;
  password: string;
}
