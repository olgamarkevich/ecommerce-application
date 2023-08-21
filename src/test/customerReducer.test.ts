import reducer, {
  removeCustomer,
  setCustomerCredentials,
  setCustomerData,
} from '../store/customerSlice';
import type { Customer } from '../types/storeTypes';

const someCustomer: Customer = {
  version: 1,
  id: 'idSome',
  firstName: 'FirstName',
  lastName: 'LastName',
  dateOfBirth: '2001-01-01',
  addresses: [
    {
      id: 'someId',
      country: 'US',
      firstName: 'FirstName',
      lastName: 'LastName',
      streetName: 'Street',
      postalCode: '07108',
      city: 'City',
    },
  ],
  billingAddressIds: ['someId'],
  shippingAddressIds: ['someId'],
  email: 'email@example.com',
  password: 'Secret123',
};

const nullCustomer: Customer = {
  id: '',
  version: null,
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  addresses: [],
  billingAddressIds: [],
  shippingAddressIds: [],
  email: '',
  password: '',
};

describe('customerReducer should work correctly', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(nullCustomer);
  });

  test('setCustomerData should set new customer data', () => {
    expect(reducer(nullCustomer, setCustomerData(someCustomer))).toEqual(
      someCustomer,
    );
    expect(reducer(someCustomer, setCustomerData(nullCustomer))).toEqual(
      nullCustomer,
    );
  });

  test('setCustomerCredentials should set customer email and password', () => {
    expect(
      reducer(
        nullCustomer,
        setCustomerCredentials({
          email: 'new@email.com',
          password: 'NewPassword123',
        }),
      ),
    ).toEqual({
      ...nullCustomer,
      email: 'new@email.com',
      password: 'NewPassword123',
    });

    expect(
      reducer(
        someCustomer,
        setCustomerCredentials({
          email: 'newest@email.com',
          password: 'NewestPassword123',
        }),
      ),
    ).toEqual({
      ...someCustomer,
      email: 'newest@email.com',
      password: 'NewestPassword123',
    });
  });

  test('removeCustomer should set null data for customer', () => {
    expect(reducer(someCustomer, removeCustomer())).toEqual(nullCustomer);

    expect(reducer(nullCustomer, removeCustomer())).toEqual(nullCustomer);
  });
});
