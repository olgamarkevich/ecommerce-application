import ProductCard from 'components/ProductCard/ProductCard';
import React from 'react';
import type { FC } from 'react';
import { productsList } from 'types/testData';

const Main: FC = () => {
  return (
    <>
      <h1 className={'text-xl mb-20'}>Main page</h1>
      <ProductCard products={productsList} title='TEST DATA' />
    </>
  );
};

export default Main;
