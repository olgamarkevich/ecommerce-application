import { useGetAnonymousTokenQuery } from '../api/authApi';
import { useGetCustomerQuery } from '../api/customerApi';
import { useEffect } from 'react';
import {
  loadCustomerFromLocalStorage,
  setCustomerToken,
} from '../store/authSlice';
import {
  setAuthorizationState,
  setCustomerLoggedState,
  setInitializationState,
} from '../store/appSlice';
import { getCustomerFromApiResponse } from '../helpers/appHelpers';
import { setCustomerData } from '../store/customerSlice';
import { useAppDispatch, useAppSelector } from './hooks';

const useInit = () => {
  const dispatch = useAppDispatch();
  const { isInitialized } = useAppSelector((state) => {
    return state.app;
  });
  const { customerId, userType } = useAppSelector((state) => {
    return state.auth;
  });
  const { id } = useAppSelector((state) => {
    return state.customer;
  });
  const { email } = useAppSelector((state) => {
    return state.customerSignUp;
  });

  // Fetch anonymous token if no customerId saved and after setting data from storage
  const { data: authData } = useGetAnonymousTokenQuery(undefined, {
    skip: !!customerId || !isInitialized,
  });

  // Fetch customer data if customer saved
  const { data: customerData } = useGetCustomerQuery(undefined, {
    skip: !customerId || userType !== 'customer' || !!id || !!email,
  });

  // Load customer data from local storage when start App
  useEffect(() => {
    if (!isInitialized) {
      dispatch(loadCustomerFromLocalStorage()).then(() => {
        dispatch(setInitializationState(true));
      });
    }
  }, [dispatch, isInitialized]);

  // Set auth data
  useEffect(() => {
    if (authData) {
      const customer = getCustomerFromApiResponse(authData);

      dispatch(setCustomerToken(customer)).then(() => {
        dispatch(setAuthorizationState(true));
      });
    }
  }, [dispatch, authData]);

  // Set customer
  useEffect(() => {
    if (customerData) {
      const {
        id,
        version,
        firstName = '',
        lastName = '',
        dateOfBirth = '',
        addresses = [],
        billingAddressIds = [],
        shippingAddressIds = [],
      } = customerData;
      dispatch(
        setCustomerData({
          id,
          version,
          firstName,
          lastName,
          dateOfBirth,
          addresses,
          billingAddressIds,
          shippingAddressIds,
        }),
      );
      dispatch(setCustomerLoggedState(true));
    }
  }, [dispatch, customerData]);
};

export default useInit;