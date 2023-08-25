import React from 'react';
import type { FC } from 'react';
import { useGetCustomerQuery } from '../../api/customerApi';
import style from './Profile.module.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import Addresses from './Addresses';
import Settings from './Settings';
import Details from './Details';

const Profile: FC = () => {
  const { data: customerData } = useGetCustomerQuery();

  return (
    <>
      <h2 className={'mb-10'}>Profile Page</h2>

      <div>{JSON.stringify(customerData, null, ' ')}</div>
      <div className={style.wrapper}>
        <div className={style.wrapper_nav}>
          <ul>
            <li>
              <NavLink to='/profile'>My details</NavLink>
            </li>
            <li>
              <NavLink to='/profile/addresses'>My addresses</NavLink>
            </li>
            <li>
              <NavLink to='/profile/settings'>Account settings</NavLink>
            </li>
          </ul>
        </div>
        <div className={style.wrapper_right}>
          <Routes>
            <Route
              index
              element={
                <Details
                  firstNameP={customerData?.firstName}
                  lastNameP={customerData?.lastName}
                  dateOfBirthP={customerData?.dateOfBirth}
                />
              }
            />
            <Route path='/addresses' element={<Addresses />} />
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Profile;
