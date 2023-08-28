import React from 'react';
import type { FC } from 'react';
import style from './Profile.module.css';
import type { Customer } from '@commercetools/platform-sdk';
import AddressBilling from './AddressBilling';
import AddressShipping from './AddressShipping';
import AddressDefaultBilling from './AddressDefaultBilling';
import AddressDefaultShipping from './AddressDefaultShipping';
import AddressCard from './AddressCard';

interface Props {
  customer: Customer | null;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer | null>>;
}

const Addresses: FC<Props> = ({ customer, setCustomerData }) => {
  console.log(setCustomerData);
  return (
    <div className={style.profile_border}>
      <div className={style.subtitle}>Addresses</div>

      <div className={style.addresses_list}>
        {customer?.addresses.map((address) => {
          return (
            <div key={address.id}>
              <div className={style.address_item}>
                <div className={style.address_title}>
                  {address.country}, {address.postalCode}, {address.city},{' '}
                  {address.streetName}
                </div>
                <div className={style.addressBS_col}>
                  <AddressBilling />
                </div>
                <div className={style.addressBS_col}>
                  <AddressShipping />
                </div>
                <div className={style.addressBS_col}>
                  <AddressDefaultBilling />
                </div>
                <div className={style.addressBS_col}>
                  <AddressDefaultShipping />
                </div>
                <div className={style.address_btn}>
                  <button className={style.edit} />
                  <button className={style.cancel} />
                  <button className={style.delete} />
                </div>
              </div>
              <AddressCard
                address={address}
                setCustomerData={setCustomerData}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Addresses;
