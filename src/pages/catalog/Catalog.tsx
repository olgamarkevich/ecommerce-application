import React, { useEffect } from 'react';
import Select, { type PropsValue } from 'react-select';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryTree from '../../components/CategoryTree/CategoryTree';
import FilterBar from '../../components/FilterBar/FilterBar';
import type { FC } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { prepareCatalogQueryParams } from '../../helpers/prepareCatalogQueryParams';
import { useSearchProductsQuery } from '../../api/productApi';
import { useGetCategoriesQuery } from '../../api/categoryApi';
import { prepareProductAndCategoryQueryParams } from '../../helpers/prepareProductAndCategoryQueryParams';
import { useAppSelector } from '../../hooks/hooks';
import ProductCard from '../../components/ProductCard/ProductCard';
import type { OnChangeValue } from 'react-select/dist/declarations/src/types';
import { setLoadingStatus } from '../../store/appSlice';
import { useAppDispatch } from '../../hooks/hooks';
import type { CategoryTreeSource } from '../../types/storeTypes';
import { setCategories } from '../../store/catalogSlice';
import {
  checkCategoryChildren,
  getCategoryItems,
  markCategoryActive,
  markCategoryOpen,
} from '../../helpers/categoryTreeHelpers';

const Catalog: FC = () => {
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
  const categoryQueryParams = prepareProductAndCategoryQueryParams(
    categorySlug || 'all',
  );

  const {
    data: category,
    isError: isCategoryError,
    isLoading: isCategoryLoading,
  } = useGetCategoriesQuery(categoryQueryParams.toString(), {
    skip: !userType,
  });

  let params = new URLSearchParams();

  if (category && category.results.length) {
    params = prepareCatalogQueryParams(category.results[0].id, searchParams);
  }

  if (params.size) console.log(params.toString()); // TODO remove

  const {
    data: products,
    isError: isProductError,
    isLoading: isProductLoading,
  } = useSearchProductsQuery(params.toString(), {
    skip: !category?.results[0]?.id || !params.size,
  });

  const {
    data,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategoriesQuery('limit=500&offset=0', {
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

  // Set loading status
  useEffect(() => {
    dispatch(
      setLoadingStatus(
        isCategoryLoading || isProductLoading || isCategoriesLoading,
      ),
    );
  }, [dispatch, isCategoryLoading, isProductLoading]);

  const showItemsOptions = [
    { value: '12', label: '12' },
    { value: '24', label: '24' },
    { value: '36', label: '36' },
  ];

  const getShowItemsDefaultValue = (): PropsValue<{
    value: string;
    label: string;
  }> => {
    if (searchParams.has('limit')) {
      const limitValue = searchParams.get('limit');
      const option = showItemsOptions.find((option) => {
        return option.value === limitValue;
      });

      return option ? option : showItemsOptions[0];
    }

    return showItemsOptions[0];
  };

  const onShowItemsSelect = (
    newValue: OnChangeValue<{ value: string; label: string }, boolean>,
  ) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newSearchParams.has('limit')) {
      newSearchParams.delete('limit');
    }

    const allowedShowItemsValues = ['12', '24', '36'];

    if (
      newValue &&
      'value' in newValue &&
      allowedShowItemsValues.includes(newValue.value)
    ) {
      newSearchParams.append('limit', newValue.value);
    }

    setSearchParams(newSearchParams);
  };

  const sortSelectOptions = [
    { value: 'priceAsc', label: 'Price (asc)' },
    { value: 'priceDesc', label: 'Price (desc)' },
    { value: 'nameAsc', label: 'Name (asc)' },
    { value: 'nameDesc', label: 'Name (desc)' },
  ];

  const getSortDefaultValue = (): PropsValue<{
    value: string;
    label: string;
  }> | null => {
    if (searchParams.has('sort')) {
      const sortValue = searchParams.get('sort');
      const option = sortSelectOptions.find((option) => {
        return option.value === sortValue;
      });

      return option ? option : null;
    }

    return null;
  };

  const onSortSelect = (
    newValue: OnChangeValue<{ value: string; label: string }, boolean>,
  ) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newSearchParams.has('sort')) {
      newSearchParams.delete('sort');
    }

    const allowedSortValues = ['priceAsc', 'priceDesc', 'nameAsc', 'nameDesc'];

    if (
      newValue &&
      'value' in newValue &&
      allowedSortValues.includes(newValue.value)
    ) {
      newSearchParams.append('sort', newValue.value);
    }

    setSearchParams(newSearchParams);
  };

  const onSearch = (searchString: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newSearchParams.has('search')) {
      newSearchParams.delete('search');
    }

    if (searchString.length) newSearchParams.append('search', searchString);

    setSearchParams(newSearchParams);
  };

  const getSearchValue = (): string => {
    return searchParams.get('search') || '';
  };

  if (products && products.results) console.log(products.results); //TODO remove it

  if (isCategoryError || isProductError || isCategoriesError) {
    return (
      <>
        <h3>Server error! Try later...</h3>
        <Link to={'/products/all'}>Return to Catalog</Link>
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
        <Link to={'/products/all'}>Return to Catalog</Link>
      </>
    );
  }

  return (
    <>
      {products && (
        <>
          <div
            className={
              'mb-4 flex flex-row flex-wrap justify-between gap-4 w-full'
            }
          >
            <div className={'basis-300px'}>
              <div className={'flex flex-row gap-2 items-center w-full'}>
                <div className={'w-5/8'}>Items per page:</div>
                <Select
                  className={'w-3/8'}
                  options={showItemsOptions}
                  defaultValue={getShowItemsDefaultValue()}
                  onChange={onShowItemsSelect}
                />
              </div>
            </div>
            <div className={'basis-300px'}>
              <div className={'min-w-full'}>
                <SearchBar value={getSearchValue()} onSearch={onSearch} />
              </div>
            </div>
            <div className={'basis-300px'}>
              <div className={'flex flex-row gap-2 items-center w-full'}>
                <div className={'w-3/8'}>Sort by:</div>
                <Select
                  className={'w-5/8'}
                  options={sortSelectOptions}
                  defaultValue={getSortDefaultValue()}
                  isClearable={true}
                  placeholder={'Default'}
                  onChange={onSortSelect}
                />
              </div>
            </div>
          </div>
          <div className={'flex gap-3'}>
            <aside>
              <CategoryTree />
              <FilterBar />
            </aside>
            <ProductCard products={products.results} title={'Products'} />
          </div>
        </>
      )}
    </>
  );
};

export default Catalog;
