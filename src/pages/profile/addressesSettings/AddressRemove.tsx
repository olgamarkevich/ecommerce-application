import React, { useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import style from '../Profile.module.css';
import { useAppDispatch } from 'hooks/hooks';
import { useUpdateCustomerQuery } from 'api/customerApi';
import type { Customer } from '@commercetools/platform-sdk';
import { showTextInfo } from 'store/appSlice';
import Loader from 'components/Loader/Loader';
import { checkServerErrorMsg } from 'helpers/typesHelpers';

interface Props {
  id: string | undefined;
  version: number;
  setCustomerData: React.Dispatch<React.SetStateAction<Customer | null>>;
}

interface FormData {
  idProps: string | undefined;
}

const AddressRemove: FC<Props> = ({ id, version, setCustomerData }) => {
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
          action: 'removeAddress',
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
      dispatch(showTextInfo('Address removed'));
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

  const removeAddress = () => {
    setServerErrorMsg('');
    setFormData({ idProps: id });
  };
  return (
    <>
      {isLoading && <Loader />}
      <button
        className={style.delete}
        onClick={() => {
          return removeAddress();
        }}
      />
    </>
  );
};

export default AddressRemove;
