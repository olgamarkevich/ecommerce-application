import React from 'react';
import Loader from '../../components/Loader/Loader';
import type { FC } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../api/productApi';
import { prepareProductAndCategoryQueryParams } from '../../helpers/prepareProductAndCategoryQueryParams';
import { useAppSelector } from '../../hooks/hooks';
import ProductCard from 'components/ProductCard/ProductCard';

const Product: FC = () => {
  const { productSlug } = useParams();
  const { accessToken } = useAppSelector((state) => {
    return state.auth;
  });

  const params = prepareProductAndCategoryQueryParams(productSlug || '');

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
        <NavLink to='/products/all'>Return to Catalog</NavLink>
      </>
    );
  }

  if (product && !product.results.length) {
    return (
      <>
        <h3>No products find!</h3>
        <NavLink to='/products/all'>Return to Catalog</NavLink>
      </>
    );
  }

  return <>{product && <ProductCard product={product.results[0]} />}</>;
};

export default Product;
