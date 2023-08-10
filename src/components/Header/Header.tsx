import React, { type MouseEventHandler } from 'react';
import type { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import style from './Header.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { logoutCustomer } from '../../store/authSlice';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userType } = useAppSelector((state) => {
    return state.auth;
  });

  const logoutHandler: MouseEventHandler<HTMLAnchorElement> = async (e) => {
    e.preventDefault();
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
            {userType !== 'customer' && (
              <li className={style.nav__link}>
                <NavLink to='/login'>log in</NavLink>
              </li>
            )}
            {userType !== 'customer' && (
              <li className={style.nav__link}>
                <NavLink to='/signup'>sigh up</NavLink>
              </li>
            )}
            {userType === 'customer' && (
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
