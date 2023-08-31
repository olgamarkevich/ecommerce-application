import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { useSignUpCustomerQuery } from '../api/customerApi';
import { useGetCustomerTokenQuery } from '../api/authApi';
import { setCustomerData } from '../store/customerSlice';
import { setCustomerToken } from '../store/authSlice';
import {
  setAuthorizationState,
  setCustomerLoggedState,
  setLoadingStatus,
  showTextInfo,
} from '../store/appSlice';
import { clearCustomerSignUpData } from '../store/customerSignUpSlice';
import { getCustomerFromApiResponse } from '../helpers/appHelpers';
import type { FieldErrors } from 'react-hook-form/dist/types/errors';
import type { UseFormSetError } from 'react-hook-form/dist/types/form';
import type { BaseAddress } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';

interface MyCustomerDraft {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  addresses?: BaseAddress[];
  shippingAddresses?: number[];
  billingAddresses?: number[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

const useCustomerSignUp = (
  errors: FieldErrors<{ email: string; password: string }>,
  setError: UseFormSetError<{ email: string; password: string }>,
) => {
  const dispatch = useAppDispatch();

  const {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    addresses: userAddresses,
    isBillingTheSame,
    isShippingDefault,
    isBillingDefault,
  } = useAppSelector((state) => {
    return state.customerSignUp;
  });

  const { userType } = useAppSelector((state) => {
    return state.auth;
  });

  const { id, firstName: customerFirstName } = useAppSelector((state) => {
    return state.customer;
  });

  const signUpRequestBody: MyCustomerDraft = {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth: dateOfBirth ?? '',
  };

  if (email && password) {
    signUpRequestBody.addresses = isBillingTheSame
      ? userAddresses.slice(0, 1)
      : userAddresses;

    signUpRequestBody.shippingAddresses = [0];
    signUpRequestBody.billingAddresses = [
      signUpRequestBody.addresses.length - 1,
    ];

    if (isShippingDefault) signUpRequestBody.defaultShippingAddress = 0;

    if (isBillingDefault)
      signUpRequestBody.defaultBillingAddress =
        signUpRequestBody.addresses.length - 1;
  }

  // Making customer signup api request
  const {
    data: signUpResult,
    error: serverError,
    isLoading: isSignUpLoading,
  } = useSignUpCustomerQuery(signUpRequestBody, {
    skip: !email || !password || userType === 'customer' || !!id,
  });

  // Making token api request
  const { data: tokenData, isLoading: isTokenLoading } =
    useGetCustomerTokenQuery(
      { email, password },
      {
        skip:
          !email ||
          !password ||
          !signUpResult ||
          !!errors.root?.serverError ||
          userType === 'customer',
      },
    );

  // Set loading status
  useEffect(() => {
    dispatch(setLoadingStatus(isSignUpLoading || isTokenLoading));
  }, [dispatch, isSignUpLoading, isTokenLoading]);

  // Set error after unsuccessful response
  useEffect(() => {
    if (serverError) {
      const message =
        'status' in serverError && serverError.status === 400
          ? 'There is already an existing customer with the provided email'
          : 'Server error. Please, try later...';

      setError('root.serverError', { message });
    }
  }, [setError, serverError]);

  // Set customer data
  useEffect(() => {
    if (signUpResult && signUpResult.customer) {
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
      } = signUpResult.customer;
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
  }, [dispatch, signUpResult]);

  // Set customer token
  useEffect(() => {
    if (tokenData) {
      const customer = getCustomerFromApiResponse(tokenData);

      dispatch(setCustomerToken(customer)).then(() => {
        dispatch(setAuthorizationState(true));
        dispatch(clearCustomerSignUpData());
        dispatch(setCustomerLoggedState(true));
        dispatch(
          showTextInfo(`You are welcome, ${customerFirstName || 'customer'}!`),
        );
      });
    }
  }, [dispatch, tokenData, customerFirstName]);
};

export default useCustomerSignUp;
