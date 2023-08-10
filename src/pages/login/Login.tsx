import React, { useState } from 'react';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import style from './Login.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .trim('password cannot include leading and trailing spaces')
      .matches(/^(?=.*[a-z])/, 'must Contain One Lowercase Character')
      .matches(/^(?=.*[A-Z])/, 'must Contain One Uppercase Character')
      .matches(/^(?=.*[0-9])/, 'must Contain One Number Character')
      .matches(
        /^(?=.*[!@#\$%\^&\*])/,
        'must Contain  One Special Case Character',
      )
      .min(8),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    reset();
    console.log(data);
  };

  const [passwordType, setPasswordType] = useState('password');

  const tooglePassword = () => {
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
                return tooglePassword();
              }}
            />
          </div>

          <p>{errors.password?.message}</p>
        </div>

        <button type='submit'>Submit</button>
      </form>
    </>
  );
};

export default Login;
