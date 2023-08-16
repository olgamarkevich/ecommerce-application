import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import type { RootState, RootDispatch } from '../store/store';
import {
  useGetAnonymousTokenQuery,
  useGetCustomerTokenQuery,
} from '../api/authApi';
import {
  useGetCustomerQuery,
  useSignInCustomerQuery,
} from '../api/customerApi';
import { useEffect } from 'react';
import {
  loadCustomerFromLocalStorage,
  setCustomerToken,
} from '../store/authSlice';
import {
  setAuthorizationState,
  setInitializationState,
} from '../store/appSlice';
import { getCustomerFromApiResponse } from '../helpers/appHelpers';
import { setCustomerData } from '../store/customerSlice';
import { useNavigate } from 'react-router-dom';
import type { UseFormSetError } from 'react-hook-form/dist/types/form';
import type { FieldErrors } from 'react-hook-form/dist/types/errors';

export const useAppDispatch = () => {
  return useDispatch<RootDispatch>();
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useInit = () => {
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

  // Fetch anonymous token if no customerId saved and after setting data from storage
  const { data: authData } = useGetAnonymousTokenQuery(undefined, {
    skip: !!customerId || !isInitialized,
  });

  // Fetch customer data if customer saved
  const { data: customerData } = useGetCustomerQuery(undefined, {
    skip: !customerId || userType !== 'customer' || !!id,
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
        firstName = '',
        lastName = '',
        addresses = [],
        billingAddressIds = [],
        shippingAddressIds = [],
      } = customerData;
      dispatch(
        setCustomerData({
          id,
          firstName,
          lastName,
          addresses,
          billingAddressIds,
          shippingAddressIds,
        }),
      );
    }
  }, [dispatch, customerData]);
};

export const useCustomerSignIn = (
  errors: FieldErrors<{ email: string; password: string }>,
  setError: UseFormSetError<{ email: string; password: string }>,
) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
        'data' in serverError &&
        serverError.data &&
        typeof serverError.data === 'object' &&
        'message' in serverError.data &&
        serverError.data.message &&
        typeof serverError.data.message === 'string'
          ? serverError.data.message
          : 'Can`t connect to server. Try later, please...';

      setError('root.serverError', { message });
    }
  }, [setError, serverError]);

  // Set customer data
  useEffect(() => {
    if (customerData && customerData.customer && customerData.customer.id) {
      const {
        id,
        firstName = '',
        lastName = '',
        addresses = [],
        billingAddressIds = [],
        shippingAddressIds = [],
      } = customerData.customer;
      dispatch(
        setCustomerData({
          id,
          firstName,
          lastName,
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

      dispatch(setCustomerToken(customer))
        .then(() => {
          dispatch(setAuthorizationState(true));
        })
        .then(() => {
          navigate('/', { replace: true });
        });
    }
  }, [dispatch, navigate, tokenData]);
};
