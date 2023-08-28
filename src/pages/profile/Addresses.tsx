import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import style from './Profile.module.css';
import type { Customer } from '@commercetools/platform-sdk';
import AddressCard from './AddressCard';
import { useUpdateCustomerQuery } from 'api/customerApi';
import Loader from 'components/Loader/Loader';

import TextInfo from 'components/TextInfo/TextInfo';
import { showTextInfo } from 'store/appSlice';
import { useAppDispatch } from 'hooks/hooks';

interface Props {
  customer: Customer | null;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer | null>>;
}

const Addresses: FC<Props> = ({ customer, setCustomerData }) => {
  const [addressItem, setAddressItem] = useState({});
  const [serverErrorMsg, setServerErrorMsg] = useState('');
  const dispatch = useAppDispatch();

  const {
    data: customerData,
    isLoading,
    error: serverError,
  } = useUpdateCustomerQuery(
    {
      version: customer?.version || 0,
      actions: [
        {
          action: 'changeAddress',
          addressId: addressItem.id,
          address: {
            streetName: addressItem.street,
            postalCode: addressItem.postalCode,
            city: addressItem.city,
            country: addressItem.country,
          },
        },
      ],
    },
    {
      skip: customer === null || addressItem.country == '',
    },
  );

  useEffect(() => {
    if (customerData) {
      setCustomerData(customerData);
      dispatch(showTextInfo('Personal information updated'));
    }
  }, [customerData, dispatch, setCustomerData]);

  useEffect(() => {
    console.log(addressItem);
  }, [addressItem]);

  useEffect(() => {
    if (serverError) {
      if (checkServerErrorMsg(serverError)) {
        setServerErrorMsg(serverError.data.message);
      } else {
        setServerErrorMsg('Server error. Please, try later...');
      }
      setAddressItem(addressItem);
    }
    console.log(addressItem);
  }, [addressItem, serverError]);

  return (
    <div className={style.profile_border}>
      {isLoading && <Loader />}
      <div className={style.subtitle}>Addresses</div>
      {serverErrorMsg && <TextInfo text={serverErrorMsg} type='warn' />}
      <div className={style.addresses_list}>
        <div className='columns-2'>
          {customer?.addresses.map((address) => {
            return (
              <AddressCard
                key={address.id}
                address={address}
                setAddressItem={setAddressItem}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Addresses;

const checkServerErrorMsg = (
  err: object,
): err is { data: { message: string } } => {
  return (
    'data' in err &&
    typeof err.data === 'object' &&
    err.data !== null &&
    'message' in err.data
  );
};
