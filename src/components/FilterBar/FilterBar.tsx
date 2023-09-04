import React, { type FC, useEffect, useState } from 'react';
import Select, { type GroupBase, type SingleValue } from 'react-select';
import type { ChooseAttributeHandler } from '../../types/componentTypes';
import AttributeItem from './AttributeItem/AttributeItem';
import { useParams, useSearchParams } from 'react-router-dom';
import type { ProductProjection } from '@commercetools/platform-sdk';
import {
  attributeSortCallback,
  prepareOptions,
} from '../../helpers/filterBarHelpers';
import type SelectType from 'react-select/dist/declarations/src/Select';
import ButtonSubmit from '../Buttons/ButtonSubmit/ButtonSubmit';

const getInitialFilterOptions = (params: URLSearchParams) => {
  const newParams = new URLSearchParams(params);
  newParams.delete('page');

  return newParams;
};

const FilterBar: FC<{ products: ProductProjection[] }> = (props) => {
  const { categorySlug } = useParams();
  const [isFiltersShown, setIsFiltersShown] = useState<boolean>(false);
  const [isPriceFilterShown, setIsPriceFilterShown] = useState<boolean>(false);

  const { products } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOptionsToApply, setFiltersOptionsToApply] =
    useState<URLSearchParams>(new URLSearchParams());
  const [attributesOptions, setAttributesOptions] = useState<
    Record<string, string[]> | undefined
  >(undefined);
  const [priceOptions, setPriceOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [priceLimits, setPriceLimits] = useState<{
    min: number | undefined;
    max: number | undefined;
  }>({ min: undefined, max: undefined });

  let minPriceSelectRef: SelectType<
    { value: number; label: string },
    false,
    GroupBase<{ value: number; label: string }>
  > | null = null;
  let maxPriceSelectRef: SelectType<
    { value: number; label: string },
    false,
    GroupBase<{ value: number; label: string }>
  > | null = null;

  useEffect(() => {
    if (products) {
      const { attributesOptions: attributes, priceOptions: prices } =
        prepareOptions(products);
      setAttributesOptions(attributes);
      setPriceOptions(prices);
    }
  }, [products]);

  useEffect(() => {
    setFiltersOptionsToApply(getInitialFilterOptions(searchParams));
  }, [searchParams, categorySlug]);

  useEffect(() => {
    const minPriceParam = filtersOptionsToApply
      .getAll('filter')
      .find((paramValue) => {
        return paramValue.split(':')[0] === 'minPrice';
      });
    const maxPriceParam = filtersOptionsToApply
      .getAll('filter')
      .find((paramValue) => {
        return paramValue.split(':')[0] === 'maxPrice';
      });
    const minPrice = minPriceParam ? +minPriceParam.split(':')[1] : undefined;
    const maxPrice = maxPriceParam ? +maxPriceParam.split(':')[1] : undefined;

    if (minPrice) {
      minPriceSelectRef?.setValue(
        {
          value: minPrice,
          label: String(minPrice / 100),
        },
        'select-option',
      );
    }
    if (maxPrice) {
      maxPriceSelectRef?.setValue(
        {
          value: maxPrice,
          label: String(maxPrice / 100),
        },
        'select-option',
      );
    }
  }, [categorySlug]);

  const choosePriceHandler = (
    priceType: 'minPrice' | 'maxPrice',
    newValue: SingleValue<{ value: number; label: string }>,
  ) => {
    const filterParams = filtersOptionsToApply.getAll('filter');

    const newParams = new URLSearchParams(filtersOptionsToApply);
    newParams.delete('filter');

    const minPriceParam = filterParams.find((paramValue) => {
      return paramValue.split(':')[0] === 'minPrice';
    });
    const maxPriceParam = filterParams.find((paramValue) => {
      return paramValue.split(':')[0] === 'maxPrice';
    });
    const minPriceValue = minPriceParam
      ? +minPriceParam.split(':')[1]
      : undefined;
    const maxPriceValue = maxPriceParam
      ? +maxPriceParam.split(':')[1]
      : undefined;

    filterParams
      .filter((paramValue) => {
        return paramValue.split(':')[0] !== priceType;
      })
      .forEach((paramValue) => {
        newParams.append('filter', paramValue);
      });

    if (newValue === null) {
      setPriceLimits(
        priceType === 'minPrice'
          ? { min: undefined, max: maxPriceValue }
          : { min: minPriceValue, max: undefined },
      );
    } else {
      newParams.append('filter', `${priceType}:${String(newValue.value)}`);
      setPriceLimits(
        priceType === 'minPrice'
          ? { min: newValue.value, max: maxPriceValue }
          : { min: minPriceValue, max: newValue.value },
      );
    }

    setFiltersOptionsToApply(newParams);
  };

  const chooseAttributeHandler: ChooseAttributeHandler = (
    attributeName,
    attributeValue,
    isAttributeSet,
  ) => {
    const newSearchParams = new URLSearchParams(filtersOptionsToApply);
    const searchParamValue = `${attributeName}:${attributeValue}`;

    if (isAttributeSet) {
      newSearchParams.append('filter', searchParamValue);
    } else {
      const values = newSearchParams.getAll('filter');
      newSearchParams.delete('filter');
      values
        .filter((value) => {
          return value !== searchParamValue;
        })
        .forEach((value) => {
          newSearchParams.append('filter', value);
        });
    }

    setFiltersOptionsToApply(newSearchParams);
  };

  const applyFiltersHandler = () => {
    setSearchParams(filtersOptionsToApply);
  };

  const clearFiltersHandler = () => {
    setFiltersOptionsToApply(new URLSearchParams());
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('filter');
    if (minPriceSelectRef) minPriceSelectRef.clearValue();
    if (maxPriceSelectRef) maxPriceSelectRef.clearValue();
    setSearchParams(newSearchParams);
  };

  return (
    <div>
      <div className={'flex justify-between items-center p-2'}>
        <h3>Filters</h3>
        <div
          className={`w-2.5 h-2.5 rounded ${
            isFiltersShown ? 'rotate-45' : '-rotate-45'
          } cursor-pointer border-b-solid border-b-2 border-b-gray-400 hover:border-b-gray-600 border-r-solid border-r-2 border-r-gray-400 hover:border-r-gray-600 hover:scale-105 transition-all`}
          onClick={() => {
            setIsFiltersShown(!isFiltersShown);
          }}
        />
      </div>
      <div
        className={`${
          isFiltersShown ? 'scale-y-100 block' : 'scale-y-0 hidden'
        } transition-all`}
      >
        <ButtonSubmit text={'Apply'} onClick={applyFiltersHandler} />
        <div className={'m-1'} />
        <ButtonSubmit text={'Clear'} onClick={clearFiltersHandler} />
        <div>
          <div className={'flex justify-between items-center p-2'}>
            <h4>By price</h4>
            <div
              className={`w-2.5 h-2.5 rounded ${
                isPriceFilterShown ? 'rotate-45' : '-rotate-45'
              } cursor-pointer border-b-solid border-b-2 border-b-gray-400 hover:border-b-gray-600 border-r-solid border-r-2 border-r-gray-400 hover:border-r-gray-600 hover:scale-105 transition-all`}
              onClick={() => {
                setIsPriceFilterShown(!isPriceFilterShown);
              }}
            />
          </div>
          <div
            className={`${
              isPriceFilterShown ? 'scale-y-100 block' : 'scale-y-0 hidden'
            } transition-all`}
          >
            <Select
              options={
                priceLimits.max
                  ? priceOptions.filter((option) => {
                      return option.value <= (priceLimits.max as number);
                    })
                  : priceOptions
              }
              placeholder={'Min price'}
              isClearable={true}
              onChange={(newValue) => {
                choosePriceHandler('minPrice', newValue);
              }}
              ref={(ref) => {
                minPriceSelectRef = ref;
              }}
            />
            <Select
              options={
                priceLimits.min
                  ? priceOptions.filter((option) => {
                      return option.value >= (priceLimits.min as number);
                    })
                  : priceOptions
              }
              placeholder={'Max price'}
              isClearable={true}
              onChange={(newValue) => {
                choosePriceHandler('maxPrice', newValue);
              }}
              ref={(ref) => {
                maxPriceSelectRef = ref;
              }}
            />
          </div>
        </div>
        {attributesOptions &&
          Object.keys(attributesOptions)
            .sort(attributeSortCallback)
            .map((key) => {
              return (
                <AttributeItem
                  key={key}
                  attributeName={key}
                  attributeValues={
                    attributesOptions ? attributesOptions[key] : []
                  }
                  chooseAttributeHandler={chooseAttributeHandler}
                  filterOptions={filtersOptionsToApply}
                />
              );
            })}
      </div>
    </div>
  );
};

export default FilterBar;
