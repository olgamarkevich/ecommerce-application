import React, { useState } from 'react';
import type { FC } from 'react';
import RightNav from '../RightNav/RightNav';

const BurgerMenu: FC = () => {
  const [isOpen, setOpen] = useState(false);
  const childStyle = `
   w-8 h-1 bg-black rounded-xl transform 
   origin-one-origin transition-all duration-300 
   ${isOpen ? 'bg-sky-100' : 'bg-blue-900'}`;

  return (
    <div
      onClick={() => {
        setOpen(!isOpen);
      }}
    >
      <div
        className={`
        ${isOpen ? 'fixed' : 'absolute'}
        hidden w-8 h-8 top-2 right-4 z-20 justify-around flex-col flex-nowrap cursor-pointer md:flex`}
      >
        <div
          className={`
        ${childStyle}
        ${isOpen ? 'rotate-45' : 'rotate-0'}
        `}
        />
        <div
          className={`
        ${childStyle} 
        ${isOpen ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
        `}
        />
        <div
          className={`
        ${childStyle}
        ${isOpen ? '-rotate-45' : 'rotate-0'}
        `}
        />
      </div>
      <div
        className={`${
          isOpen
            ? 'md:absolute top-0 left-0 h-full w-full bg-blend-difference'
            : ''
        }`}
      >
        <RightNav isOpen={isOpen} />
      </div>
    </div>
  );
};

export default BurgerMenu;
