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
import { useAppDispatch } from 'hooks/hooks';
import { showTextInfo } from 'store/appSlice';
import TextInfo from 'components/TextInfo/TextInfo';

interface Props {
  customer: Customer | null;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const schema = yup
  .object({
    ...email,
  })
  .required();

export type FormData = yup.InferType<typeof schema>;

const EmailForm: FC<Props> = ({
  customer,
  setCustomerData,
  setEditMode,
  setIsLoading,
}) => {
  const dispatch = useAppDispatch();

  const defaultFormData = useMemo<FormData>(() => {
    return {
      email: customer?.email || '',
    };
  }, [customer?.email]);

  const {
    register,
    handleSubmit,
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
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  useEffect(() => {
    if (customerData) {
      setCustomerData(customerData);
      dispatch(showTextInfo('Email updated'));
      setEditMode(false);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.profile_line}>
        <input type='email' {...register('email')} />
        <p>{errors.email?.message}</p>
      </div>

      {serverErrorMsg && <TextInfo text={serverErrorMsg} type='warn' />}

      <div className='flex items-center justify-items-center'>
        <ButtonSubmit text='Save' />
      </div>
    </form>
  );
};

export default EmailForm;
