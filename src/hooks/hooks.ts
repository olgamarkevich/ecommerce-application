import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import type { RootState, RootDispatch } from '../store/store';
import type { getCustomerTokenResponse } from '../types/apiTypes';
import {
  getCustomerFromLocalStorage,
  getCustomerIdFromScopes,
  saveCustomerToLocalStorage,
} from '../helpers/appHelpers';
import { setUserAuthorization } from '../store/authSlice';
import { setCustomerData } from '../store/customerSlice';
import type { CustomerSignInResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';

export const useAppDispatch = () => {
  return useDispatch<RootDispatch>();
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSavedToken = (
  isDataLoaded: boolean,
): { isApplied: boolean } => {
  const dispatch = useAppDispatch();

  if (!isDataLoaded) {
    const savedCustomer = getCustomerFromLocalStorage();
    dispatch(setUserAuthorization(savedCustomer));

    return { isApplied: true };
  }

  return { isApplied: false };
};

export const useCustomerAuthorization = (
  data: getCustomerTokenResponse | undefined,
): { isApplied: boolean } => {
  const dispatch = useAppDispatch();

  if (
    data &&
    typeof data === 'object' &&
    'access_token' in data &&
    'refresh_token' in data &&
    'scope' in data
  ) {
    const customer = getCustomerIdFromScopes(data.scope);

    if (customer) {
      const customerData = {
        ...customer,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      };

      saveCustomerToLocalStorage(customerData);
      dispatch(setUserAuthorization(customerData));

      return { isApplied: true };
    }
  }

  return { isApplied: false };
};

export const useCustomerData = (
  data: CustomerSignInResult | undefined,
): { isApplied: boolean } => {
  const dispatch = useAppDispatch();

  if (data && data.customer && data.customer.id) {
    const {
      id,
      firstName = '',
      lastName = '',
      middleName = '',
      addresses = [],
      billingAddressIds = [],
      shippingAddressIds = [],
    } = data.customer;
    dispatch(
      setCustomerData({
        id,
        firstName,
        lastName,
        middleName,
        addresses,
        billingAddressIds,
        shippingAddressIds,
      }),
    );

    return { isApplied: true };
  }

  return { isApplied: false };
};
