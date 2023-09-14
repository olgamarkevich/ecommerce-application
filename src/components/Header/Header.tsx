import React from 'react';
import type { FC } from 'react';
import LogoLink from 'components/Logo/Logo';
import BurgerMenu from 'components/Header/BurgerMenu/BurgerMenu';
import style from './Header.module.css';

const Header: FC = () => {
  return (
    <header
      className={`${style.header} bg-sky-200 shadow-md md:justify-center`}
    >
      <div>
        {' '}
        <LogoLink to='/' />
      </div>
      <div className='p-2'>
        <nav className={style.nav}>
          <BurgerMenu />
        </nav>
      </div>
    </header>
  );
};

export default Header;
