import React, { useState } from 'react';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import style from './SignUp.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import type { RequiredKeepUndefined } from 'helpers/typesHelpers';
import SignUpInput from './SignUpInput/SignUpInput';

interface CountryZipData {
  countryName: string;
  countryCode: string;
  zipRegExp: RegExp;
}

const countryZipItems: CountryZipData[] = [
  {
    countryName: 'United States',
    countryCode: 'US',
    zipRegExp: /^\d{5}(?:-?\d{4})?$/,
  },
  {
    countryName: 'Germany',
    countryCode: 'DE',
    zipRegExp: /^\d{5}$/,
  },
];

const countryCodes = countryZipItems.map((item) => {
  return item.countryCode;
});

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
      .matches(/^[a-zа-яё\s-]+$/i, 'only alphabets are allowed for this field ')
      .min(1),
    lastname: yup
      .string()
      .required()
      .matches(/^[a-zа-яё\s-]+$/i, 'only alphabets are allowed for this field ')
      .min(1),
    dateOfBirth: yup
      .date()
      .nullable()
      .typeError('date of birth is required')
      .max(
        new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000),
        'you must be at least 18 years',
      ),
    street: yup.string().required().min(1),
    city: yup
      .string()
      .required()
      .matches(/^[a-zа-яё\s-]+$/i, 'only alphabets are allowed for this field ')
      .min(1),
    postalCode: yup
      .string()
      .when('country', ([country], schema) => {
        const zipRegExp =
          countryZipItems.find((item) => {
            return item.countryCode === country;
          })?.zipRegExp || new RegExp(/.*/);

        return schema.matches(zipRegExp, `invalid postalCode for ${country}`);
      })
      .required(),
    country: yup
      .string()
      .oneOf(countryCodes, 'country is a required field')
      .required()
      .min(1),
    cityBilling: yup
      .string()
      .matches(/^[a-zа-яё\s-]*$/, 'only alphabets are allowed for this field '),
    streetBilling: yup.string(),
    countryBilling: yup.string(),
    postalCodeBilling: yup
      .string()
      .when('countryBilling', ([countryBilling], schema) => {
        const zipRegExp =
          countryZipItems.find((item) => {
            return item.countryCode === countryBilling;
          })?.zipRegExp || new RegExp(/.*/);

        return schema.matches(
          zipRegExp,
          `invalid postalCode for ${countryBilling}`,
        );
      }),
  })
  .required();

export type FormData = RequiredKeepUndefined<yup.InferType<typeof schema>>;

