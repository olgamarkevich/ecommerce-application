import React from 'react';
import type { FC } from 'react';
import LinkItem from 'components/LinkItem/LinkItem';
import style from './RightNav.module.css';
import LinkButtons from '../LinkButtons/LinkButtons';

const RightNav: FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <ul
      className={`${style.ul} ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      onClick={(e: React.MouseEvent) => {
        if (isOpen && e.target === e.currentTarget) {
          e.stopPropagation();
        }
      }}
    >
      <LinkButtons className='md-min:hidden' />
      <li className={style.nav__link}>
        <LinkItem to='/products/all?page=1'>Catalog</LinkItem>
      </li>
    </ul>
  );
};

export default RightNav;
