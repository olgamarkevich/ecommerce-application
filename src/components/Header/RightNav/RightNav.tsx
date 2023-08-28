import React, { type MouseEventHandler } from 'react';
import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { removeCustomer } from '../../../store/customerSlice';
import { logoutCustomer } from '../../../store/authSlice';
import {
  setAuthorizationState,
  setCustomerLoggedState,
} from '../../../store/appSlice';

import LinkItem from 'components/LinkItem/LinkItem';
import style from './RightNav.module.css';

const RightNav: FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const dispatch = useAppDispatch();
  const { isCustomerLogged } = useAppSelector((state) => {
    return state.app;
  });

  const logoutHandler: MouseEventHandler = async (e) => {
    e.preventDefault();
    dispatch(setAuthorizationState(false));
    await dispatch(logoutCustomer());
    dispatch(removeCustomer());
    dispatch(setCustomerLoggedState(false));
  };

  return (
    <ul
      className={`${style.ul} ${
        isOpen ? 'md:translate-x-0' : 'md:translate-x-full'
      }`}
      onClick={(e: React.MouseEvent) => {
        if (isOpen && e.target === e.currentTarget) {
          e.stopPropagation();
        }
      }}
    >
      <li className={style.nav__link}>
        <LinkItem to='/categories'>Categories</LinkItem>
      </li>
      <li className={style.nav__link}>
        <LinkItem to='/products/all?page=1'>Catalog</LinkItem>
      </li>
      <li className={style.nav__link}>
        <LinkItem to='/product/toothpaste-tablets-w-fluoride'>Product</LinkItem>
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
  );
};

export default RightNav;
