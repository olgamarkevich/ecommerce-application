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

import ButtonSubmit from 'components/Buttons/ButtonSubmit/ButtonSubmit';
import Loader from 'components/Loader/Loader';

import DetailsInput from './DetailsInput';
import style from './Profile.module.css';

const schema = yup
  .object({
    ...lastname,
    ...firstname,
    ...dateOfBirth,
  })
  .required();

export type FormData = RequiredKeepUndefined<yup.InferType<typeof schema>>;

interface Props {
  customer: Customer | null;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer | null>>;
}

const Details: FC<Props> = ({ customer, setCustomerData }) => {
  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState(true);

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
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: defaultFormData,
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const { data: customerData, isLoading } = useUpdateCustomerQuery(
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
        (customer.firstName === formData.firstname &&
          customer.lastName === formData.lastname &&
          customer.dateOfBirth === formData.dateOfBirth),
    },
  );

  useEffect(() => {
    if (customerData) {
      setCustomerData(customerData);
    }
  }, [customerData, setCustomerData]);

  const onSubmit = (data: FormData) => {
    setFormData(data);
    setEditMode(true);
    dispatch(showTextInfo('Personal information updated'));
  };

  return (
    <div className={style.wrapper_right}>
      {isLoading && <Loader />}
      <div className={style.profile_border}>
        <div className={style.profile_title_flex}>
          <div className={style.subtitle}>Personal information</div>

          {editMode ? (
            <button
              className={style.edit}
              onClick={() => {
                setEditMode(false);
              }}
            >
              Edit
            </button>
          ) : (
            <button
              className={style.edit}
              onClick={() => {
                setValue('firstname', defaultFormData.firstname);
                setValue('lastname', defaultFormData.lastname);
                setValue('dateOfBirth', defaultFormData.dateOfBirth);
                setEditMode(true);
              }}
            >
              Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='columns-3'>
            <DetailsInput
              label='FirstName:'
              editMode={editMode}
              register={register}
              errorText={errors.firstname?.message}
              type='text'
              fieldId='firstname'
            />

            <DetailsInput
              label='LastName:'
              editMode={editMode}
              register={register}
              errorText={errors.lastname?.message}
              type='text'
              fieldId='lastname'
            />

            <DetailsInput
              label='Date of birth:'
              editMode={editMode}
              register={register}
              errorText={errors.dateOfBirth?.message}
              type='date'
              fieldId='dateOfBirth'
            />
          </div>

          <div className='flex items-center justify-items-center'>
            {!editMode && <ButtonSubmit text='Save' />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Details;
