import React from 'react';
import type { FC } from 'react';
import type { ILinkItem } from 'types/componentTypes';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';

const LogoLink: FC<Pick<ILinkItem, 'to'>> = ({ to }) => {
  return (
    <NavLink
      to={to}
      className={`flex justify-center items-end
      bg-gradient-to-r from-blue-800 to-c-pink-red
      bg-clip-text text-transparent text-xl`}
    >
      <Logo />
      <span className='font-bold text-2xl tracking-widest'>ECO</span>mmerce
    </NavLink>
  );
};

export default LogoLink;
