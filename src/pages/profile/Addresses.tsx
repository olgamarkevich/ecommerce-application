import React from 'react';
import type { FC } from 'react';
import type { Customer } from '@commercetools/platform-sdk';

import style from './Profile.module.css';
import AddressCard from './addressesSettings/AddressCard';
import AddressAdd from './addressesSettings/AddressAdd';

interface Props {
  customer: Customer | null;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer>>;
}

const Addresses: FC<Props> = ({ customer, setCustomerData }) => {
  return (
    <div className={style.profile_border}>
      <div className={style.subtitle}>Addresses</div>

      <div className={style.addresses_list}>
        {customer !== null && customer.addresses.length > 0 && (
          <div className={style.addresses_list_head}>
            <div className={style.address_title}>
              Country/postal code/city/street
            </div>
            <div className={style.addressBS_col}>Billing</div>
            <div className={style.addressBS_col}>Default Billing</div>
            <div className={style.addressBS_col}>Shipping</div>
            <div className={style.addressBS_col}>Default Shipping</div>
            <div className={style.address_btn} />
          </div>
        )}

        {customer?.addresses.map((address) => {
          return (
            <AddressCard
              isBilling={
                !!(
                  address.id && customer.billingAddressIds?.includes(address.id)
                )
              }
              isShipping={
                !!(
                  address.id &&
                  customer.shippingAddressIds?.includes(address.id)
                )
              }
              isDefaultBilling={customer.defaultBillingAddressId == address.id}
              isDefaultShipping={
                customer.defaultShippingAddressId == address.id
              }
              key={address.id}
              address={address}
              version={customer?.version || 0}
              setCustomerData={setCustomerData}
            />
          );
        })}
      </div>
      <AddressAdd
        version={customer?.version || 0}
        setCustomerData={setCustomerData}
      />
    </div>
  );
};

export default Addresses;
