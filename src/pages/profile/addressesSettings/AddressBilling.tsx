import React, { useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import style from '../Profile.module.css';
import type { Customer } from '@commercetools/platform-sdk';
import { useAppDispatch } from 'hooks/hooks';
import { useUpdateCustomerQuery } from 'api/customerApi';
import { checkServerErrorMsg } from 'helpers/typesHelpers';
import { showTextInfo } from 'store/appSlice';
import Loader from 'components/Loader/Loader';

interface Props {
  isBilling: boolean;
  id: string;
  version: number;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer>>;
}

interface FormData {
  idProps: string | undefined;
  action: 'addBillingAddressId' | 'removeBillingAddressId';
}

const AddressBilling: FC<Props> = ({
  isBilling,
  id,
  version,
  setCustomerData,
}) => {
  const dispatch = useAppDispatch();
  const [serverErrorMsg, setServerErrorMsg] = useState('');

  const defaultFormData = useMemo<FormData>(() => {
    return {
      idProps: '',
      action: 'addBillingAddressId',
    };
  }, []);

  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const {
    data: customerData,
    isLoading,
    error: serverError,
  } = useUpdateCustomerQuery(
    {
      version,
      actions: [
        {
          action: formData.action,
          addressId: formData.idProps,
        },
      ],
    },
    {
      skip: !!serverErrorMsg || formData.idProps === '',
    },
  );
  useEffect(() => {
    if (customerData) {
      setCustomerData(customerData);
      if (isBilling) {
        dispatch(showTextInfo('Billing address added'));
      } else {
        dispatch(showTextInfo('Billing address removed'));
      }
      setFormData(defaultFormData);
    }
  }, [customerData, defaultFormData, dispatch, isBilling, setCustomerData]);

  useEffect(() => {
    if (serverError) {
      if (checkServerErrorMsg(serverError)) {
        setServerErrorMsg(serverError.data.message);
      } else {
        setServerErrorMsg('Server error. Please, try later...');
      }
      setFormData(defaultFormData);
    }
  }, [defaultFormData, serverError]);

  const addBillingAddress = () => {
    setServerErrorMsg('');
    setFormData({ idProps: id, action: 'addBillingAddressId' });
  };

  const removeBillingAddress = () => {
    setServerErrorMsg('');
    setFormData({ idProps: id, action: 'removeBillingAddressId' });
  };

  return (
    <>
      {isLoading && <Loader />}
      {isBilling ? (
        <div className={style.chosen} onClick={removeBillingAddress} />
      ) : (
        <div className={style.noChosen} onClick={addBillingAddress} />
      )}
    </>
  );
};

export default AddressBilling;
