import React, { type MouseEventHandler } from 'react';
import type { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import style from './Header.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { removeCustomer } from '../../store/customerSlice';
import { logoutCustomer } from '../../store/authSlice';
import { setAuthorizationState } from '../../store/appSlice';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useAppSelector((state) => {
    return state.customer;
  });

  const logoutHandler: MouseEventHandler = async (e) => {
    e.preventDefault();
    dispatch(removeCustomer());
    dispatch(setAuthorizationState(false));
    await dispatch(logoutCustomer());
    navigate('/');
  };

  return (
    <header className={style.header}>
      <div className={style.logo}>
        {' '}
        <NavLink to='/'>Logo</NavLink>
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
                <NavLink to='/signup'>sigh up</NavLink>
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
