import React, { type FC } from 'react';
import { useMatches } from 'react-router-dom';

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
    <ul className={'flex px-3 text-xs text-blue-900'}>
      {crumbs.map((crumb, index) => {
        return (
          <li key={index}>
            {crumb}
            {index === crumbs.length - 1 ? '' : ' \u21D2'}
          </li>
        );
      })}
    </ul>
  );
};

export default Breadcrumbs;
