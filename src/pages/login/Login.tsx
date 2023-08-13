import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import style from './Login.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  setCustomerCredentials,
  setCustomerData,
} from '../../store/customerSlice';
import { useSignInCustomerQuery } from '../../api/customerApi';
import { useGetCustomerTokenQuery } from '../../api/authApi';
import { getCustomerFromApiResponse } from '../../helpers/appHelpers';
import { setCustomerToken } from '../../store/authSlice';
import { setAuthorizationState } from '../../store/appSlice';
import { useNavigate } from 'react-router-dom';

const schema = yup
  .object({
    email: yup
      .string()
      .email()
      .min(3, 'must be at least 3 characters long')
      .required(),
    password: yup
      .string()
      .required()
      .trim('Password cannot include leading and trailing spaces')
      .matches(/^(?=.*[a-z])/, 'Must Contain One Lowercase Character')
      .matches(/^(?=.*[A-Z])/, 'Must Contain One Uppercase Character')
      .matches(/^(?=.*[0-9])/, 'Must Contain One Number Character')
      .matches(
        /^(?=.*[!@#\$%\^&\*])/,
        'Must Contain  One Special Case Character',
      )
      .min(8),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState('password');
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { email, password, id } = useAppSelector((state) => {
    return state.customer;
  });

  const { userType } = useAppSelector((state) => {
    return state.auth;
  });

  const onSubmit = (data: FormData) => {
    dispatch(setCustomerCredentials(data));
    reset(undefined, { keepErrors: true });
  };

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else setPasswordType('password');
  };

  // Making token api request
  const { data: tokenData, error: serverError } = useGetCustomerTokenQuery(
    { email, password },
    {
      skip:
        !email ||
        !password ||
        userType === 'customer' ||
        !!errors.root?.serverError,
    },
  );

  // Making customer data api request
  const { data: customerData } = useSignInCustomerQuery(
    { email, password },
    {
      skip:
        !email || !password || !tokenData || userType !== 'customer' || !!id,
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

  // Set customer token
  useEffect(() => {
    if (tokenData) {
      const customer = getCustomerFromApiResponse(tokenData);

      dispatch(setCustomerToken(customer)).then(() => {
        dispatch(setAuthorizationState(true));
      });
    }
  }, [dispatch, tokenData]);

  // Set customer data
  useEffect(() => {
    if (customerData && customerData.customer && customerData.customer.id) {
      const {
        id,
        firstName = '',
        lastName = '',
        middleName = '',
        addresses = [],
        billingAddressIds = [],
        shippingAddressIds = [],
      } = customerData.customer;
      dispatch(
        setCustomerData({
          id,
          firstName,
          lastName,
          middleName,
          addresses,
          billingAddressIds,
          shippingAddressIds,
        }),
      );
      navigate('/');
    }
  }, [dispatch, navigate, customerData]);

  return (
    <>
      <div className='title'>Login</div>

      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.form_line}>
          <label>Email</label>
          <input {...register('email')} />
          <p>{errors.email?.message}</p>
        </div>

        <div className={style.form_line}>
          <label>Password</label>
          <div className={style.passwordHide_line}>
            <input type={passwordType} {...register('password')} />
            <span
              className={[
                style.hidePassword,
                passwordType === 'password' ? style.password : style.text,
              ].join(' ')}
              onClick={() => {
                return togglePassword();
              }}
            />
          </div>

          <p>{errors.password?.message}</p>
        </div>

        <button type='submit'>Submit</button>
        {errors.root?.serverError && <p>{errors.root.serverError.message}</p>}
      </form>
    </>
  );
};

export default Login;
