import React from 'react';
import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import type { ILinkItem } from 'types/componentTypes';

const NavLinkItem: FC<ILinkItem> = ({ to, className, children }) => {
  return (
    <NavLink
      to={to}
      className={`flex justify-center items-center 
      bg-clip-text text-transparent ${className}`}
    >
      {children}
    </NavLink>
  );
};

export default NavLinkItem;
