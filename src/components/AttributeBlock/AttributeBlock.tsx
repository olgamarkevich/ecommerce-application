import React, { type FC } from 'react';
import { type ProductProjection } from '@commercetools/platform-sdk';
import { getAttributesBySku } from '../../helpers/settingProduct';

const AttributeBlock: FC<{
  product: Partial<ProductProjection>;
  sku: string;
  shortDescription: string | undefined;
}> = (props) => {
  const { product, sku, shortDescription } = props;

  const attributes = getAttributesBySku(product, sku);

  return (
    <div>
      {attributes &&
        attributes.map((attribute) => {
          const name = Object.keys(attribute)[0]
            .split('')
            .map((s, i) => {
              return i === 0 ? s.toUpperCase() : s;
            })
            .join('');
          const value = Object.values(attribute)[0];

          return (
            <p key={name} className={'text-left text-xs text-blue-950'}>
              <span className={'font-semibold'}>{`${name}:`}</span>
              {` ${value}`}
            </p>
          );
        })}
      {!attributes && !!shortDescription && (
        <p className={'text-xs text-blue-950'}>{shortDescription}</p>
      )}
    </div>
  );
};

export default AttributeBlock;
