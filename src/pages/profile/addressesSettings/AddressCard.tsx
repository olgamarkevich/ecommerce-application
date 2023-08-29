import React, { useState } from 'react';
import type { FC } from 'react';
import style from '../Profile.module.css';
import type { Customer, Address } from '@commercetools/platform-sdk';
import AddressBilling from './AddressBilling';
import AddressShipping from './AddressShipping';
import AddressDefaultBilling from './AddressDefaultBilling';
import AddressDefaultShipping from './AddressDefaultShipping';
import AddressEdit from './AddressEdit';
import AddressRemove from './AddressRemove';

interface Props {
  address: Address;
  version: number;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer | null>>;
  isBilling: boolean;
  isShipping: boolean;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
}

const AddressCard: FC<Props> = ({
  address,
  version,
  setCustomerData,
  isBilling,
  isShipping,
  isDefaultBilling,
  isDefaultShipping,
}) => {
  const [editMode, setEditMode] = useState(false);

  const handleEditPress = () => {
    editMode ? setEditMode(false) : setEditMode(true);
  };

  return (
    <>
      <div className={style.address_item}>
        <div className={style.address_title}>
          {address.country} / {address.postalCode} / {address.city} /{' '}
          {address.streetName}
        </div>
        <div className={style.addressBS_col}>
          <AddressBilling
            isBilling={isBilling}
            id={address.id}
            version={version}
            setCustomerData={setCustomerData}
          />
        </div>
        <div className={style.addressBS_col}>
          <AddressDefaultBilling
            isDefaultBilling={isDefaultBilling}
            id={address.id}
            version={version}
            setCustomerData={setCustomerData}
          />
        </div>
        <div className={style.addressBS_col}>
          <AddressShipping
            isShipping={isShipping}
            id={address.id}
            version={version}
            setCustomerData={setCustomerData}
          />
        </div>
        <div className={style.addressBS_col}>
          <AddressDefaultShipping
            isDefaultShipping={isDefaultShipping}
            id={address.id}
            version={version}
            setCustomerData={setCustomerData}
          />
        </div>
        <div className={style.address_btn}>
          {!editMode ? (
            <button className={style.edit} onClick={handleEditPress} />
          ) : (
            <button className={style.cancel} onClick={handleEditPress} />
          )}

          <AddressRemove
            id={address.id}
            version={version}
            setCustomerData={setCustomerData}
          />
        </div>
      </div>
      {editMode && (
        <AddressEdit
          address={address}
          version={version}
          setCustomerData={setCustomerData}
          setEditMode={setEditMode}
        />
      )}
    </>
  );
};

export default AddressCard;
