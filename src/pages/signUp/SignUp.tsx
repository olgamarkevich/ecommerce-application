import React, { useState } from 'react';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import style from './SignUp.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const zipRegexes = {
  US: /^\d{5}(?:-?\d{4})?$/,
  DE: /^(?:[1-9]\d{3}|\d{5})$/,
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    // .trim('password cannot include leading and trailing spaces')
    // .matches(/^(?=.*[a-z])/, 'must Contain One Lowercase Character')
    // .matches(/^(?=.*[A-Z])/, 'must Contain One Uppercase Character')
    // .matches(/^(?=.*[0-9])/, 'must Contain One Number Character')
    // .min(8)
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
    dateOfBirth: yup.date().required('Date of Birth is required'),
    // .max(
    //   new Date(Date.now() - 567648000000),
    //   'you must be at least 18 years',
    // ),
    street: yup.string().required().min(1),
    city: yup
      .string()
      .required()
      .matches(/^[aA-zZ\s]+$/, 'only alphabets are allowed for this field ')
      .min(1),
    postalCode: yup
      .string()
      .when(['country'], (country, schema) => {
        return schema.matches(
          zipRegexes[country],
          `invalid postalCode for ${country}`,
        );
      })
      .required(),
    country: yup
      .string()
      .oneOf(['US', 'DE'], 'country is a required field')
      .required()
      .min(1),
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

  const [passwordType, setPasswordType] = useState('password');

  const [contryCode, setContryCode] = useState('');

  const tooglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else setPasswordType('password');
  };
  return (
    <>
      <div className='title'>SignUp</div>

      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.form_line}>
          <label className='label'>Email</label>
          <input
            {...register('email')}
            className='input'
            aria-invalid={errors.email ? 'true' : 'false'}
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
              aria-invalid={errors.password ? 'true' : 'false'}
            />
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

        <div className={style.form_line}>
          <label className='label'>First name</label>
          <input
            {...register('firstname')}
            className='input'
            aria-invalid={errors.firstname ? 'true' : 'false'}
          />
          <p>{errors.firstname?.message}</p>
        </div>

        <div className={style.form_line}>
          <label className='label'>Last name</label>
          <input
            {...register('lastname')}
            className='input'
            aria-invalid={errors.lastname ? 'true' : 'false'}
          />
          <p>{errors.lastname?.message}</p>
        </div>

        <div className={style.form_line}>
          <label className='label'>Date of birth</label>
          <input
            {...register('dateOfBirth')}
            type='date'
            className='input'
            aria-invalid={errors.dateOfBirth ? 'true' : 'false'}
          />
          <p>{errors.dateOfBirth?.message}</p>
        </div>

        <div className={style.form_line}>
          <label className='label'>Street</label>
          <input
            {...register('street')}
            className='input'
            aria-invalid={errors.street ? 'true' : 'false'}
          />
          <p>{errors.street?.message}</p>
        </div>

        <div className={style.form_line}>
          <label className='label'>City</label>
          <input
            {...register('city')}
            className='input'
            aria-invalid={errors.city ? 'true' : 'false'}
          />
          <p>{errors.city?.message}</p>
        </div>

        <div className={style.form_line}>
          <label className='label'>Postal code</label>
          <input
            {...register('postalCode')}
            className='input'
            aria-invalid={errors.postalCode ? 'true' : 'false'}
          />
          <p>{errors.postalCode?.message}</p>
        </div>

        <div className={style.form_line}>
          <label className='label'>Country</label>
          <select
            {...register('country')}
            className='select'
            aria-invalid={errors.country ? 'true' : 'false'}
            onChange={(e) => {
              return setContryCode(e.target.value);
            }}
          >
            <option defaultValue=''>Choose a country</option>
            <option value='US' data-postCodeCountry='^\d{5}([\-]?\d{4})?$'>
              United States
            </option>

            <option
              value='DE'
              data-postCodeCountry='\b((?:0[1-46-9]\d{3})|(?:[1-357-9]\d{4})|(?:[4][0-24-9]\d{3})|(?:[6][013-9]\d{3}))\b'
            >
              Germany
            </option>
          </select>

          <p>{errors.country?.message}</p>
        </div>

        <button type='submit' className='btn'>
          Submit
        </button>
      </form>
    </>
  );
};

export default SignUp;
