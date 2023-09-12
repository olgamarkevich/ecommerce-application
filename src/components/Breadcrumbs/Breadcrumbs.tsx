import React, { type FC } from 'react';
import { useMatches } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs: FC = () => {
  const matches = useMatches();
  const crumbs = matches
    .filter((match) => {
      return Boolean(
        match.handle &&
          typeof match.handle === 'object' &&
          'crumb' in match.handle &&
          match.handle.crumb,
      );
    })
    .map((match) => {
      return (
        match.handle &&
        typeof match.handle === 'object' &&
        'crumb' in match.handle &&
        typeof match.handle.crumb === 'function' &&
        match.handle.crumb(match.params)
      );
    });

  return (
    <ul className={'flex items-center my-2 px-3 text-xs text-blue-950'}>
      {crumbs.map((crumb, index) => {
        return (
          <>
            <li
              key={index}
              className={`breadcrumbs-li ${
                index === crumbs.length - 1 ? '' : 'breadcrumbs-split-line'
              }`}
            >
              {crumb}
            </li>
          </>
        );
      })}
    </ul>
  );
};

export default Breadcrumbs;
