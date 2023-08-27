import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import style from './Profile.module.css';
import { password, password2, password3 } from 'helpers/settingSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ButtonSubmit from 'components/Buttons/ButtonSubmit/ButtonSubmit';
import { useForm } from 'react-hook-form';
import type { Customer } from '@commercetools/platform-sdk';
import { useUpdatePasswordQuery } from 'api/customerApi';

interface Props {
  customer: Customer | null;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer | null>>;
}

const schema = yup
  .object({
    ...password,
    ...password2,
    ...password3,
  })
  .required();

export type FormData = yup.InferType<typeof schema>;

const Password: FC<Props> = ({ customer, setCustomerData }) => {
  const [editModePassword, setEditModePassword] = useState(true);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const { data: customerData } = useUpdatePasswordQuery(
    {
      version: customer?.version || 0,
      currentPassword: 'secret123',
      newPassword: 'newSecret456',
    },
    { skip: undefined },
  );

  useEffect(() => {
    if (customerData) {
      setCustomerData(customerData);
    }
  }, [customerData, setCustomerData]);

  return (
    <div className={style.profile_border}>
      <div className={style.profile_title_flex}>
        <div className={style.subtitle}>Password</div>

        {editModePassword ? (
          <button
            className={style.edit}
            onClick={() => {
              setEditModePassword(false);
            }}
          >
            Change password
          </button>
        ) : (
          <button
            className={style.edit}
            onClick={() => {
              setEditModePassword(true);
            }}
          >
            Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.profile_line}>
          <div className={style.profile_line_l}>
            <div>Password 1</div>
          </div>
          <div className={style.profile_line_r}>
            <input type='password' {...register('password')} />
            {<p>{errors.password?.message}</p>}
          </div>
        </div>

        <div className={style.profile_line}>
          <div className={style.profile_line_l}>
            <div>Password 2</div>
          </div>
          <div className={style.profile_line_r}>
            <input type='password' {...register('password2')} />
            {<p>{errors.password2?.message}</p>}
          </div>
        </div>

        <div className={style.profile_line}>
          <div className={style.profile_line_l}>
            <div>Password 3</div>
          </div>
          <div className={style.profile_line_r}>
            <input type='password' {...register('password3')} />
            {<p>{errors.password3?.message}</p>}
          </div>
        </div>

        <div className='flex items-center justify-items-center'>
          {<ButtonSubmit text='Save password' />}
        </div>
      </form>
    </div>
  );
};

export default Password;
