import React, { useState } from 'react';
import type { FC } from 'react';
import type { Customer } from '@commercetools/platform-sdk';

import Loader from 'components/Loader/Loader';

import DetailsInput from './DetailsInput';
import DetailsForm from './DetailsForm';
import style from './Profile.module.css';

interface Props {
  customer: Customer;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer>>;
}

const Details: FC<Props> = ({ customer, setCustomerData }) => {
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={style.wrapper_right}>
      {isLoading && <Loader />}
      <div className={style.profile_border}>
        <div className={style.profile_title_flex}>
          <div className={style.subtitle}>Personal information</div>

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

        {editMode ? (
          <DetailsForm
            customer={customer}
            setCustomerData={setCustomerData}
            setIsLoading={setIsLoading}
            setEditMode={setEditMode}
          />
        ) : (
          <div className='columns-3 md:columns-1'>
            <DetailsInput
              label='FirstName:'
              value={customer.firstName}
              disabled={true}
              type='text'
              fieldId='firstname'
            />

            <DetailsInput
              label='LastName:'
              value={customer.lastName}
              disabled={true}
              type='text'
              fieldId='lastname'
            />

            <DetailsInput
              label='Date of birth:'
              value={customer.dateOfBirth}
              disabled={true}
              type='date'
              fieldId='dateOfBirth'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
