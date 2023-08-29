import React, { useMemo, useState, useEffect } from 'react';
import type { FC } from 'react';
import style from '../Profile.module.css';
import type { Customer, Address } from '@commercetools/platform-sdk';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  city,
  country,
  countryZipItems,
  postalCode,
  street,
} from 'helpers/settingSchema';
import { checkServerErrorMsg } from 'helpers/typesHelpers';
import type { RequiredKeepUndefined } from 'helpers/typesHelpers';
import { useForm } from 'react-hook-form';
import ButtonSubmit from 'components/Buttons/ButtonSubmit/ButtonSubmit';
import { useAppDispatch } from 'hooks/hooks';
import { showTextInfo } from 'store/appSlice';
import { useUpdateCustomerQuery } from 'api/customerApi';
import TextInfo from 'components/TextInfo/TextInfo';

interface Props {
  address: Address;
  version: number;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer | null>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const schema = yup
  .object({
    ...street,
    ...city,
    ...postalCode,
    ...country,
  })
  .required();

export type FormData = RequiredKeepUndefined<yup.InferType<typeof schema>>;

const AddressEdit: FC<Props> = ({
  address,
  version,
  setCustomerData,
  setEditMode,
}) => {
  const dispatch = useAppDispatch();

  const defaultFormData = useMemo<FormData>(() => {
    return {
      id: address.id,
      street: address.streetName || '',
      city: address.city || '',
      postalCode: address.postalCode || '',
      country: address.country || '',
    };
  }, [
    address.id,
    address.streetName,
    address.city,
    address.postalCode,
    address.country,
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormData,
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [serverErrorMsg, setServerErrorMsg] = useState('');

  const {
    data: customerData,
    //isLoading,
    error: serverError,
  } = useUpdateCustomerQuery(
    {
      version,
      actions: [
        {
          action: 'changeAddress',
          addressId: address.id,
          address: {
            city: formData.city,
            country: formData.country,
            postalCode: formData.postalCode,
            streetName: formData.street,
          },
        },
      ],
    },
    {
      skip:
        !!serverErrorMsg ||
        (address.city === formData.city &&
          address.country === formData.country &&
          address.postalCode === formData.postalCode &&
          address.streetName === formData.street),
    },
  );

  useEffect(() => {
    if (customerData) {
      setCustomerData(customerData);
      setEditMode(false);
      dispatch(showTextInfo('Address info updated'));
    }
  }, [customerData, dispatch, setCustomerData, setEditMode]);

  useEffect(() => {
    if (serverError) {
      if (checkServerErrorMsg(serverError)) {
        setServerErrorMsg(serverError.data.message);
      } else {
        setServerErrorMsg('Server error. Please, try later...');
      }
      setFormData(defaultFormData);
    }
  }, [defaultFormData, serverError]);

  const onSubmit = (data: FormData) => {
    setServerErrorMsg('');
    setFormData(data);
  };

  return (
    <div className={style.address_card}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.profile_line}>
          <div className={style.profile_line_l}>
            <div className={style.label}>Country</div>
          </div>
          <div className={style.profile_line_r}>
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
            {<p>{errors.country?.message}</p>}
          </div>
        </div>

        <div className={style.profile_line}>
          <div className={style.profile_line_l}>
            <div className={style.label}>Postal code</div>
          </div>
          <div className={style.profile_line_r}>
            <input type='text' {...register('postalCode')} />
            {<p>{errors.postalCode?.message}</p>}
          </div>
        </div>

        <div className={style.profile_line}>
          <div className={style.profile_line_l}>
            <div className={style.label}>City</div>
          </div>
          <div className={style.profile_line_r}>
            <input type='text' {...register('city')} />
            {<p>{errors.city?.message}</p>}
          </div>
        </div>

        <div className={style.profile_line}>
          <div className={style.profile_line_l}>
            <div className={style.label}>Street</div>
          </div>
          <div className={style.profile_line_r}>
            <input type='text' {...register('street')} />
            {<p>{errors.street?.message}</p>}
          </div>
        </div>

        {serverErrorMsg && <TextInfo text={serverErrorMsg} type='warn' />}

        <div className='flex items-center justify-items-center'>
          {<ButtonSubmit text='Save' />}
        </div>
      </form>
    </div>
  );
};

export default AddressEdit;
