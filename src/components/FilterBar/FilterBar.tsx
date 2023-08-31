import React, { type FC } from 'react';
import Select from 'react-select';

const FilterBar: FC = () => {
  const priceOptions = [
    { value: 0, label: '0.00' },
    { value: 100, label: '1.00' },
    { value: 200, label: '2.00' },
  ];
  const vendors = new Set(['Vendor1', 'Vendor2', 'Vendor3']);

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
        <h4 className={'mt-3'}>By vendor</h4>
        <ul>
          {[...vendors].sort().map((vendor) => {
            // const paramString = `filter=${attrName - vendor}:${attrValue - Badger}`
            return (
              <li key={vendor}>
                <label>
                  <input type={'checkbox'} />
                  {vendor}
                </label>
                {/*variants.attributes.${attrName - vendor}.en:"${attrValue - Badger}"*/}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FilterBar;
