import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import style from './Profile.module.css';
import Addresses from './Addresses';
import Email from './Email';
import Details from './Details';
import Password from './Password';
import { useAppSelector } from 'hooks/hooks';
import type { Customer } from '@commercetools/platform-sdk';
import Title from 'components/Title/Title';

const Profile: FC = () => {
  const customerState = useAppSelector((state) => {
    return state.customer;
  }) as Customer;

  const [customer, setCustomerData] = useState(customerState);

  useEffect(() => {
    setCustomerData(customer);
  }, [customer]);

  return (
    <>
      <Title text='Profile Page' size='large' />

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
