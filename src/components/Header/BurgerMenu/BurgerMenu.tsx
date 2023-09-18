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
        ${isOpen ? 'fixed hover:drop-shadow-drop' : 'absolute'}
        w-8 h-8 top-4 left-4 z-20 justify-around flex-col flex-nowrap cursor-pointer flex
        transition-all duration-500`}
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
            ? 'fixed top-0 left-0 h-screen w-full bg-blend-difference bg-black bg-opacity-50 z-10'
            : ''
        } transition-all duration-500`}
      >
        <RightNav isOpen={isOpen} />
      </div>
    </div>
  );
};

export default BurgerMenu;
