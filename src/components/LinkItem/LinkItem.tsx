import React from 'react';
import type { FC } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import type { ILinkItem } from 'types/componentTypes';

const LinkItem: FC<ILinkItem> = ({ to, children }) => {
  const isActive = useMatch(to);
  return (
    <NavLink
      to={to}
      className={`flex justify-center items-center 
      min-w-[100px] h-[30px] p-2
      font-medium text-blue-900 
      border-solid border rounded border-blue-950
      transition duration-300 ease-in-out
      ${
        isActive
          ? 'bg-blue-800 text-sky-100 hover:bg-blue-900'
          : 'hover:bg-blue-900 hover:text-sky-100'
      }
      `}
    >
      {children}
    </NavLink>
  );
};

export default LinkItem;
