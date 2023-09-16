import React from 'react';
import type { FC } from 'react';
import LinkItem from 'components/LinkItem/LinkItem';
import style from './RightNav.module.css';
import LinkButtons from '../LinkIconButtons/LinkIconButtons';

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
      <LinkButtons className='right-nav md-min:hidden justify-around w-full mb-2' />
      <li className={style.nav__link}>
        <LinkItem to='/products/all?page=1' className='bg-sky-100'>
          Catalog
        </LinkItem>
      </li>
    </ul>
  );
};

export default RightNav;
