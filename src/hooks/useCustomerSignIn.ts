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
} from '../store/appSlice';
import { useAppDispatch, useAppSelector } from './hooks';

const useCustomerSignIn = (
  errors: FieldErrors<{ email: string; password: string }>,
  setError: UseFormSetError<{ email: string; password: string }>,
) => {
  const dispatch = useAppDispatch();

  const { email, password, id } = useAppSelector((state) => {
    return state.customer;
  });

  // Making customer data api request
  const { data: customerData, error: serverError } = useSignInCustomerQuery(
    { email, password },
    {
      skip: !email || !password || !!id || !!errors.root?.serverError,
    },
  );

  // Making token api request
  const { data: tokenData } = useGetCustomerTokenQuery(
    { email, password },
    {
      skip: !email || !password || !customerData || !!errors.root?.serverError,
    },
  );

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
      });
    }
  }, [dispatch, tokenData]);
};

export default useCustomerSignIn;
