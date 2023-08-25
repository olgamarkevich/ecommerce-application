import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { FC } from 'react';
import style from './Profile.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { dateOfBirth, firstname, lastname } from 'helpers/settingSchema';
import ButtonSubmit from 'components/Buttons/ButtonSubmit/ButtonSubmit';
import { useUpdateCustomerQuery } from 'api/customerApi';

const schema = yup
  .object({
    ...lastname,
    ...firstname,
    ...dateOfBirth,
  })
  .required();

type FormData = yup.InferType<typeof schema>;

interface Props {
  lastNameP: string | undefined;
  firstNameP: string | undefined;
  dateOfBirthP: string | undefined;
}

const Details: FC<Props> = ({ lastNameP, firstNameP, dateOfBirthP }) => {
  const [editMode, setEditMode] = useState(true);

  const {
    register,
    handleSubmit,
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

  const onSubmit = (data: FormData) => {
    console.log(data);
    setEditMode(false);

    useUpdateCustomerQuery({
      version: 2,
      actions: [
        {
          action: 'setFirstName',
          firstName: data.firstname,
        },
      ],
    });
  };

  return (
    <>
      <div className={style.profile_title_flex}>
        <div className={style.subtitle}>Personal info</div>

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
              setEditMode(true);
            }}
          >
            Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='columns-3'>
          <div className={style.profile_line}>
            <div className={style.profile_line_l}>
              <div>LastName: </div>
            </div>

            <div className={style.profile_line_r}>
              <input
                type='text'
                {...register('lastname')}
                disabled={editMode}
              />
              {!editMode && <p>{errors.lastname?.message}</p>}
            </div>
          </div>

          <div className={style.profile_line}>
            <div className={style.profile_line_l}>
              <div>FirstName:</div>
            </div>

            <div className={style.profile_line_r}>
              <input
                type='text'
                disabled={editMode}
                {...register('firstname')}
              />
              {!editMode && <p>{errors.firstname?.message}</p>}
            </div>
          </div>

          <div className={style.profile_line}>
            <div className={style.profile_line_l}>
              <div>Date of birth: </div>
            </div>

            <div className={style.profile_line_r}>
              <input
                type='date'
                disabled={editMode}
                {...register('dateOfBirth')}
              />
              {!editMode && <p>{errors.dateOfBirth?.message}</p>}
            </div>
          </div>
        </div>

        <div className='flex items-center justify-items-center'>
          {!editMode && <ButtonSubmit text='Save' />}
        </div>
      </form>
    </>
  );
};

export default Details;
