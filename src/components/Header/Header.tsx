import React from 'react';
import type { FC } from 'react';

import style from './Header.module.css';
import LogoLink from 'components/Logo/Logo';
import LinkItem from 'components/LinkItem/LinkItem';

const Header: FC = () => {
  return (
    <header className={`bg-sky-100 shadow-md ${style.header}`}>
      <div>
        {' '}
        <LogoLink to='/' />
      </div>
      <div className={style.header__left}>
        <nav className={style.nav}>
          <ul>
            <li className={style.nav__link}>
              <LinkItem to='/login'>log in</LinkItem>
            </li>
            <li className={style.nav__link}>
              <LinkItem to='/signup'>sigh up</LinkItem>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
