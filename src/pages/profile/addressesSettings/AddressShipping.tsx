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
  isShipping: boolean;
  id: string;
  version: number;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer | null>>;
}

interface FormData {
  idProps: string | undefined;
  action: 'addShippingAddressId' | 'removeShippingAddressId';
}

const AddressShipping: FC<Props> = ({
  isShipping,
  id,
  version,
  setCustomerData,
}) => {
  const dispatch = useAppDispatch();
  const [serverErrorMsg, setServerErrorMsg] = useState('');

  const defaultFormData = useMemo<FormData>(() => {
    return {
      idProps: '',
      action: 'addShippingAddressId',
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
      dispatch(showTextInfo('Shipping address added'));
      setFormData(defaultFormData);
    }
  }, [customerData, defaultFormData, dispatch, setCustomerData]);

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

  const addShippingAddress = () => {
    setServerErrorMsg('');
    setFormData({ idProps: id, action: 'addShippingAddressId' });
  };

  const removeShippingAddress = () => {
    setServerErrorMsg('');
    setFormData({ idProps: id, action: 'removeShippingAddressId' });
  };

  return (
    <>
      {isLoading && <Loader />}
      {isShipping ? (
        <div className={style.chosen} onClick={removeShippingAddress} />
      ) : (
        <div className={style.noChosen} onClick={addShippingAddress} />
      )}
    </>
  );
};

export default AddressShipping;
