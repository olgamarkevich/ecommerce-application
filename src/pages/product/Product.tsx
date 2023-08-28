import React from 'react';
import Loader from '../../components/Loader/Loader';
import type { FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../api/productApi';
import { prepareProductAndCategoryQueryParams } from '../../helpers/prepareProductAndCategoryQueryParams';
import { useAppSelector } from '../../hooks/hooks';

const Product: FC = () => {
  const { productSlug } = useParams();
  const [searchParams] = useSearchParams();
  const { accessToken } = useAppSelector((state) => {
    return state.auth;
  });

  const params = prepareProductAndCategoryQueryParams(
    productSlug || '',
    searchParams,
  );

  const {
    data: product,
    isError,
    isLoading,
  } = useGetProductsQuery(params.toString(), { skip: !accessToken.length });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <>
        <h3>Server error! Try later...</h3>
      </>
    );
  }

  if (product && !product.results.length) {
    return (
      <>
        <h2 className={'mb-10'}>Product Details Page</h2>
        <h3>No products find!</h3>
      </>
    );
  }

  return (
    <>
      <h2 className={'mb-10'}>Product Details Page</h2>
      {product && <div>{JSON.stringify(product.results)}</div>}
    </>
  );
};

export default Product;
