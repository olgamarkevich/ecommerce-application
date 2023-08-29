import React, { useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import style from '../Profile.module.css';
import { checkServerErrorMsg } from 'helpers/typesHelpers';
import { showTextInfo } from 'store/appSlice';
import { useUpdateCustomerQuery } from 'api/customerApi';
import Loader from 'components/Loader/Loader';
import { useAppDispatch } from 'hooks/hooks';
import type { Customer } from '@commercetools/platform-sdk';

interface Props {
  isDefaultShipping: boolean;
  id: string;
  version: number;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer | null>>;
}

interface FormData {
  idProps: string | undefined;
}

const AddressDefaultShipping: FC<Props> = ({
  isDefaultShipping,
  id,
  version,
  setCustomerData,
}) => {
  const dispatch = useAppDispatch();
  const [serverErrorMsg, setServerErrorMsg] = useState('');

  const defaultFormData = useMemo<FormData>(() => {
    return {
      idProps: '',
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
          action: 'setDefaultShippingAddress',
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
      dispatch(showTextInfo('Default shipping address set'));
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

  const setDefaultAddress = () => {
    setServerErrorMsg('');
    setFormData({ idProps: id });
  };

  return (
    <>
      {isLoading && <Loader />}
      {isDefaultShipping ? (
        <div className={style.chosenRadio} onClick={setDefaultAddress} />
      ) : (
        <div className={style.noChosenRadio} onClick={setDefaultAddress} />
      )}
    </>
  );
};

export default AddressDefaultShipping;
