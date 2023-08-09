export type UserType = 'anonymous' | 'customer' | null;
export type CustomerId = string | null;

export interface AuthState {
  userType: UserType;
  customerId: CustomerId;
}
