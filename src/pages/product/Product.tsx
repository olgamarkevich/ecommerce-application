import React from 'react';
import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../api/productApi';

const Product: FC = () => {
  const { productSlug } = useParams();
  const { data: product } = useGetProductsQuery({
    where: `slug(en="${productSlug}")`,
    limit: 1,
  });

  return (
    <>
      <h2 className={'mb-10'}>Product Details Page</h2>
      {product && <div>{JSON.stringify(product.results)}</div>}
    </>
  );
};

export default Product;
