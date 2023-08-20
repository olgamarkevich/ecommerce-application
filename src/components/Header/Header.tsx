import React, { type MouseEventHandler } from 'react';
import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../logo.svg';
import style from './Header.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { removeCustomer } from '../../store/customerSlice';
import { logoutCustomer } from '../../store/authSlice';
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
    <header className={style.header}>
      <div className={style.logo}>
        {' '}
        <NavLink to='/'>
          <Logo />
          ECOmmerce
        </NavLink>
      </div>
      <div className={style.header__left}>
        <nav className={style.nav}>
          <ul>
            {!id && (
              <li className={style.nav__link}>
                <NavLink to='/login'>log in</NavLink>
              </li>
            )}
            {!id && (
              <li className={style.nav__link}>
                <NavLink to='/signup'>sign up</NavLink>
              </li>
            )}
            {!!id && (
              <li className={style.nav__link}>
                <NavLink to='/' onClick={logoutHandler}>
                  Log out
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
