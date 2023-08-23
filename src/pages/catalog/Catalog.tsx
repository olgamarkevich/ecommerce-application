import React from 'react';
import type { FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../api/productApi';

const Catalog: FC = () => {
  const { categoryKey } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  if (!searchParams) setSearchParams({ param3: 'three' });

  const { data: products } = useGetProductsQuery({ limit: 12, offset: 0 });

  return (
    <>
      <h2 className={'mb-10'}>Products Catalogs Page</h2>
      {categoryKey && <div>Chosen CategoryKey: {categoryKey}</div>}
      {searchParams && <div>SearchParams: {searchParams}</div>}
      <h3 className={'my-10'}>Products</h3>
      {products && <div>Limit: {products.limit}</div>}
      {products && <div>Offset: {products.offset}</div>}
      {products && <div>Count: {products.count}</div>}
      {products && <div>Total: {products.total}</div>}
      {products &&
        products.results.map((item) => {
          return (
            <div key={item.id} className={'my-10'}>
              {JSON.stringify(item)}
            </div>
          );
        })}
    </>
  );
};

export default Catalog;
