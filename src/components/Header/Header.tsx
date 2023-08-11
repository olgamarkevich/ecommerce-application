import React, { type MouseEventHandler } from 'react';
import type { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import style from './Header.module.css';
import { useAppDispatch } from '../../hooks/hooks';
import { logoutCustomer } from '../../store/authSlice';

const Header: FC<{ isLogin: boolean }> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLogin } = props;

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
            {!isLogin && (
              <li className={style.nav__link}>
                <NavLink to='/login'>log in</NavLink>
              </li>
            )}
            {!isLogin && (
              <li className={style.nav__link}>
                <NavLink to='/signup'>sigh up</NavLink>
              </li>
            )}
            {isLogin && (
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
