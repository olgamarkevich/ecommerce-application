import React from 'react';
import type { FC } from 'react';
import Lottie from 'react-lottie';
import loader from './loader404.json';
import style from './Page404.module.css';

const Page404: FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loader,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className={style.notFoundImg}>
      <Lottie options={defaultOptions} height='max-content' />
    </div>
  );
};

export default Page404;
