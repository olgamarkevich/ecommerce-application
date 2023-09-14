import reducer, {
  setUserAuthorization,
  removeUserAuthorization,
  loadCustomerFromLocalStorage,
  setCustomerToken,
  logoutCustomer,
} from '../store/authSlice';
import type { AuthState } from '../types/storeTypes';

const user: AuthState = {
  userType: 'customer',
  customerId: 'some-id',
  accessToken: 'some-secret-access-token',
  refreshToken: 'some-very-secret-refresh-token',
};

const nullUser: AuthState = {
  userType: null,
  customerId: null,
  accessToken: '',
  refreshToken: '',
};

describe('authReducer should work correctly', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      userType: null,
      customerId: null,
      accessToken: '',
      refreshToken: '',
    });
  });

  test('should set new User', () => {
    const previousState: AuthState = {
      userType: null,
      customerId: null,
      accessToken: '',
      refreshToken: '',
    };

    const newUser: AuthState = {
      userType: 'anonymous',
      customerId: 'someinterestingstringwithcustomerid',
      accessToken: 'token',
      refreshToken: 'refresh token',
    };

    expect(reducer(previousState, setUserAuthorization(newUser))).toEqual({
      userType: 'anonymous',
      customerId: 'someinterestingstringwithcustomerid',
      accessToken: 'token',
      refreshToken: 'refresh token',
    });
  });

  test('should change User', () => {
    const previousState: AuthState = {
      userType: 'customer',
      customerId: 'somenotinterestingcustomerid',
      accessToken: 'token',
      refreshToken: 'refresh token',
    };

    const newUser: AuthState = {
      userType: 'anonymous',
      customerId: 'someinterestingstringwithcustomerid',
      accessToken: 'new token',
      refreshToken: 'new refresh token',
    };

    expect(reducer(previousState, setUserAuthorization(newUser))).toEqual({
      userType: 'anonymous',
      customerId: 'someinterestingstringwithcustomerid',
      accessToken: 'new token',
      refreshToken: 'new refresh token',
    });
  });

  test('should remove User data with removeUserAuthorization', () => {
    const previousState: AuthState = {
      userType: 'customer',
      customerId: 'somenotinterestingcustomerid',
      accessToken: 'token',
      refreshToken: 'refresh token',
    };

    expect(reducer(previousState, removeUserAuthorization())).toEqual({
      userType: null,
      customerId: null,
      accessToken: '',
      refreshToken: '',
    });
  });
});

describe('Thunk loadCustomerFromLocalStorage should work correctly', () => {
  test('should get null user when LocalStorage is empty', async () => {
    const dispatch = jest.fn();
    const thunk = loadCustomerFromLocalStorage();

    await thunk(
      dispatch,
      () => {
        return undefined;
      },
      undefined,
    );

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [pending, fulfilled] = calls;
    expect(pending[0].type).toBe(loadCustomerFromLocalStorage.pending('').type);
    expect(fulfilled[0].type).toBe(
      loadCustomerFromLocalStorage.fulfilled(user, '').type,
    );
    expect(fulfilled[0].payload).toEqual(nullUser);
  });

  test('should get user when it saved in LocalStorage', async () => {
    localStorage.setItem('rss-eca_customer', JSON.stringify(user));

    const dispatch = jest.fn();
    const thunk = loadCustomerFromLocalStorage();

    await thunk(
      dispatch,
      () => {
        return undefined;
      },
      undefined,
    );

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [pending, fulfilled] = calls;
    expect(pending[0].type).toBe(loadCustomerFromLocalStorage.pending('').type);
    expect(fulfilled[0].type).toBe(
      loadCustomerFromLocalStorage.fulfilled(user, '').type,
    );
    expect(fulfilled[0].payload).toEqual(user);
  });
});

describe('Thunk setCustomerToken should work correctly', () => {
  test('should save customer to LocalStorage', async () => {
    const dispatch = jest.fn();
    const thunk = setCustomerToken(user);

    await thunk(
      dispatch,
      () => {
        return undefined;
      },
      undefined,
    );

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [pending, fulfilled] = calls;
    expect(pending[0].type).toBe(setCustomerToken.pending('', user).type);
    expect(fulfilled[0].type).toBe(
      setCustomerToken.fulfilled(user, '', user).type,
    );

    const savedUser = JSON.parse(
      localStorage.getItem('rss-eca_customer') as string,
    );
    expect(savedUser).toEqual(user);
  });

  test('should save nullUser to LocalStorage', async () => {
    const dispatch = jest.fn();
    const thunk = setCustomerToken(nullUser);

    await thunk(
      dispatch,
      () => {
        return undefined;
      },
      undefined,
    );

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [pending, fulfilled] = calls;
    expect(pending[0].type).toBe(setCustomerToken.pending('', user).type);
    expect(fulfilled[0].type).toBe(
      setCustomerToken.fulfilled(user, '', user).type,
    );

    const savedUser = JSON.parse(
      localStorage.getItem('rss-eca_customer') as string,
    );
    expect(savedUser).toEqual(nullUser);
  });
});

describe('Thunk logoutCustomer should save nullUser to LocalStorage', () => {
  test('logoutCustomer should work correctly', async () => {
    const dispatch = jest.fn();
    const thunk = logoutCustomer();

    await thunk(
      dispatch,
      () => {
        return undefined;
      },
      undefined,
    );

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [pending, fulfilled] = calls;
    expect(pending[0].type).toBe(logoutCustomer.pending('').type);
    expect(fulfilled[0].type).toBe(
      logoutCustomer.fulfilled(
        {
          userType: null,
          customerId: null,
          accessToken: '',
          refreshToken: '',
        },
        '',
      ).type,
    );

    const savedUser = JSON.parse(
      localStorage.getItem('rss-eca_customer') as string,
    );
    expect(savedUser).toEqual(nullUser);
  });
});

describe('ExtraReducer loadCustomerFromLocalStorage.fulfilled should work correctly', () => {
  test('with user', () => {
    const state = reducer(
      { ...nullUser },
      loadCustomerFromLocalStorage.fulfilled({ ...user }, ''),
    );

    expect(state).toEqual(user);
  });

  test('with null user', () => {
    const state = reducer(
      { ...user },
      loadCustomerFromLocalStorage.fulfilled({ ...nullUser }, ''),
    );

    expect(state).toEqual(nullUser);
  });
});

describe('ExtraReducer setCustomerToken.fulfilled should work correctly', () => {
  test('with user', () => {
    const state = reducer(
      { ...nullUser },
      setCustomerToken.fulfilled({ ...user }, '', { ...user }),
    );

    expect(state).toEqual(user);
  });

  test('with null user', () => {
    const state = reducer(
      { ...user },
      setCustomerToken.fulfilled({ ...nullUser }, '', { ...nullUser }),
    );

    expect(state).toEqual(nullUser);
  });
});

describe('ExtraReducer logoutCustomer.fulfilled should work correctly', () => {
  test('with null user', () => {
    const state = reducer(
      { ...user },
      logoutCustomer.fulfilled(
        {
          userType: null,
          customerId: null,
          accessToken: '',
          refreshToken: '',
        },
        '',
      ),
    );

    expect(state).toEqual(nullUser);
  });
});
