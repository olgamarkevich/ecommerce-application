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

      <li className={style.nav__link}>
        <LinkItem to='/products/all?page=1'>Catalog</LinkItem>
      </li>
      <li className={style.nav__link}>
        <LinkItem to='/about_us'>About us</LinkItem>
      </li>
      {!isCustomerLogged && (
        <li className={style.nav__link}>
          <LinkItem to='/login'>log in</LinkItem>
        </li>
      )}
      {!isCustomerLogged && (
        <li className={style.nav__link}>
          <LinkItem to='/signup'>sign up</LinkItem>
        </li>
      )}
      {isCustomerLogged && (
        <li className={style.nav__link}>
          <LinkItem to='/profile'>Profile</LinkItem>
        </li>
      )}
      {isCustomerLogged && (
        <li className={style.nav__link}>
          <LinkItem to='/' onClick={logoutHandler}>
            log out
          </LinkItem>
        </li>
      )}
    </ul>
      <LinkButtons className='right-nav md-min:hidden justify-around w-full mb-2' />
      <CategoryButtons />
    </div>

  );
};

export default RightNav;
