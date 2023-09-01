import React, { useEffect, useMemo, useState, useRef } from 'react';
import type { FC } from 'react';
import style from './Profile.module.css';
import { password, newPassword, confirmPassword } from 'helpers/settingSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ButtonSubmit from 'components/Buttons/ButtonSubmit/ButtonSubmit';
import { useForm } from 'react-hook-form';
import type { Customer } from '@commercetools/platform-sdk';
import { useUpdatePasswordQuery } from 'api/customerApi';
import TextInfo from 'components/TextInfo/TextInfo';
import { checkServerErrorMsg } from 'helpers/typesHelpers';
import { getCustomerFromApiResponse } from 'helpers/appHelpers';
import { useAppDispatch } from 'hooks/hooks';
import { setCustomerToken } from 'store/authSlice';

import { useGetCustomerTokenQuery } from 'api/authApi';
import { showTextInfo } from 'store/appSlice';

interface Props {
  customer: Customer | null;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const schema = yup
  .object({
    ...password,
    ...newPassword,
    ...confirmPassword,
  })
  .required();

export type FormData = yup.InferType<typeof schema>;

const PasswordForm: FC<Props> = ({
  customer,
  setCustomerData,
  setEditMode,
  setIsLoading,
}) => {
  const dispatch = useAppDispatch();

  const defaultFormData = useMemo<FormData>(() => {
    return {
      password: '',
      newPassword: '',
      confirmPassword: '',
    };
  }, []);

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [serverErrorMsg, setServerErrorMsg] = useState('');
  const versionRef = useRef<number>(customer?.version || 0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const {
    data: customerData,
    isLoading,
    error: serverError,
  } = useUpdatePasswordQuery(
    {
      id: customer?.id,
      version: customer?.version || 0,
      currentPassword: formData.password,
      newPassword: formData.newPassword,
    },
    {
      skip:
        customer === null ||
        !!serverErrorMsg ||
        formData.newPassword === '' ||
        customer?.version !== versionRef.current,
    },
  );

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  useEffect(() => {
    if (customerData) {
      setCustomerData(customerData);
    }
  }, [customerData, setCustomerData]);

  const { data: tokenData } = useGetCustomerTokenQuery(
    { email: customer?.email || '', password: formData.newPassword },
    {
      skip: customer === null || formData.newPassword === '' || !customerData,
    },
  );

  useEffect(() => {
    if (tokenData) {
      const customer = getCustomerFromApiResponse(tokenData);
      dispatch(setCustomerToken(customer));
      dispatch(showTextInfo('Password updated'));
      setEditMode(false);
    }
  }, [dispatch, setEditMode, tokenData]);

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
    setFormData({
      password: data.password,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    });
    reset();
  };

  const handleChange = () => {
    setServerErrorMsg('');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
      <div className={style.profile_line}>
        <div className={style.profile_line_l}>
          <div>Current password</div>
        </div>
        <div className={style.profile_line_r}>
          <input type='password' {...register('password')} />
          {<p>{errors.password?.message}</p>}
        </div>
      </div>

      <div className={style.profile_line}>
        <div className={style.profile_line_l}>
          <div>New password</div>
        </div>
        <div className={style.profile_line_r}>
          <input type='password' {...register('newPassword')} />
          {<p>{errors.newPassword?.message}</p>}
        </div>
      </div>

      <div className={style.profile_line}>
        <div className={style.profile_line_l}>
          <div>Confirm password</div>
        </div>
        <div className={style.profile_line_r}>
          <input type='password' {...register('confirmPassword')} />
          {<p>{errors.confirmPassword?.message}</p>}
        </div>
      </div>

      {serverErrorMsg && <TextInfo text={serverErrorMsg} type='warn' />}

      <div className='flex items-center justify-items-center'>
        {<ButtonSubmit text='Save password' />}
      </div>
    </form>
  );
};

export default PasswordForm;
