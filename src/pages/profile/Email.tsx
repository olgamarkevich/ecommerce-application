import React, { useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import style from './Profile.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { email } from 'helpers/settingSchema';
import { checkServerErrorMsg } from 'helpers/typesHelpers';
import ButtonSubmit from 'components/Buttons/ButtonSubmit/ButtonSubmit';
import { useUpdateCustomerQuery } from 'api/customerApi';
import type { Customer } from '@commercetools/platform-sdk';
import Loader from 'components/Loader/Loader';
import { useAppDispatch } from 'hooks/hooks';
import { showTextInfo } from 'store/appSlice';
import TextInfo from 'components/TextInfo/TextInfo';

interface Props {
  customer: Customer | null;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer>>;
}

const schema = yup
  .object({
    ...email,
  })
  .required();

export type FormData = yup.InferType<typeof schema>;

const Email: FC<Props> = ({ customer, setCustomerData }) => {
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
    setValue,
    formState: { errors },
  } = useForm<FormData>({
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
      version: customer?.version || 0,
      actions: [
        {
          action: 'changeEmail',
          email: formData.email,
        },
      ],
    },
    {
      skip:
        customer === null ||
        !!serverErrorMsg ||
        errors.email?.message === '' ||
        customer.email === formData.email,
    },
  );

  useEffect(() => {
    if (customerData) {
      setCustomerData(customerData);
      setEditModeEmail(true);
      dispatch(showTextInfo('Email updated'));
    }
  }, [customerData, dispatch, setCustomerData]);

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
            className={style.cancel}
            onClick={() => {
              setValue('email', defaultFormData.email);
              setEditModeEmail(true);
              setServerErrorMsg('');
            }}
          >
            Cancel
          </button>
        )}
      </div>
      <div className={style.profile_line}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.profile_line}>
            <input
              type='email'
              disabled={editModeEmail}
              {...register('email')}
            />
            {!editModeEmail && <p>{errors.email?.message}</p>}
          </div>

          {serverErrorMsg && <TextInfo text={serverErrorMsg} type='warn' />}

          <div className='flex items-center justify-items-center'>
            {!editModeEmail && <ButtonSubmit text='Save' />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Email;
