import React from 'react';
import type { FC } from 'react';
import { useLottie } from 'lottie-react';
import loader from './loader404.json';
import style from './Page404.module.css';

const Page404: FC = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: loader,
  };
  const { View } = useLottie(options);

  return <div className={style.notFoundImg}>{View}</div>;
};

export default Page404;
