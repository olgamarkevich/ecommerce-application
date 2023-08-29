import React from 'react';
import type { FC } from 'react';
import { useGetCategoriesQuery } from '../../api/categoryApi';
import { prepareProductAndCategoryQueryParams } from '../../helpers/prepareProductAndCategoryQueryParams';

const Categories: FC = () => {
  const searchParams = new URLSearchParams({ limit: '20', offset: '0' });
  const params = prepareProductAndCategoryQueryParams('', searchParams);
  const { data: categories } = useGetCategoriesQuery(params.toString());

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
