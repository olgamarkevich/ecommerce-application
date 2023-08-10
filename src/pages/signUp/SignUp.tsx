import React from 'react';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import style from './SignUp.module.css';
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
      .min(8),
    firstname: yup
      .string()
      .required()
      .matches(/^[aA-zZ\s]+$/, 'only alphabets are allowed for this field ')
      .min(1),
    lastname: yup
      .string()
      .required()
      .matches(/^[aA-zZ\s]+$/, 'only alphabets are allowed for this field ')
      .min(1),
    dateOfBirth: yup
      .date()
      .required('Date of Birth is required')
      .max(
        new Date(Date.now() - 567648000000),
        'you must be at least 18 years',
      ),
    street: yup.string().required().min(1),
    city: yup
      .string()
      .required()
      .matches(/^[aA-zZ\s]+$/, 'only alphabets are allowed for this field ')
      .min(1),
    postalCode: yup.string().required().min(1),
    country: yup.string().required().min(1),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const SignUp: FC = () => {
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
  return (
    <>
      <div className='title'>SignUp</div>

      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.form_line}>
          <label>Email</label>
          <input {...register('email')} />
          <p>{errors.email?.message}</p>
        </div>

        <div className={style.form_line}>
          <label>Password</label>
          <div className={style.passwordHide_line}>
            <input {...register('password')} />
          </div>
          <p>{errors.password?.message}</p>
        </div>

        <div className={style.form_line}>
          <label>First name</label>
          <input {...register('firstname')} />
          <p>{errors.firstname?.message}</p>
        </div>

        <div className={style.form_line}>
          <label>Last name</label>
          <input {...register('lastname')} />
          <p>{errors.lastname?.message}</p>
        </div>

        <div className={style.form_line}>
          <label>Date of birth</label>
          <input {...register('dateOfBirth')} type='date' />
          <p>{errors.dateOfBirth?.message}</p>
        </div>

        <div className={style.form_line}>
          <label>Street</label>
          <input {...register('street')} />
          <p>{errors.street?.message}</p>
        </div>

        <div className={style.form_line}>
          <label>City</label>
          <input {...register('city')} />
          <p>{errors.city?.message}</p>
        </div>

        <div className={style.form_line}>
          <label>Postal code</label>
          <input {...register('postalCode')} />
          <p>{errors.postalCode?.message}</p>
        </div>

        <div className={style.form_line}>
          <label>Country</label>
          <select {...register('country')}>
            <option selected>Choose a country</option>
            <option value='US'>United States</option>
            <option value='CA'>Canada</option>
            <option value='FR'>France</option>
            <option value='DE'>Germany</option>
          </select>

          <p>{errors.country?.message}</p>
        </div>

        <button type='submit'>Submit</button>
      </form>
    </>
  );
};

export default SignUp;
