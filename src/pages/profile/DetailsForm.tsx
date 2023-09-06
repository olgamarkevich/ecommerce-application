import React, { useState, useEffect, useMemo } from 'react';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import * as yup from 'yup';
import type { Customer } from '@commercetools/platform-sdk';

import { useUpdateCustomerQuery } from 'api/customerApi';
import { useAppDispatch } from 'hooks/hooks';
import { showTextInfo } from 'store/appSlice';
import { dateOfBirth, firstname, lastname } from 'helpers/settingSchema';
import type { RequiredKeepUndefined } from 'helpers/typesHelpers';
import { checkServerErrorMsg } from 'helpers/typesHelpers';

import ButtonSubmit from 'components/Buttons/ButtonSubmit/ButtonSubmit';

import DetailsInput from './DetailsInput';
import TextInfo from 'components/TextInfo/TextInfo';

const schema = yup
  .object({
    ...lastname,
    ...firstname,
    ...dateOfBirth,
  })
  .required();

export type FormData = RequiredKeepUndefined<yup.InferType<typeof schema>>;

interface Props {
  customer: Customer;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const DetailsForm: FC<Props> = ({
  customer,
  setCustomerData,
  setEditMode,
  setIsLoading,
}) => {
  const dispatch = useAppDispatch();

  const defaultFormData = useMemo<FormData>(() => {
    return {
      lastname: customer?.lastName || '',
      firstname: customer?.firstName || '',
      dateOfBirth: customer?.dateOfBirth || dayjs().format('YYYY-MM-DD'),
    };
  }, [customer?.dateOfBirth, customer?.firstName, customer?.lastName]);

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
          action: 'setFirstName',
          firstName: formData.firstname,
        },

        {
          action: 'setLastName',
          lastName: formData.lastname,
        },

        {
          action: 'setDateOfBirth',
          dateOfBirth: dayjs(formData.dateOfBirth).format('YYYY-MM-DD'),
        },
      ],
    },
    {
      skip:
        customer === null ||
        !!serverErrorMsg ||
        (customer.firstName === formData.firstname &&
          customer.lastName === formData.lastname &&
          customer.dateOfBirth === formData.dateOfBirth),
    },
  );

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  useEffect(() => {
    if (customerData) {
      setCustomerData(customerData);
      dispatch(showTextInfo('Personal information updated'));
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
      {serverErrorMsg && <TextInfo text={serverErrorMsg} type='warn' />}

      <div className='columns-3 md:columns-1'>
        <DetailsInput
          label='FirstName:'
          disabled={false}
          register={register}
          errorText={errors.firstname?.message}
          type='text'
          fieldId='firstname'
        />

        <DetailsInput
          label='LastName:'
          disabled={false}
          register={register}
          errorText={errors.lastname?.message}
          type='text'
          fieldId='lastname'
        />

        <DetailsInput
          label='Date of birth:'
          disabled={false}
          register={register}
          errorText={errors.dateOfBirth?.message}
          type='date'
          fieldId='dateOfBirth'
        />
      </div>

      <div className='flex items-center justify-items-center'>
        <ButtonSubmit text='Save' />
      </div>
    </form>
  );
};

export default DetailsForm;
