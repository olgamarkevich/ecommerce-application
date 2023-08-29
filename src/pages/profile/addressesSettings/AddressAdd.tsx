import ButtonSubmit from 'components/Buttons/ButtonSubmit/ButtonSubmit';
import React, { useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import style from '../Profile.module.css';
import type { Customer } from '@commercetools/platform-sdk';
import {
  city,
  country,
  countryZipItems,
  postalCode,
  street,
} from 'helpers/settingSchema';
import {
  checkServerErrorMsg,
  type RequiredKeepUndefined,
} from 'helpers/typesHelpers';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from 'hooks/hooks';
import TextInfo from 'components/TextInfo/TextInfo';
import { useForm } from 'react-hook-form';
import { useUpdateCustomerQuery } from 'api/customerApi';
import { showTextInfo } from 'store/appSlice';
import Loader from 'components/Loader/Loader';

interface Props {
  version: number;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer | null>>;
}

const AddressAdd: FC<Props> = ({ version, setCustomerData }) => {
  const [addresAddMode, setAddressMode] = useState(true);
  console.log(setAddressMode);

  const schema = yup
    .object({
      ...street,
      ...city,
      ...postalCode,
      ...country,
    })
    .required();

  type FormData = RequiredKeepUndefined<yup.InferType<typeof schema>>;

  const dispatch = useAppDispatch();

  const defaultFormData = useMemo<FormData>(() => {
    return {
      id: '',
      street: '',
      city: '',
      postalCode: '',
      country: '',
    };
  }, []);

  const {
    register,
    handleSubmit,
    reset,
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
    isLoading,
    error: serverError,
  } = useUpdateCustomerQuery(
    {
      version,
      actions: [
        {
          action: 'addAddress',
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
        (formData.city == '' &&
          formData.country == '' &&
          formData.postalCode == '' &&
          formData.street == ''),
    },
  );

  useEffect(() => {
    if (customerData) {
      setCustomerData(customerData);
      dispatch(showTextInfo('Address added'));
      setFormData(defaultFormData);
      reset();
      setAddressMode(true);
    }
  }, [customerData, defaultFormData, dispatch, reset, setCustomerData]);

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
    <div className={style.address_add}>
      {isLoading && <Loader />}
      {addresAddMode ? (
        <ButtonSubmit
          text='Add addres'
          onClick={() => {
            return setAddressMode(false);
          }}
        />
      ) : (
        <button
          className={style.cancel}
          onClick={() => {
            setAddressMode(true);
            reset();
          }}
        >
          cancel
        </button>
      )}

      {!addresAddMode && (
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
      )}
    </div>
  );
};

export default AddressAdd;
