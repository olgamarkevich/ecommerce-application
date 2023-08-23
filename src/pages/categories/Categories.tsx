import React from 'react';
import type { FC } from 'react';
import { useGetCategoriesQuery } from '../../api/categoryApi';

const Categories: FC = () => {
  const { data: categories } = useGetCategoriesQuery({ limit: 20, offset: 0 });

  return (
    <>
      <h2 className={'mb-10'}>Categories Page</h2>
      {categories &&
        categories.results.map((item) => {
          return (
            <div key={item.id} className={'my-5'}>
              {JSON.stringify(item)}
            </div>
          );
        })}
    </>
  );
};

export default Categories;
