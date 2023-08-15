import React from 'react';
import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

import style from './Header.module.css';
import LogoLink from 'components/Logo/Logo';

const Header: FC = () => {
  return (
    <header className={style.header}>
      <div>
        {' '}
        <LogoLink to='/' />
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
