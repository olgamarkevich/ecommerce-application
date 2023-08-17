import React from 'react';
import type { FC } from 'react';
import type { ILinkItem } from 'types/componentTypes';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';

const LogoLink: FC<Pick<ILinkItem, 'to'>> = ({ to }) => {
  return (
    <NavLink
      to={to}
      className={`flex justify-center items-center 
      bg-gradient-to-r from-blue-800 to-c-pink-red
      bg-clip-text text-transparent`}
    >
      <Logo />
      <span className='font-extrabold text-xl '>ECO</span>mmerce
    </NavLink>
  );
};

export default LogoLink;
