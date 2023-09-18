import React from 'react';
import type { FC } from 'react';
import type { ILinkItem } from 'types/componentTypes';

import { NavLink, useMatch } from 'react-router-dom';

import './LinkItemSVG.css';

const LinkItemSVG: FC<ILinkItem> = ({ to, children, onClick }) => {
  const isActive = useMatch(to);
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={`svg-link relative flex fill-blue-800 hover:fill-blue-900 transition duration-300 hover:-translate-y-1 hover:scale-110 ${
        isActive ? 'activeSVG' : ''
      }`}
    >
      {children}
    </NavLink>
  );
};

export default LinkItemSVG;
