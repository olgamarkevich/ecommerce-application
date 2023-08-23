import reducer, {
  setCustomerSignUpData,
  clearCustomerSignUpData,
} from '../store/customerSignUpSlice';
import type { CustomerSignUp } from '../types/storeTypes';

const someCustomer: CustomerSignUp = {
  email: 'email@example.com',
  password: 'Secret123',
  firstName: 'FirstName',
  lastName: 'LastName',
  dateOfBirth: '2001-01-01',
  addresses: [
    {
      country: 'US',
      firstName: 'FirstName',
      lastName: 'LastName',
      streetName: 'Street',
      postalCode: '07108',
      city: 'City',
    },
  ],
  isBillingTheSame: true,
  isShippingDefault: false,
  isBillingDefault: false,
};

const nullCustomer: CustomerSignUp = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: null,
  addresses: [],
  isBillingTheSame: false,
  isShippingDefault: false,
  isBillingDefault: false,
};

describe('customerReducer should work correctly', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(nullCustomer);
  });

  test('setCustomerData should set new customer data', () => {
    expect(reducer(nullCustomer, setCustomerSignUpData(someCustomer))).toEqual(
      someCustomer,
    );
    expect(reducer(someCustomer, setCustomerSignUpData(nullCustomer))).toEqual(
      nullCustomer,
    );
  });

  test('clearCustomerSignUpData should set null customer data', () => {
    expect(reducer(nullCustomer, clearCustomerSignUpData())).toEqual(
      nullCustomer,
    );
    expect(reducer(someCustomer, clearCustomerSignUpData())).toEqual(
      nullCustomer,
    );
  });
});
