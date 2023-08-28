import React from 'react';
import Loader from '../../components/Loader/Loader';
import type { FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { prepareCatalogQueryParams } from '../../helpers/prepareCatalogQueryParams';
import { useGetProductsQuery } from '../../api/productApi';
import { useGetCategoriesQuery } from '../../api/categoryApi';
import { prepareProductAndCategoryQueryParams } from '../../helpers/prepareProductAndCategoryQueryParams';
import { useAppSelector } from '../../hooks/hooks';
import ProductCard from '../../components/ProductCard/ProductCard';

const Catalog: FC = () => {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const { accessToken } = useAppSelector((state) => {
    return state.auth;
  });

  const categoryQueryParams = prepareProductAndCategoryQueryParams(
    categorySlug || 'all',
  );

  const {
    data: category,
    isError: isCategoryError,
    isLoading: isCategoryLoading,
  } = useGetCategoriesQuery(categoryQueryParams.toString(), {
    skip: !accessToken.length,
  });

  let params = new URLSearchParams();

  if (category && category.results.length) {
    params = prepareCatalogQueryParams(category.results[0].id, searchParams);
  }

  const {
    data: products,
    isError: isProductError,
    isLoading: isProductLoading,
  } = useGetProductsQuery(params.toString(), {
    skip: !category?.results[0]?.id || !params.has('where'),
  });

  if (isCategoryLoading || isProductLoading) {
    return <Loader />;
  }

  if (isCategoryError || isProductError) {
    return (
      <>
        <h3>Server error! Try later...</h3>
      </>
    );
  }

  if (
    (products && !products.results.length) ||
    (category && !category.results.length)
  ) {
    return (
      <>
        <h2 className={'mb-10'}>Products Catalogs Page</h2>
        <h3>No products matching!</h3>
      </>
    );
  }

  return (
    <>
      <h2 className={'mb-10'}>Products Catalogs Page</h2>
      {categorySlug && <div>Chosen CategoryKey: {categorySlug}</div>}
      {searchParams && <div>SearchParams: {searchParams.toString()}</div>}
      <h3 className={'my-10'}>Products</h3>
      {products && <div>Limit: {products.limit}</div>}
      {products && <div>Offset: {products.offset}</div>}
      {products && <div>Count: {products.count}</div>}
      {products && <div>Total: {products.total}</div>}
      {products && (
        <ProductCard products={products.results} title={'Products'} />
      )}
    </>
  );
};

export default Catalog;
