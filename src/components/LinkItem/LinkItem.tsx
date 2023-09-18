import React from 'react';
import type { FC } from 'react';
import type { ILinkItem } from 'types/componentTypes';

import { NavLink, useMatch } from 'react-router-dom';
import styles from './LinkItem.module.css';

const LinkItem: FC<ILinkItem> = ({ to, children, onClick, className }) => {
  const isActive = useMatch(to);
  return (
    <NavLink
      to={to}
      className={`
      relative flex justify-center items-center 
      min-w-[100px] h-[30px] p-2
      font-medium text-blue-900 
      border-solid border rounded border-blue-950
      transition duration-300 ease-in-out
      hover:shadow-md transform hover:-translate-y-1
      ${
        isActive
          ? 'bg-blue-800 text-sky-100 hover:bg-blue-900'
          : `hover:bg-blue-900 hover:text-sky-100 Link_media ${styles.link_media}`
      }
      ${className}
      `}
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
};

export default LinkItem;
