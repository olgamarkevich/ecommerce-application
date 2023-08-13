import React, { useState } from 'react';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import style from './Login.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useCustomerSignIn } from '../../hooks/hooks';
import { setCustomerCredentials } from '../../store/customerSlice';

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

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else setPasswordType('password');
  };

  const onSubmit = (data: FormData) => {
    dispatch(setCustomerCredentials(data));
    reset(undefined, { keepErrors: true });
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
