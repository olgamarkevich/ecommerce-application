import reducer, {
  setUserAuthorization,
  removeUserAuthorization,
} from '../store/authSlice';
import type { AuthState } from '../types/storeTypes';

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

  const newUser: Omit<AuthState, 'isDataLoaded'> = {
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

  const newUser: Omit<AuthState, 'isDataLoaded'> = {
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

// TODO add test for async thunk with mock functions
