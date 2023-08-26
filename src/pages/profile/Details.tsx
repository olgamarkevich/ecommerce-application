import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { FC } from 'react';
import style from './Profile.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { dateOfBirth, firstname, lastname } from 'helpers/settingSchema';
import ButtonSubmit from 'components/Buttons/ButtonSubmit/ButtonSubmit';
import { useUpdateCustomerQuery } from 'api/customerApi';
import Loader from 'components/Loader/Loader';
import { showTextInfo } from 'store/appSlice';
import { useAppDispatch } from 'hooks/hooks';
import DetailsInput from './DetailsInput';
import type { Customer } from '@commercetools/platform-sdk';

const schema = yup
  .object({
    ...lastname,
    ...firstname,
    ...dateOfBirth,
  })
  .required();

export type FormData = yup.InferType<typeof schema>;

interface Props {
  lastNameP: string;
  firstNameP: string;
  dateOfBirthP?: Date | null | undefined;
  version: number;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer | undefined>>;
}

const Details: FC<Props> = ({
  lastNameP,
  firstNameP,
  dateOfBirthP,
  version,
  setCustomerData,
}) => {
  const [editMode, setEditMode] = useState(true);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      lastname: lastNameP,
      firstname: firstNameP,
      dateOfBirth: dateOfBirthP,
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [detailsForm, setDetailsForm] = useState({
    first: '',
    last: '',
    dateOfBirth: '',
  });

  const { data, isLoading } = useUpdateCustomerQuery(
    {
      version: version,
      actions: [
        {
          action: 'setFirstName',
          firstName: detailsForm.first,
        },

        {
          action: 'setLastName',
          lastName: detailsForm.last,
        },

        {
          action: 'setDateOfBirth',
          dateOfBirth: detailsForm.dateOfBirth,
        },
      ],
    },
    { skip: undefined },
  );

  if (data !== undefined) {
    setCustomerData(data);
  }

  const onSubmit = (datas: FormData) => {
    // const dateOfBirth: string = datas.dateOfBirth
    //   ? `${String(datas.dateOfBirth.getUTCFullYear())}-${String(
    //       datas.dateOfBirth.getUTCMonth() + 1,
    //     )}-${String(datas.dateOfBirth.getUTCDate())}`
    //   : '';

    setDetailsForm({
      first: datas.firstname,
      last: datas.lastname,
      dateOfBirth: datas.dateOfBirth,
    });
    setEditMode(true);
    dispatch(showTextInfo('Personal information updated'));
  };

  return (
    <div className={style.wrapper_right}>
      {isLoading && <Loader />}
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
              setValue('firstname', firstNameP);
              setValue('lastname', lastNameP);
              setValue('dateOfBirth', dateOfBirthP);
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
  );
};

export default Details;
