import React from 'react';
import type { FC } from 'react';
import type { IButton } from 'types/componentTypes';

const ButtonSubmit: FC<IButton> = ({ text, onClick }) => {
  return (
    <button
      className='
      py-1 px-4 min-w-[100px]
      bg-c-light-blue
      rounded-md
      font-medium text-c-alice-blue
      transition duration-500 ease-in-out
      hover:shadow-custom-inner hover:text-sky-100
      '
      type='submit'
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonSubmit;
