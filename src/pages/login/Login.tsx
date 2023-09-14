import React, { useState } from 'react';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import style from './Login.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { email, password } from 'helpers/settingSchema';
import { useAppDispatch } from '../../hooks/hooks';
import useCustomerSignIn from '../../hooks/useCustomerSignIn';
import { setCustomerCredentials } from '../../store/customerSlice';
import { NavLink } from 'react-router-dom';
import ButtonSubmit from 'components/Buttons/ButtonSubmit/ButtonSubmit';
import Title from 'components/Title/Title';
import TextInfo from 'components/TextInfo/TextInfo';

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
    resetField,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  useCustomerSignIn(errors, setError);

  const changePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else setPasswordType('password');
  };

  const onSubmit = (data: FormData) => {
    dispatch(setCustomerCredentials(data));
    resetField('password');
  };

  const handleChange = () => {
    setError('root.serverError', { message: '' });
  };

  return (
    <>
      <Title text='LOGIN' size={'large'} />
      <form
        className={style.form}
        onSubmit={handleSubmit(onSubmit)}
        onChange={handleChange}
      >
        {errors.root?.serverError && errors.root.serverError.message !== '' && (
          <TextInfo text={errors.root.serverError.message} type='warn' />
        )}
        <div className={style.form_line}>
          <label>Email</label>
          <input
            {...register('email')}
            className='input'
            aria-invalid={!!errors.email}
            placeholder='Email'
          />
          <p>{errors.email?.message}</p>
        </div>

        <div className={style.form_line}>
          <label>Password</label>
          <div className={style.passwordHide_line}>
            <input
              type={passwordType}
              {...register('password')}
              className='input'
              aria-invalid={!!errors.password}
              autoComplete='password'
              placeholder='Password'
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
      </form>
      <div className='form_links'>
        Haven&apos;t registered yet? <NavLink to='/signup'>Sign up</NavLink>
      </div>
    </>
  );
};

export default Login;
