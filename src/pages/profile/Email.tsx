import React, { useState } from 'react';
import type { FC } from 'react';
import style from './Profile.module.css';
import type { Customer } from '@commercetools/platform-sdk';
import Loader from 'components/Loader/Loader';

import EmailForm from './EmailForm';

interface Props {
  customer: Customer | null;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer>>;
}

const Email: FC<Props> = ({ customer, setCustomerData }) => {
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={style.profile_border}>
      {isLoading && <Loader />}
      <div className={style.profile_title_flex}>
        <div className={style.subtitle}>Email</div>

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
            Edit
          </button>
        )}
      </div>
      <div className={style.profile_line}>
        {editMode ? (
          <EmailForm
            customer={customer}
            setCustomerData={setCustomerData}
            setIsLoading={setIsLoading}
            setEditMode={setEditMode}
          />
        ) : (
          <div className={style.profile_line}>
            <input type='email' disabled value={customer?.email} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Email;
