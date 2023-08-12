import type { CustomerId, UserType, AuthState } from '../types/storeTypes';
import type { getCustomerTokenResponse } from '../types/apiTypes';

export const saveCustomerToLocalStorage = ({
  userType,
  customerId,
  accessToken,
  refreshToken,
}: {
  userType: UserType;
  customerId: CustomerId;
  accessToken: string;
  refreshToken: string;
}): void => {
  localStorage.setItem(
    'rss-eca_customer',
    JSON.stringify({ userType, customerId, accessToken, refreshToken }),
  );
};

export const getCustomerFromLocalStorage = (): {
  userType: UserType;
  customerId: CustomerId;
  accessToken: string;
  refreshToken: string;
} => {
  const customerString = localStorage.getItem('rss-eca_customer');
  if (customerString) return JSON.parse(customerString);

  return {
    userType: null,
    customerId: null,
    accessToken: '',
    refreshToken: '',
  };
};

export const getCustomerIdFromScopes = (
  scopes: string,
): { userType: UserType; customerId: CustomerId } | null => {
  const scopeArr = (scopes.split(' ') as string[]).map((str) => {
    return str.split(':') as [string, string];
  });

  const anonymousId = scopeArr.find((el) => {
    return el[0] === 'anonymous_id';
  });

  if (anonymousId && anonymousId[1])
    return { userType: 'anonymous', customerId: anonymousId[1] };

  const customerId = scopeArr.find((el) => {
    return el[0] === 'customer_id';
  });

  if (customerId && customerId[1]) {
    return { userType: 'customer', customerId: customerId[1] };
  }

  return null;
};

export const getCustomerFromApiResponse = (
  responseData: getCustomerTokenResponse,
): AuthState => {
  const customerData = getCustomerIdFromScopes(responseData.scope);

  if (customerData) {
    return {
      ...customerData,
      accessToken: responseData.access_token,
      refreshToken: responseData.refresh_token,
    };
  }

  return {
    userType: null,
    customerId: null,
    accessToken: '',
    refreshToken: '',
  };
};
