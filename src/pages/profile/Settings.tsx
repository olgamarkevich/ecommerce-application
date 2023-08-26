import React, { useState } from 'react';
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

interface Props {
  emailP: string | undefined;
  version: number;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer | undefined>>;
}

const schema = yup
  .object({
    ...email,
  })
  .required();

export type FormData = yup.InferType<typeof schema>;

const Settings: FC<Props> = ({ emailP, version, setCustomerData }) => {
  const [editModeEmail, setEditModeEmail] = useState(true);

  const [emailForm, setEmailForm] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: emailP,
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (datas: FormData) => {
    console.log(datas);
    setEmailForm(datas.email);
  };

  const { data, isLoading } = useUpdateCustomerQuery(
    {
      version: version,
      actions: [
        {
          action: 'changeEmail',
          email: emailForm,
        },
      ],
    },
    { skip: undefined },
  );

  if (data !== undefined) {
    setCustomerData(data);
  }

  return (
    <div className={style.wrapper_right}>
      {isLoading && <Loader />}

      <div className={style.profile_border}>
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
                setValue('email', emailP);
                setEditModeEmail(true);
              }}
            >
              Cancel
            </button>
          )}
        </div>
        <div className={style.profile_line}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type='email'
              disabled={editModeEmail}
              {...register('email')}
            />
            {!editModeEmail && <p>{errors.email?.message}</p>}

            <div className='flex items-center justify-items-center'>
              {!editModeEmail && <ButtonSubmit text='Save' />}
            </div>
          </form>
        </div>
      </div>

      <div className={style.profile_border}>dfgdfgdfg</div>
    </div>
  );
};

export default Settings;
