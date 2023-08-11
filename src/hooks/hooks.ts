import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import type { RootState, RootDispatch } from '../store/store';
import { useGetCustomerTokenQuery } from '../api/authApi';
import type { getCustomerTokenResponse } from '../types/apiTypes';
import {
  getCustomerIdFromScopes,
  saveCustomerToLocalStorage,
} from '../helpers/appHelpers';
import { setUserAuthorization } from '../store/authSlice';

export const useAppDispatch = () => {
  return useDispatch<RootDispatch>();
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

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

      dispatch(setUserAuthorization(customerData));
      saveCustomerToLocalStorage(customerData);

      return { isApplied: true };
    }
  }

  return { isApplied: false };
};

export const useCustomerLogin = useGetCustomerTokenQuery;
