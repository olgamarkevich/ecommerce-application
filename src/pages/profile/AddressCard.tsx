import React, { useMemo, useState } from 'react';
import type { FC } from 'react';
import style from './Profile.module.css';
import type { Address } from '@commercetools/platform-sdk';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  city,
  country,
  countryZipItems,
  postalCode,
  street,
} from 'helpers/settingSchema';
import type { RequiredKeepUndefined } from 'helpers/typesHelpers';
import { useForm } from 'react-hook-form';
import ButtonSubmit from 'components/Buttons/ButtonSubmit/ButtonSubmit';

interface Props {
  address: Address | null;
  setAddressItem: React.Dispatch<React.SetStateAction<string>>;
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

const AddressCard: FC<Props> = ({ address, setAddressItem }) => {
  const onSubmit = (data: FormData) => {
    setAddressItem(data);
    setEditModeAddress(true);
  };

  const [editModeAddress, setEditModeAddress] = useState(true);

  const defaultFormData = useMemo<FormData>(() => {
    return {
      id: address?.id,
      street: address?.streetName || '',
      city: address?.city || '',
      postalCode: address?.postalCode || '',
      country: address?.country || '',
    };
  }, [
    address?.id,
    address?.streetName,
    address?.city,
    address?.postalCode,
    address?.country,
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormData,
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  return (
    <div className={style.address_card}>
      {editModeAddress ? (
        <button
          className={style.edit}
          onClick={() => {
            setEditModeAddress(false);
          }}
        >
          Edit
        </button>
      ) : (
        <button
          className={style.edit}
          onClick={() => {
            setEditModeAddress(true);
            setValue('city', defaultFormData.city);
            setValue('street', defaultFormData.street);
            setValue('country', defaultFormData.country);
            setValue('postalCode', defaultFormData.postalCode);
          }}
        >
          Cancel
        </button>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.profile_line}>
          <div className={style.profile_line_l}>
            <div className={style.label}>City</div>
          </div>
          <div className={style.profile_line_r}>
            <input
              type='text'
              disabled={editModeAddress}
              {...register('city')}
            />
            {!editModeAddress && <p>{errors.city?.message}</p>}
          </div>
        </div>

        <div className={style.profile_line}>
          <div className={style.profile_line_l}>
            <div className={style.label}>Street</div>
          </div>
          <div className={style.profile_line_r}>
            <input
              type='text'
              disabled={editModeAddress}
              {...register('street')}
            />
            {!editModeAddress && <p>{errors.street?.message}</p>}
          </div>
        </div>

        <div className={style.profile_line}>
          <div className={style.profile_line_l}>
            <div className={style.label}>Country</div>
          </div>
          <div className={style.profile_line_r}>
            {!editModeAddress ? (
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
            ) : (
              <input type='text' disabled={true} {...register('country')} />
            )}

            {!editModeAddress && <p>{errors.country?.message}</p>}
          </div>
        </div>

        <div className={style.profile_line}>
          <div className={style.profile_line_l}>
            <div className={style.label}>Postal code</div>
          </div>
          <div className={style.profile_line_r}>
            <input
              type='text'
              disabled={editModeAddress}
              {...register('postalCode')}
            />
            {!editModeAddress && <p>{errors.postalCode?.message}</p>}
          </div>
        </div>

        <div className='flex items-center justify-items-center'>
          {!editModeAddress && <ButtonSubmit text='Save' />}
        </div>
      </form>
    </div>
  );
};

export default AddressCard;
