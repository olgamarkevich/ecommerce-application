import React, { useState } from 'react';
import type { FC } from 'react';
import style from './Profile.module.css';

import type { Customer } from '@commercetools/platform-sdk';

import Loader from 'components/Loader/Loader';

import PasswordForm from './PasswordForm';

interface Props {
  customer: Customer | null;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer>>;
}

const Password: FC<Props> = ({ customer, setCustomerData }) => {
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={style.profile_border}>
      {isLoading && <Loader />}
      <div className={style.profile_title_flex}>
        <div className={style.subtitle}>Password</div>

        {editMode ? (
          <button
            className={style.cancel}
            onClick={() => {
              setEditMode(false);
            }}
          >
            Cancel
          </button>
        ) : (
          <button
            className={style.edit}
            onClick={() => {
              setEditMode(true);
            }}
          >
            Change password
          </button>
        )}
      </div>

      {editMode && (
        <PasswordForm
          customer={customer}
          setCustomerData={setCustomerData}
          setEditMode={setEditMode}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
};

export default Password;
