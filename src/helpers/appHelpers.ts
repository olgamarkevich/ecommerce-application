import type { AuthState, CustomerId, UserType } from '../types/storeTypes';

export const saveTokensToLocalStorage = ({
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
  localStorage.setItem('rss-eca_userType', userType !== null ? userType : '');
  localStorage.setItem(
    'rss-eca_customerId',
    customerId !== null ? customerId : '',
  );
  localStorage.setItem('rss-eca_accessToken', accessToken);
  localStorage.setItem('rss-eca_refreshToken', refreshToken);
};

export const getCustomerFromLocalStorage = (): {
  userType: UserType;
  customerId: CustomerId;
} => {
  let userType = localStorage.getItem('rss-eca_userType') as
    | UserType
    | ''
    | null;
  if (userType === '') userType = null;

  let customerId = localStorage.getItem('rss-eca_customerId');
  if (customerId !== null && !customerId.length) customerId = null;

  return { userType, customerId };
};

export const getAccessTokenFromLocalStorage = (): string => {
  const token = localStorage.getItem('rss-eca_accessToken');

  return token ? token : '';
};

export const getRefreshTokenFromLocalStorage = (): string => {
  const token = localStorage.getItem('rss-eca_refreshToken');

  return token ? token : '';
};

export const getCustomerIdFromScopes = (scopes: string): AuthState | null => {
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
