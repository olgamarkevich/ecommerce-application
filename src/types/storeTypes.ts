import type { Address, MyCartUpdateAction } from '@commercetools/platform-sdk';
import type { LineItem } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/cart';

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
  loadingSet: Set<string>;
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

export interface IProductItem {
  id: number;
  name: string;
  brand: string;
  images: string[];
  category: string;
  description: string;
  shortDescription: string;
  price: number;
  oldPrice: number;
}

export interface CategoryTreeSource {
  id: string;
  name: string;
  description: string;
  slug: string;
  parentId: string | null;
  level: number;
  isActive: boolean;
  isOpen: boolean;
  hasChildren: boolean;
}

export interface Cart {
  cartId: string | null | undefined;
  version: number | undefined;
  products: LineItem[];
  totalProductsQuantity: number | undefined;
  totalPrice: number | undefined;
  discountCodes: string[];
}

export interface CartState extends Cart {
  updateActions: MyCartUpdateAction[];
}
