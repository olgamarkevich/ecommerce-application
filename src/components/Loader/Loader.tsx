import React from 'react';
import type { FC } from 'react';
import { ReactComponent as LoaderSVG } from '../../assets/svg/loader.svg';

const Loader: FC = () => {
  return (
    <div className='flex items-center justify-center'>
      <LoaderSVG />
    </div>
  );
};

export default Loader;
