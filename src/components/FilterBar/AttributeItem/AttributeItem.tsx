import React, { type FC, useState } from 'react';
import type { AttributesItem } from '../../../types/componentTypes';

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
      <div className={'flex justify-between items-center p-2'}>
        <h4>By {attributeName}</h4>
        <div
          className={`w-2.5 h-2.5 rounded ${
            isChildrenShown ? 'rotate-45' : '-rotate-45'
          } cursor-pointer border-b-solid border-b-2 border-b-gray-400 hover:border-b-gray-600 border-r-solid border-r-2 border-r-gray-400 hover:border-r-gray-600 hover:scale-105 transition-all`}
          onClick={() => {
            setIsChildrenShown(!isChildrenShown);
          }}
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
              <label className={'flex justify-start items-center gap-1'}>
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
                />{' '}
                <div className={'text-left'}>{attributeValue}</div>
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default AttributeItem;
