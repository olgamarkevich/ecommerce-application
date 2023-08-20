import React, { useState } from 'react';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import style from './Login.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { email, password } from 'helpers/settingSchema';
import ButtonSubmit from 'components/Buttons/ButtonSubmit/ButtonSubmit';
import { useAppDispatch } from '../../hooks/hooks';
import useCustomerSignIn from '../../hooks/useCustomerSignIn';
import { setCustomerCredentials } from '../../store/customerSlice';

const schema = yup
  .object({
    ...email,
    ...password,
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const Login: FC = () => {
  const dispatch = useAppDispatch();

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

  useCustomerSignIn(errors, setError);

  const changePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else setPasswordType('password');
  };

  const onSubmit = (data: FormData) => {
    dispatch(setCustomerCredentials(data));
    reset();
  };

  return (
    <>
      <div className='title'>Login</div>

      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.form_line}>
          <label>Email*</label>
          <input
            {...register('email')}
            className='input'
            aria-invalid={!!errors.email}
          />
          <p>{errors.email?.message}</p>
        </div>

        <div className={style.form_line}>
          <label>Password*</label>
          <div className={style.passwordHide_line}>
            <input
              type={passwordType}
              {...register('password')}
              className='input'
              aria-invalid={!!errors.password}
              autoComplete='password'
            />
            <span
              className={[
                style.hidePassword,
                passwordType === 'password' ? style.password : style.text,
              ].join(' ')}
              onClick={() => {
                return changePassword();
              }}
            />
          </div>

          <p>{errors.password?.message}</p>
        </div>
        <ButtonSubmit text='Submit' />
        {errors.root?.serverError && <p>{errors.root.serverError.message}</p>}
      </form>
    </>
  );
};

export default Login;
