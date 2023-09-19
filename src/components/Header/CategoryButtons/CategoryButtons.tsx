import React, { useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import type { FC } from 'react';
import type { CategoryTreeSource } from 'types/storeTypes';
import { useGetCategoriesQuery } from 'api/categoryApi';
import {
  checkCategoryChildren,
  getCategoryItems,
  markCategoryActive,
  markCategoryOpen,
} from 'helpers/categoryTreeHelpers';
import { setCategories, setIsActive, setIsOpen } from 'store/catalogSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { prepareCatalogQueryParams } from 'helpers/prepareCatalogQueryParams';
import Title from 'components/Title/Title';

const CategoryButtons: FC = () => {
  const dispatch = useAppDispatch();
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { userType } = useAppSelector((state) => {
    return state.auth;
  });
  const { categories } = useAppSelector((state) => {
    return state.catalog;
  });

  if (!searchParams) setSearchParams();
  const categoryQueryParams = prepareCatalogQueryParams('', searchParams);

  const { data } = useGetCategoriesQuery(categoryQueryParams.toString(), {
    skip: !userType || !!categories.length,
  });

  useEffect(() => {
    if (data && !categories.length) {
      const newCategories: CategoryTreeSource[] = [];
      getCategoryItems(data.results, newCategories, null, 1);
      markCategoryActive(newCategories, categorySlug || 'all');
      markCategoryOpen(newCategories);
      checkCategoryChildren(newCategories);
      dispatch(setCategories(newCategories));
    }
  }, [dispatch, data, categorySlug, categories]);

  const toggleIsOpen = (id: string) => {
    const target = categories.find((category) => {
      return category.id === id;
    });

    dispatch(setIsOpen({ id, isOpen: !target?.isOpen }));
  };

  const setActive = (id: string) => {
    dispatch(setIsActive(id));
  };

  return (
    <div className='flex flex-col w-full'>
      <Title
        text='categories'
        size='small'
        margin='mb-2'
        color='text-blue-950'
      />
      <ul className='px-2'>
        {categories.map((category) => {
          const isCategoryActive =
            location.pathname === `/products/${category.slug}`;
          return (
            <li
              key={category.id}
              className={`w-full flex rounded-xl p-1 hover:scale-105 transition-all cursor-pointer
               ${
                 category.level === 1
                   ? 'pl-1'
                   : category.level === 2
                   ? 'pl-3'
                   : 'pl-5'
               }
              ${isCategoryActive ? 'bg-sky-200' : ''}`}
              onClick={() => {
                setActive(category.id);
                toggleIsOpen(category.id);
              }}
            >
              <Link
                to={`/products/${category.slug}`}
                className={`relative px-2 text-lg text-blue-950 hover:text-sky-950
                ${
                  isCategoryActive
                    ? ''
                    : `after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-c-sky
                       after:rounded-lg after:z-[-5] after:ml-1
                       after:hover:w-[95%] after:transition-all after:duration-500`
                }
              `}
              >
                {category.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryButtons;
