import React from 'react';
import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

import style from './Header.module.css';

const Header: FC = () => {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        {' '}
        <NavLink to='/'>Logo</NavLink>
      </div>
      <div className={style.haeder__left}>
        <nav className={style.nav}>
          <ul>
            <li className={style.nav__link}>
              <NavLink to='/log-in'>log in</NavLink>
            </li>
            <li className={style.nav__link}>
              <NavLink to='/sign-up'>sigh up</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
