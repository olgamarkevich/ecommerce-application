import React, { useState } from 'react';
import type { FC } from 'react';
import { useGetCustomerQuery } from '../../api/customerApi';
import style from './Profile.module.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import Addresses from './Addresses';
import Settings from './Settings';
import Details from './Details';

const Profile: FC = () => {
  const { data: customerData } = useGetCustomerQuery();

  const [customer, setCustomerData] = useState(customerData);

  return (
    <>
      <h2 className={'mb-10'}>Profile Page</h2>

      <div>{JSON.stringify(customer, null, ' ')}</div>
      <div className={style.wrapper}>
        <div className={style.wrapper_nav}>
          <ul>
            <li>
              <NavLink to='/profile'>Personal information</NavLink>
            </li>
            <li>
              <NavLink to='/profile/addresses'>My addresses</NavLink>
            </li>
            <li>
              <NavLink to='/profile/settings'>Account settings</NavLink>
            </li>
          </ul>
        </div>

        <Routes>
          <Route
            index
            element={
              <Details
                firstName={customer?.firstName}
                lastName={customer?.lastName}
                dateOfBirth={customer?.dateOfBirth}
                version={customer?.version}
                setCustomerData={setCustomerData}
              />
            }
          />
          <Route path='/addresses' element={<Addresses />} />
          <Route
            path='/settings'
            element={
              <Settings
                emailP={customer?.email}
                version={customer?.version}
                setCustomerData={setCustomerData}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default Profile;
