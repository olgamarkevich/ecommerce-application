import React from 'react';
import type { FC } from 'react';
import { ReactComponent as BasketSVG } from '../../assets/svg/basket.svg';
import { useAppSelector } from '../../hooks/hooks';

const Basket: FC = () => {
  const { totalProductsQuantity } = useAppSelector((state) => {
    return state.cart;
  });

  return (
    <div>
      {!!totalProductsQuantity && totalProductsQuantity > 0 && (
        <div className='absolute -top-2 -right-2 z-5 w-5 h-5 rounded-full bg-red-500 text-sky-50 font-f-open-sans text-sm'>
          {totalProductsQuantity}
        </div>
      )}
      <BasketSVG />
    </div>
  );
};

export default Basket;
