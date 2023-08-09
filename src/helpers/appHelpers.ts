import type { CustomerId, UserType } from '../types/storeTypes';

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
  const scopeArr = (scopes.split(' ') as string[]).map(
    (str) => str.split(':') as [string, string],
  );

  const anonymousId = scopeArr.find((el) => el[0] === 'anonymous_id');

  if (anonymousId && anonymousId[1])
    return { userType: 'anonymous', customerId: anonymousId[1] };

  const customerId = scopeArr.find((el) => el[0] === 'customer');

  if (customerId && customerId[1]) {
    return { userType: 'customer', customerId: customerId[1] };
  }

  return null;
};
