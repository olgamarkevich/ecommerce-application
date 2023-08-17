import React from 'react';
import type { FC } from 'react';
import type { IButton } from 'types/componentTypes';

const ButtonSubmit: FC<IButton> = ({ text, onClick }) => {
  return (
    <button
      className='py-1 px-4 min-w-[100px]
      border border-solid rounded-xl border-purple-950
      font-medium text-stone-700
      transition duration-300 ease-in-out
      hover:bg-c-sky-green hover:text-stone-950
      '
      type='submit'
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonSubmit;
