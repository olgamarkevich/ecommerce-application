import React, { type FC, useEffect, useState } from 'react';
import Select from 'react-select';
import type { ChooseAttributeHandler } from '../../types/componentTypes';
import AttributeItem from './AttributeItem/AttributeItem';
import { useSearchParams } from 'react-router-dom';
import type { ProductProjection } from '@commercetools/platform-sdk';
import {
  attributeSortCallback,
  prepareOptions,
} from '../../helpers/filterBarHelpers';

const FilterBar: FC<{ products: ProductProjection[] }> = (props) => {
  const [attributesOptions, setAttributesOptions] = useState<
    Record<string, string[]> | undefined
  >(undefined);
  const [priceOptions, setPriceOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const { products } = props;

  useEffect(() => {
    if (products) {
      const { attributesOptions, priceOptions } = prepareOptions(products);
      setAttributesOptions(attributesOptions);
      setPriceOptions(priceOptions);
    }
  }, [products]);

  const chooseAttributeHandler: ChooseAttributeHandler = (
    attributeName,
    attributeValue,
    isAttributeSet,
  ) => {
    const newSearchParams = new URLSearchParams(searchParams);
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

    setSearchParams(newSearchParams);
  };

  return (
    <div className={'border-solid border-2 border-blue-800'}>
      <h3>Filters</h3>
      <div>
        <h4 className={'mt-3'}>By price</h4>
        <Select
          options={priceOptions}
          placeholder={'Min price'}
          isClearable={true}
        />
        <Select
          options={priceOptions}
          placeholder={'Min price'}
          isClearable={true}
        />
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
              />
            );
          })}
    </div>
  );
};

export default FilterBar;
