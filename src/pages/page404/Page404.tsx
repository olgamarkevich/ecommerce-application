import React from 'react';
import type { FC } from 'react';
import Lottie from 'react-lottie';
import loader from './loader404.json';
import style from './Page404.module.css';
import TextInfo from 'components/TextInfo/TextInfo';

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
      <span className=' font-bold text-2xl text-cyan-900'>Page not found</span>
      <TextInfo
        text="Sorry, the page you're looking for doesn't exist. Please check the URL or return to the homepage."
        className='font-light text-xs text-cyan-800'
      />
    </div>
  );
};

export default Page404;
