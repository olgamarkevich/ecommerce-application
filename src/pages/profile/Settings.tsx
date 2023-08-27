import React, { useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import style from './Profile.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { email } from 'helpers/settingSchema';
import ButtonSubmit from 'components/Buttons/ButtonSubmit/ButtonSubmit';
import { useUpdateCustomerQuery } from 'api/customerApi';
import type { Customer } from '@commercetools/platform-sdk';
import Loader from 'components/Loader/Loader';
import { useAppDispatch } from 'hooks/hooks';
import { showTextInfo } from 'store/appSlice';
import TextInfo from 'components/TextInfo/TextInfo';

interface Props {
  customer: Customer | null;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer | null>>;
}

const schema = yup
  .object({
    ...email,
  })
  .required();

export type FormData = yup.InferType<typeof schema>;

const Settings: FC<Props> = ({ customer, setCustomerData }) => {
  const dispatch = useAppDispatch();
  const [editModeEmail, setEditModeEmail] = useState(true);

  const defaultFormData = useMemo<FormData>(() => {
    return {
      email: customer?.email || '',
    };
  }, [customer?.email]);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: defaultFormData,
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const {
    data: customerData,
    isLoading,

    error: serverError,
  } = useUpdateCustomerQuery(
    {
      version: customer?.version || 0,
      actions: [
        {
          action: 'changeEmail',
          email: formData.email,
        },
      ],
    },
    { skip: customer === null || customer.email === formData.email },
  );

  useEffect(() => {
    if (customerData) {
      setCustomerData(customerData);
    }
  }, [customerData, setCustomerData]);

  useEffect(() => {
    if (serverError) {
      const message =
        'status' in serverError && serverError.status === 400
          ? 'There is already an existing customer with the provided email'
          : 'Server error. Please, try later...';

      setError('root.serverError', { message });
    }
  }, [setError, serverError]);

  const onSubmit = (data: FormData) => {
    setFormData(data);
    setEditModeEmail(true);
    dispatch(showTextInfo('Email updated'));
  };

  return (
    <div className={style.profile_border}>
      {isLoading && <Loader />}
      <div className={style.profile_title_flex}>
        <div className={style.subtitle}>Email</div>

        {editModeEmail ? (
          <button
            className={style.edit}
            onClick={() => {
              setEditModeEmail(false);
            }}
          >
            Edit
          </button>
        ) : (
          <button
            className={style.edit}
            onClick={() => {
              setValue('email', defaultFormData.email);
              setEditModeEmail(true);
            }}
          >
            Cancel
          </button>
        )}
      </div>
      <div className={style.profile_line}>
        {errors.root?.serverError.message && (
          <TextInfo text={errors.root?.serverError.message} type='warn' />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type='email' disabled={editModeEmail} {...register('email')} />
          {!editModeEmail && <p>{errors.email?.message}</p>}

          <div className='flex items-center justify-items-center'>
            {!editModeEmail && <ButtonSubmit text='Save' />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
