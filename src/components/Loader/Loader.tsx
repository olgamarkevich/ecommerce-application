import React from 'react';
import type { FC } from 'react';
import { ReactComponent as LoaderSVG } from '../../assets/svg/loader.svg';

const Loader: FC = () => {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-screen overflow-hidden z-50 flex items-center justify-center backdrop-blur-sm'>
      <LoaderSVG />
    </div>
  );
};

export default Loader;
