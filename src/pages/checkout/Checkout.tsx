import React, { type FC } from 'react';
import Fireworks from '@fireworks-js/react';

const Checkout: FC = () => {
  return (
    <div className={'relative'}>
      <Fireworks className={'h-70vh'} />
      <div
        className={
          'absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center'
        }
      >
        <div className={'max-w-little-xs bg-transparent rounded-md'}>
          <h3 className={'p-2 text-5xl text-c-pink-red font-bold'}>
            Thank you for Review!
          </h3>
          <h3 className={'p-2 text-3xl text-c-pink-red font-bold'}>
            Good Luck in your study :)
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
