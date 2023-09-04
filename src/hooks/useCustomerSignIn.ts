import type { FieldErrors } from 'react-hook-form/dist/types/errors';
import type { UseFormSetError } from 'react-hook-form/dist/types/form';
import { useSignInCustomerQuery } from '../api/customerApi';
import { useGetCustomerTokenQuery } from '../api/authApi';
import { useEffect } from 'react';
import { setCustomerData } from '../store/customerSlice';
import { getCustomerFromApiResponse } from '../helpers/appHelpers';
import { setCustomerToken } from '../store/authSlice';
import {
  setAuthorizationState,
  setCustomerLoggedState,
  setLoadingSet,
  showTextInfo,
} from '../store/appSlice';
import { useAppDispatch, useAppSelector } from './hooks';

const useCustomerSignIn = (
  errors: FieldErrors<{ email: string; password: string }>,
  setError: UseFormSetError<{ email: string; password: string }>,
) => {
  const dispatch = useAppDispatch();

  const { email, password, id, firstName } = useAppSelector((state) => {
    return state.customer;
  });

  // Making customer data api request
  const {
    data: customerData,
    error: serverError,
    isLoading: isSignInLoading,
  } = useSignInCustomerQuery(
    { email, password },
    {
      skip: !email || !password || !!id || !!errors.root?.serverError,
    },
  );

  // Making token api request
  const { data: tokenData, isLoading: isTokenLoading } =
    useGetCustomerTokenQuery(
      { email, password },
      {
        skip:
          !email || !password || !customerData || !!errors.root?.serverError,
      },
    );

  // Set loading status
  useEffect(() => {
    dispatch(
      setLoadingSet({ value: 'signinLoadingInLogin', status: isSignInLoading }),
    );
  }, [dispatch, isSignInLoading]);
  useEffect(() => {
    dispatch(
      setLoadingSet({ value: 'tokenLoadingInLogin', status: isTokenLoading }),
    );
  }, [dispatch, isTokenLoading]);

  // Set error after unsuccessful response
  useEffect(() => {
    if (serverError) {
      const message =
        'status' in serverError && serverError.status === 400
          ? 'Account with the given credentials not found'
          : 'Server error. Please, try later...';

      setError('root.serverError', { message });
    }
  }, [setError, serverError]);

  // Set customer data
  useEffect(() => {
    if (customerData && customerData.customer) {
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
      } = customerData.customer;
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
    }
  }, [dispatch, customerData]);

  // Set customer token
  useEffect(() => {
    if (tokenData) {
      const customer = getCustomerFromApiResponse(tokenData);

      dispatch(setCustomerToken(customer)).then(() => {
        dispatch(setAuthorizationState(true));
        dispatch(setCustomerLoggedState(true));
        dispatch(showTextInfo(`You are welcome, ${firstName || 'customer'}!`));
      });
    }
  }, [dispatch, tokenData, firstName]);
};

export default useCustomerSignIn;
