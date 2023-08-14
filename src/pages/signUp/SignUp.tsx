import React, { useState } from 'react';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import style from './SignUp.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SignUpInput } from 'components';

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
    zipRegExp: /^(?:[1-9]\d{3}|\d{5})$/,
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
      .matches(/^[aA-zZ\s]+$/, 'only alphabets are allowed for this field '),
    streetBilling: yup.string(),
    postalCodeBilling: yup
      .string()
      .when('countryBilling', ([country], schema) => {
        const zipRegExp =
          countryZipItems.find((item) => {
            return item.countryCode === country;
          })?.zipRegExp || new RegExp(/.*/);

        return schema.matches(zipRegExp, `invalid postalCode for ${country}`);
      }),
    countryBilling: yup.string(),
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
    console.log(isBillingAddres);
  };

  const [passwordType, setPasswordType] = useState('password');

  const [isBillingAddres, setIsBillingAddres] = useState(false);

  const tooglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else setPasswordType('password');
  };
  return (
    <>
      <div className='title'>SignUp</div>

      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <SignUpInput
          fieldI='email'
          label='Email'
          register={register}
          invalid={!!errors.email}
          errorText={errors.email?.message}
        />

        <div className={style.form_line}>
          <label className='label'>Password</label>
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

        <SignUpInput
          fieldI='firstname'
          label='First name*'
          register={register}
          invalid={!!errors.firstname}
          errorText={errors.firstname?.message}
        />
        <SignUpInput
          fieldI='lastname'
          label='Last name'
          register={register}
          invalid={!!errors.lastname}
          errorText={errors.lastname?.message}
        />

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

        <div className={style.addres}>
          <h4>Shipping addres</h4>

          <div className='columns-2'>
            <SignUpInput
              fieldI='street'
              label='Street'
              register={register}
              invalid={!!errors.street}
              errorText={errors.street?.message}
            />

            <SignUpInput
              fieldI='city'
              label='City'
              register={register}
              invalid={!!errors.city}
              errorText={errors.city?.message}
            />
          </div>

          <div className='columns-2'>
            <div className={style.form_line}>
              <label className='label'>Country</label>
              <select
                {...register('country')}
                className='select'
                aria-invalid={errors.country ? 'true' : 'false'}
              >
                <option defaultValue=''>Choose a country</option>

                {countryZipItems.map((item) => {
                  return (
                    <option
                      value={item.countryCode}
                      // data-postCodeCountry={item.zipRegExp}
                      key={item.countryCode}
                    >
                      {item.countryName}
                    </option>
                  );
                })}
              </select>

              <p>{errors.country?.message}</p>
            </div>
            <SignUpInput
              fieldI='postalCode'
              label='Postal code'
              register={register}
              invalid={!!errors.postalCode}
              errorText={errors.postalCode?.message}
            />
          </div>

          <div className='flex checkbox-line'>
            <input
              id='default-checkbox1'
              type='checkbox'
              className='checkbox'
            />
            <label htmlFor='default-checkbox1'>
              Set as default shipping address
            </label>
          </div>

          <div className={style.form_line}>
            <div className='flex checkbox-line'>
              <input
                id='default-checkbox'
                type='checkbox'
                checked={isBillingAddres}
                className='checkbox'
                onChange={() => {
                  return isBillingAddres
                    ? setIsBillingAddres(false)
                    : setIsBillingAddres(true);
                }}
              />
              <label htmlFor='default-checkbox'>Set as billing address</label>
            </div>
          </div>
        </div>

        {!isBillingAddres && (
          <div className={style.addres}>
            <h4>Billing addres</h4>
            <div className='columns-2'>
              <SignUpInput
                fieldI='streetBilling'
                label='Street'
                register={register}
                invalid={!!errors.streetBilling}
                errorText={errors.streetBilling?.message}
              />

              <SignUpInput
                fieldI='cityBilling'
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
                  aria-invalid={errors.countryBilling ? 'true' : 'false'}
                >
                  <option defaultValue=''>Choose a country</option>

                  {countryZipItems.map((item) => {
                    return (
                      <option
                        value={item.countryCode}
                        // data-postCodeCountry={item.zipRegExp}
                        key={item.countryCode}
                      >
                        {item.countryName}
                      </option>
                    );
                  })}
                </select>

                <p>{errors.country?.message}</p>
              </div>
              <SignUpInput
                fieldI='postalCodeBilling'
                label='Postal code'
                register={register}
                invalid={!!errors.postalCodeBilling}
                errorText={errors.postalCodeBilling?.message}
              />
            </div>

            <div className='flex checkbox-line'>
              <input
                id='default-checkbox3'
                type='checkbox'
                className='checkbox'
              />
              <label htmlFor='default-checkbox3'>
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
export type { FormData };
export default SignUp;
