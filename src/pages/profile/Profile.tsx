import React, { useState } from 'react';
import type { FC } from 'react';
import { useGetCustomerQuery } from '../../api/customerApi';
import style from './Profile.module.css';
import Addresses from './Addresses';
import Email from './Email';
import Details from './Details';
import Password from './Password';
import { useAppSelector } from 'hooks/hooks';

const Profile: FC = () => {
  const { userType } = useAppSelector((state) => {
    return state.auth;
  });

  const { data: customerData } = useGetCustomerQuery(undefined, {
    skip: !userType,
  });

  const [customer, setCustomerData] = useState(customerData || null);

  if (customerData && customer === null) {
    setCustomerData(customerData);
  }

  return (
    <>
      <h2 className={'mb-10'}>Profile Page</h2>

      <div className={style.wrapper}>
        <Details customer={customer} setCustomerData={setCustomerData} />

        <Addresses customer={customer} setCustomerData={setCustomerData} />

        <div className={style.flex}>
          <div className={style.col}>
            <Email customer={customer} setCustomerData={setCustomerData} />
          </div>
          <div className={style.col}>
            <Password customer={customer} setCustomerData={setCustomerData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
