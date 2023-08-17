import React from 'react';
import type { FC } from 'react';
import type { IButton } from 'types/componentTypes';

const ButtonSubmit: FC<IButton> = ({ text, onClick }) => {
  return (
    <button
      className='
      py-1 px-4 min-w-[100px]
      bg-sky-100
      border border-solid rounded-md border-purple-950
      font-medium text-stone-700
      transition duration-500 ease-in-out
      hover:shadow-custom-inner hover:text-c-alice-blue
      '
      type='submit'
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonSubmit;
