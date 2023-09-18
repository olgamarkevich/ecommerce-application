import React, { type FC, useState } from 'react';
import type { AttributesItem } from '../../../types/componentTypes';
import './AttributeItem.css';

const AttributeItem: FC<AttributesItem> = ({
  attributeName,
  attributeValues,
  chooseAttributeHandler,
  filterOptions,
}) => {
  const [isChildrenShown, setIsChildrenShown] = useState<boolean>(false);
  const filterAttributes = filterOptions.getAll('filter').reduce(
    (acc, item): Record<string, string[]> => {
      const [name, value] = item.split(':');

      if (!(name in acc)) acc[name] = [];

      acc[name].push(value);

      return acc;
    },
    {} as Record<string, string[]>,
  );

  if (!attributeName || !attributeValues.length) return <></>;

  return (
    <>
      <div
        className={
          'filter_option flex justify-between items-center p-2 cursor-pointer hover:scale-105'
        }
        onClick={() => {
          setIsChildrenShown(!isChildrenShown);
        }}
      >
        <h4>By {attributeName}</h4>
        <div
          className={`filter__show-btn w-2.5 h-2.5 rounded ${
            isChildrenShown ? 'rotate-45' : '-rotate-45'
          } border-b-solid border-b-2 border-b-gray-400 border-r-solid border-r-2 border-r-gray-400`}
        />
      </div>
      <ul
        className={`flex flex-col items-start ${
          isChildrenShown ? 'scale-y-100 block' : 'scale-y-0 hidden'
        } transition-all`}
      >
        {attributeValues.sort().map((attributeValue) => {
          return (
            <li key={attributeValue}>
              <label
                className={`flex relative items-start gap-1 ml-2 filter-option`}
              >
                <input
                  type={'checkbox'}
                  checked={
                    !!filterAttributes[attributeName] &&
                    filterAttributes[attributeName].includes(attributeValue)
                  }
                  onChange={(e) => {
                    chooseAttributeHandler(
                      attributeName,
                      attributeValue,
                      e.target.checked,
                    );
                  }}
                  className={`absolute opacity-0 h-4 w-4 left-0 top-1`}
                />{' '}
                <span
                  className='h-4 w-4 checkmark absolute top-1 left-0
                  border border-c-light-blue rounded
                  transition-colors duration-300'
                />
                <div className={'ml-5 text-left'}>{attributeValue}</div>
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default AttributeItem;
