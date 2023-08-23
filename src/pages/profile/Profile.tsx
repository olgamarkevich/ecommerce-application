import React from 'react';
import type { FC } from 'react';
import { useGetCustomerQuery } from '../../api/customerApi';

const Profile: FC = () => {
  const { data: customerData } = useGetCustomerQuery();

  return (
    <>
      <h2 className={'mb-10'}>User Profile Page</h2>
      <div>{JSON.stringify(customerData, null, ' ')}</div>
    </>
  );
};

export default Profile;
