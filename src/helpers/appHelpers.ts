import type { AuthState } from '../types/storeTypes';

export const saveTokensToLocalStorage = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}): void => {
  localStorage.setItem('rss-eca_accessToken', accessToken);
  localStorage.setItem('rss-eca_refreshToken', refreshToken);
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
  const scopeArr = (scopes.split(' ') as string[]).map((str) => {
    return str.split(':') as [string, string];
  });

  const anonymousId = scopeArr.find((el) => {
    return el[0] === 'anonymous_id';
  });

  if (anonymousId && anonymousId[1])
    return { userType: 'anonymous', customerId: anonymousId[1] };

  const customerId = scopeArr.find((el) => {
    return el[0] === 'customer';
  });

  if (customerId && customerId[1]) {
    return { userType: 'customer', customerId: customerId[1] };
  }

  return null;
};
