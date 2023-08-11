import React, { useState } from 'react';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import style from './Login.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  useAppDispatch,
  useAppSelector,
  useCustomerAuthorization,
  useCustomerLogin,
} from '../../hooks/hooks';
import {
  removeCustomerCredentials,
  setCustomerCredentials,
} from '../../store/loginPageSlice';
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
      .trim('Password cannot include leading and trailing spaces'),
    /* .matches(/^(?=.*[a-z])/, 'Must Contain One Lowercase Character')
      .matches(/^(?=.*[A-Z])/, 'Must Contain One Uppercase Character')
      .matches(/^(?=.*[0-9])/, 'Must Contain One Number Character')
      .matches(
        /^(?=.*[!@#\$%\^&\*])/,
        'Must Contain  One Special Case Character',
      )
      .min(8) */
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userType } = useAppSelector((state) => {
    return state.auth;
  });
  const { email, password } = useAppSelector((state) => {
    return state.loginPage;
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    resetField,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    dispatch(setCustomerCredentials(data));
  };

  const { data, error: serverError } = useCustomerLogin(
    { email, password },
    {
      skip:
        !email ||
        !password ||
        userType === 'customer' ||
        !!errors.root?.serverError,
    },
  );

  if (serverError) {
    const msg =
      'data' in serverError &&
      serverError.data &&
      typeof serverError.data === 'object' &&
      'message' in serverError.data &&
      serverError.data.message &&
      typeof serverError.data.message === 'string'
        ? serverError.data.message
        : 'Can`t connect to server. Try later, please...';

    dispatch(removeCustomerCredentials());
    setError('root.serverError', { message: msg });
    // resetField('email');
    resetField('password');
  }

  const isAuthorizationSuccess = useCustomerAuthorization(data).isApplied;

  if (isAuthorizationSuccess) {
    dispatch(removeCustomerCredentials());
    navigate('/');
  }

  const [passwordType, setPasswordType] = useState('password');

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else setPasswordType('password');
  };

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