const SignUp: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    console.log('isBillingAddress', isBillingAddress);
    console.log('defaultShippingAddress', defaultShippingAddress);
    console.log('defaultBillingAddress', defaultBillingAddress);
    reset();
    setIsBillingAddress(false);
    setDefaultBillingAddress(false);
    setDefaultShippingAddress(false);
  };

  const [passwordType, setPasswordType] = useState('password');

  const [isBillingAddress, setIsBillingAddress] = useState(false);
  const [defaultShippingAddress, setDefaultShippingAddress] = useState(false);
  const [defaultBillingAddress, setDefaultBillingAddress] = useState(false);

  const changePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else setPasswordType('password');
  };
  return (
    <>
      <div className='title'>SignUp</div>

      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <SignUpInput
          fieldId='email'
          label='Email*'
          register={register}
          invalid={!!errors.email}
          errorText={errors.email?.message}
        />

        <div className={style.form_line}>
          <label className='label'>Password*</label>
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

        <SignUpInput
          fieldId='firstname'
          label='First name*'
          register={register}
          invalid={!!errors.firstname}
          errorText={errors.firstname?.message}
        />
        <SignUpInput
          fieldId='lastname'
          label='Last name*'
          register={register}
          invalid={!!errors.lastname}
          errorText={errors.lastname?.message}
        />

        <div className={style.form_line}>
          <label className='label'>Date of birth*</label>
          <input
            {...register('dateOfBirth')}
            type='date'
            className='input'
            aria-invalid={!!errors.dateOfBirth}
          />
          <p>{errors.dateOfBirth?.message}</p>
        </div>

        <div className={style.address}>
          <h4>Shipping address</h4>

          <div className='columns-2'>
            <SignUpInput
              fieldId='street'
              label='Street*'
              register={register}
              invalid={!!errors.street}
              errorText={errors.street?.message}
            />

            <SignUpInput
              fieldId='city'
              label='City*'
              register={register}
              invalid={!!errors.city}
              errorText={errors.city?.message}
            />
          </div>

          <div className='columns-2'>
            <div className={style.form_line}>
              <label className='label'>Country*</label>
              <select
                {...register('country')}
                className='select'
                aria-invalid={!!errors.country}
              >
                <option defaultValue=''>Choose a country</option>

                {countryZipItems.map((item) => {
                  return (
                    <option value={item.countryCode} key={item.countryCode}>
                      {item.countryName}
                    </option>
                  );
                })}
              </select>

              <p>{errors.country?.message}</p>
            </div>
            <SignUpInput
              fieldId='postalCode'
              label='Postal code*'
              register={register}
              invalid={!!errors.postalCode}
              errorText={errors.postalCode?.message}
            />
          </div>

          <div className='flex checkbox-line'>
            <input
              id='defaultShippingAddress'
              type='checkbox'
              className='checkbox'
              checked={defaultShippingAddress}
              onChange={() => {
                return defaultShippingAddress
                  ? setDefaultShippingAddress(false)
                  : setDefaultShippingAddress(true);
              }}
            />
            <label htmlFor='defaultShippingAddress'>
              Set as default shipping address
            </label>
          </div>

          <div className={style.form_line}>
            <div className='flex checkbox-line'>
              <input
                id='default-checkbox'
                type='checkbox'
                checked={isBillingAddress}
                className='checkbox'
                onChange={() => {
                  return isBillingAddress
                    ? setIsBillingAddress(false)
                    : setIsBillingAddress(true);
                }}
              />
              <label htmlFor='default-checkbox'>Set as billing address</label>
            </div>
          </div>
        </div>

        {!isBillingAddress && (
          <div className={style.address}>
            <h4>Billing address</h4>
            <div className='columns-2'>
              <SignUpInput
                fieldId='streetBilling'
                label='Street'
                register={register}
                invalid={!!errors.streetBilling}
                errorText={errors.streetBilling?.message}
              />

              <SignUpInput
                fieldId='cityBilling'
                label='City'
                register={register}
                invalid={!!errors.cityBilling}
                errorText={errors.cityBilling?.message}
              />
            </div>

            <div className='columns-2'>
              <div className={style.form_line}>
                <label className='label'>Country</label>
                <select
                  {...register('countryBilling')}
                  className='select'
                  aria-invalid={!!errors.countryBilling}
                >
                  <option defaultValue=''>Choose a country</option>

                  {countryZipItems.map((item) => {
                    return (
                      <option value={item.countryCode} key={item.countryCode}>
                        {item.countryName}
                      </option>
                    );
                  })}
                </select>

                <p>{errors.countryBilling?.message}</p>
              </div>

              <SignUpInput
                fieldId='postalCodeBilling'
                label='Postal code'
                register={register}
                invalid={!!errors.postalCodeBilling}
                errorText={errors.postalCodeBilling?.message}
              />
            </div>

            <div className='flex checkbox-line'>
              <input
                id='defaultBillingAddress'
                type='checkbox'
                className='checkbox'
                checked={defaultBillingAddress}
                onChange={() => {
                  return defaultBillingAddress
                    ? setDefaultBillingAddress(false)
                    : setDefaultBillingAddress(true);
                }}
              />
              <label htmlFor='defaultBillingAddress'>
                Set as default billing address
              </label>
            </div>
          </div>
        )}

        <button type='submit' className='btn'>
          Submit
        </button>
      </form>
    </>
  );
};

export default SignUp;
