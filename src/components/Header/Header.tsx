import React from 'react';
import type { FC } from 'react';
import LogoLink from 'components/Logo/Logo';
import BurgerMenu from 'components/Header/BurgerMenu/BurgerMenu';
import style from './Header.module.css';
import LinkButtons from './LinkButtons/LinkButtons';

const Header: FC = () => {
  return (
    <header className={`${style.header} bg-sky-200 shadow-md justify-center`}>
      <div>
        {' '}
        <LogoLink to='/' />
      </div>
      <div className='p-2'>
        <nav className={style.nav}>
          <BurgerMenu />
          <LinkButtons className='md:hidden' />
        </nav>
      </div>
    </header>
  );
};

export default Header;
