import React, { type FC } from 'react';
import type { AttributesItem } from '../../../types/componentTypes';

const AttributeItem: FC<AttributesItem> = ({
  attributeName,
  attributeValues,
  chooseAttributeHandler,
  filterOptions,
}) => {
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
      <h4 className={'mt-3'}>By {attributeName}</h4>
      <ul>
        {attributeValues.sort().map((attributeValue) => {
          return (
            <li key={attributeValue}>
              <label>
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
                {attributeValue}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default AttributeItem;
