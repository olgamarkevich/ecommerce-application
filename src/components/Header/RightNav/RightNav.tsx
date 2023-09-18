import React from 'react';
import type { FC } from 'react';
import style from './RightNav.module.css';
import LinkButtons from '../LinkIconButtons/LinkIconButtons';
import CategoryButtons from '../CategoryButtons/CategoryButtons';

const RightNav: FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <div
      className={`${style.linkList} ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      onClick={(e: React.MouseEvent) => {
        if (isOpen && e.target === e.currentTarget) {
          e.stopPropagation();
        }
      }}
    >
      <LinkButtons className='right-nav md-min:hidden justify-around w-full mb-2' />
      <CategoryButtons />
    </div>
  );
};

export default RightNav;
