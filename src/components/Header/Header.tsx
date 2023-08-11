import React from 'react';
import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../logo.svg';

import style from './Header.module.css';

const Header: FC = () => {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        {' '}
        <NavLink to='/'>
          <Logo />
          ECOmmerce
        </NavLink>
      </div>
      <div className={style.haeder__left}>
        <nav className={style.nav}>
          <ul>
            <li className={style.nav__link}>
              <NavLink to='/login'>log in</NavLink>
            </li>
            <li className={style.nav__link}>
              <NavLink to='/signup'>sigh up</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
