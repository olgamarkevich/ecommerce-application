import reducer, {
  setUserAuthorization,
  removeUserAuthorization,
} from '../store/authSlice';
import type { AuthState } from '../types/storeTypes';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    userType: null,
    customerId: null,
  });
});

test('should set new User', () => {
  const previousState: AuthState = {
    userType: null,
    customerId: null,
  };

  const newUser: AuthState = {
    userType: 'anonymous',
    customerId: 'someinterestingstringwithcustomerid',
  };

  expect(reducer(previousState, setUserAuthorization(newUser))).toEqual({
    userType: 'anonymous',
    customerId: 'someinterestingstringwithcustomerid',
  });
});

test('should change User', () => {
  const previousState: AuthState = {
    userType: 'customer',
    customerId: 'somenotinterestingcustomerid',
  };

  const newUser: AuthState = {
    userType: 'anonymous',
    customerId: 'someinterestingstringwithcustomerid',
  };

  expect(reducer(previousState, setUserAuthorization(newUser))).toEqual({
    userType: 'anonymous',
    customerId: 'someinterestingstringwithcustomerid',
  });
});

test('should remove User data with removeUserAuthorization', () => {
  const previousState: AuthState = {
    userType: 'customer',
    customerId: 'somenotinterestingcustomerid',
  };

  expect(reducer(previousState, removeUserAuthorization())).toEqual({
    userType: null,
    customerId: null,
  });
});
