import React, { useEffect } from 'react';
import type { FC } from 'react';
import type { IPopUp } from 'types/componentTypes';
import { toast } from 'react-toastify';

const PopUp: FC<IPopUp> = ({ text }) => {
  useEffect(() => {
    toast.success(text, {
      toastId: text,
    });
  }, [text]);

  return (
    <div>
      <></>
    </div>
  );
};

export default PopUp;
