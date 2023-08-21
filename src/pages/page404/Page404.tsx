import React from 'react';
import type { FC } from 'react';
import { useLottie } from 'lottie-react';
import loader from './loader404.json';
import TextInfo from 'components/TextInfo/TextInfo';

const Page404: FC = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: loader,
  };
  const { View } = useLottie(options);

  return (
    <div className='block mx-auto max-w-100vh'>
      {View}
      <span className=' font-bold text-2xl text-cyan-900'>Page not found</span>
      <TextInfo
        text="Sorry, the page you're looking for doesn't exist. Please check the URL or return to the homepage."
        className='font-light text-xs text-cyan-800'
      />
    </div>
  );
};

export default Page404;
