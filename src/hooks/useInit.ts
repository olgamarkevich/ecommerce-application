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
  setLoadingSet,
} from '../store/appSlice';
import { getCustomerFromApiResponse } from '../helpers/appHelpers';
import { setCustomerData } from '../store/customerSlice';
import { useAppDispatch, useAppSelector } from './hooks';

const useInit = () => {
  const dispatch = useAppDispatch();
  const { isInitialized, isAuthorized, isCustomerLogged } = useAppSelector(
    (state) => {
      return state.app;
    },
  );
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
  const { data: authData, isLoading: isTokenLoading } =
    useGetAnonymousTokenQuery(undefined, {
      skip: !!customerId || !isInitialized || isAuthorized || isCustomerLogged,
    });

  // Fetch customer data if customer saved
  const { data: customerData, isLoading: isCustomerLoading } =
    useGetCustomerQuery(undefined, {
      skip:
        !customerId ||
        userType !== 'customer' ||
        !!id ||
        !!email ||
        isAuthorized ||
        isCustomerLogged,
    });

  // Set loading status
  useEffect(() => {
    dispatch(
      setLoadingSet({ value: 'tokenLoadingInInit', status: isTokenLoading }),
    );
  }, [dispatch, isTokenLoading]);
  useEffect(() => {
    dispatch(
      setLoadingSet({
        value: 'customerLoadingInInit',
        status: isCustomerLoading,
      }),
    );
  }, [dispatch, isCustomerLoading]);

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
        email = '',
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
          email,
          billingAddressIds,
          shippingAddressIds,
        }),
      );
      dispatch(setCustomerLoggedState(true));
    }
  }, [dispatch, customerData]);
};

export default useInit;
