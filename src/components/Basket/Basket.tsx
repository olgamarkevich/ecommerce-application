import React, { useState } from 'react';
import type { FC } from 'react';
import { ReactComponent as BasketSVG } from '../../assets/svg/basket.svg';

const Basket: FC = () => {
  const [itemCount] = useState(0);
  return (
    <div>
      {itemCount > 0 && (
        <div className='absolute -top-2 -right-2 z-10 w-5 h-5 rounded-full bg-red-500 text-sky-50 font-f-open-sans text-sm'>
          {itemCount}
        </div>
      )}
      <BasketSVG />
    </div>
  );
};

export default Basket;
