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
  isDefaultBilling: boolean;
  id: string;
  version: number;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer>>;
}

interface FormData {
  idProps: string | undefined;
}

const AddressDefaultBilling: FC<Props> = ({
  isDefaultBilling,
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
          action: 'setDefaultBillingAddress',
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
      dispatch(showTextInfo('Default billing address set'));
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
      {isDefaultBilling ? (
        <div className={style.chosenRadio} onClick={setDefaultAddress} />
      ) : (
        <div className={style.noChosenRadio} onClick={setDefaultAddress} />
      )}
    </>
  );
};

export default AddressDefaultBilling;
