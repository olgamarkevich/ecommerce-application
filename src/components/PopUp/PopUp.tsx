import React from 'react';
import type { FC } from 'react';
import type { IPopUp } from 'types/componentTypes';
import { useAppDispatch } from '../../hooks/hooks';
import { setTextInfo } from '../../store/appSlice';

const PopUp: FC<IPopUp> = ({ text, isOnView }) => {
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    dispatch(setTextInfo({ msgText: text, isOnView: false }));
  };

  return (
    <div
      className={`${
        isOnView ? 'translate-x-0' : 'translate-x-[150%]'
      } fixed top-12 right-1 p-1 rounded-sm opacity-60 hover:opacity-75 font-medium text-c-alice-blue bg-blue-700 transition cursor-pointer`}
      onClick={clickHandler}
    >{`${text} \u274C`}</div>
  );
};

export default PopUp;
