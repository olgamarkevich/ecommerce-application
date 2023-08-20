import React, { type MouseEventHandler } from 'react';
import type { FC } from 'react';
import style from './Header.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { removeCustomer } from '../../store/customerSlice';
import { logoutCustomer } from '../../store/authSlice';
import LogoLink from 'components/Logo/Logo';
import LinkItem from 'components/LinkItem/LinkItem';
import {
  setAuthorizationState,
  setCustomerLoggedState,
} from '../../store/appSlice';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => {
    return state.customer;
  });

  const logoutHandler: MouseEventHandler = async (e) => {
    e.preventDefault();
    dispatch(setAuthorizationState(false));
    await dispatch(logoutCustomer());
    dispatch(removeCustomer());
    dispatch(setCustomerLoggedState(false));
  };

  return (
    <header className={`bg-sky-100 shadow-md ${style.header}`}>
      <div>
        {' '}
        <LogoLink to='/' />
      </div>
      <div className={style.header__left}>
        <nav className={style.nav}>
          <ul>
            {!id && (
              <li className={style.nav__link}>
                <LinkItem to='/login'>log in</LinkItem>
              </li>
            )}
            {!id && (
              <li className={style.nav__link}>
                <LinkItem to='/signup'>sigh up</LinkItem>
              </li>
            )}
            {!!id && (
              <li className={style.nav__link}>
                <LinkItem to='/' onClick={logoutHandler}>
                  Log out
                </LinkItem>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
