import React, { type FC, useEffect, useState } from 'react';
import type { LineItem } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/cart';
import { getCostString } from '../../helpers/componentsHelpers';
import { useGetProductByIdQuery } from '../../api/productApi';
import { Link } from 'react-router-dom';
import { addUpdateActions } from '../../store/cartSlice';
import { useAppDispatch } from '../../hooks/hooks';
import type { TypedMoney } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';

interface LineItemWithDiscount extends LineItem {
  discountedPrice?: {
    value: TypedMoney;
    includedDiscounts: unknown[];
  };
}

const CartItemRow: FC<{ item: LineItemWithDiscount }> = (props) => {
  const dispatch = useAppDispatch();
  const { item } = props;
  const [imgSrc, setImgSrc] = useState<string | undefined>(
    item.variant.images &&
      item.variant.images[0] &&
      'url' in item.variant.images[0]
      ? `store/productImages/${item.variant.images[0].url}`
      : undefined,
  );
  const name = item.name.en;
  const attributes = (item.variant.attributes ?? [])
    .map((attribute) => {
      const name = attribute.name ?? '';
      const value =
        attribute.value && typeof attribute.value === 'object'
          ? attribute.value.en ?? ''
          : String(attribute.value ?? '');

      return { name, value };
    })
    .sort((a, b) => {
      if (a.name === 'vendor') return -1;
      if (b.name === 'vendor') return 1;
      if (a.name < b.name) return -1;
      if (b.name < a.name) return 1;
      return 0;
    });
  const { id, quantity, productId, productSlug } = item;
  const fullPrice = item.price.value.centAmount;
  const discountedPrice = item.price.discounted?.value.centAmount;
  const withCodePrice = item.discountedPrice?.value.centAmount;
  const total = item.totalPrice.centAmount;
  const sku = item.variant.sku ?? '';

  const { data } = useGetProductByIdQuery(productId, { skip: !!imgSrc });

  useEffect(() => {
    if (data && data.masterVariant.images && data.masterVariant.images[0].url) {
      setImgSrc(`store/productImages/${data.masterVariant.images[0].url}`);
    }
  }, [data]);

  const addOneHandler = (sku: string) => {
    dispatch(addUpdateActions([{ action: 'addLineItem', sku, quantity: 1 }]));
  };

  const removeOneHandler = (lineItemId: string): void => {
    dispatch(
      addUpdateActions([{ action: 'removeLineItem', lineItemId, quantity: 1 }]),
    );
  };

  const removeAllHandler = (lineItemId: string): void => {
    dispatch(addUpdateActions([{ action: 'removeLineItem', lineItemId }]));
  };

  return (
    <>
      <div className={'my-2 flex hover:bg-c-sky transition-all'}>
        <div className={'w-2/5 flex justify-start gap-1 text-sm'}>
          <div className={'p-1 basis-20 shrink-0 grow-0'}>
            <img className='h-20 rounded-md' src={imgSrc} alt={name} />
          </div>
          <div
            className={
              'p-1 flex flex-col justify-between items-start text-left'
            }
          >
            <div>
              <Link
                to={`/product/${productSlug?.en ?? ''}`}
                className={'font-medium text-blue-950'}
              >
                {name}
              </Link>
              <div>
                {attributes &&
                  attributes.length &&
                  attributes.map((attribute) => {
                    return (
                      <p key={attribute.name} className={'text-xs text-c-kiwi'}>
                        <span
                          className={'capitalize'}
                        >{`${attribute.name}: `}</span>
                        <span>{attribute.value}</span>
                      </p>
                    );
                  })}
              </div>
            </div>
            <div
              className='
              text-xs text-blue-950
              opacity-30 hover:opacity-70
              cursor-pointer transition-all
              '
              onClick={() => {
                removeAllHandler(id);
              }}
            >
              Remove from Cart
            </div>
          </div>
        </div>
        <div className={'w-1/5 flex justify-center items-center text-sm'}>
          <div
            className='
            flex justify-between items-center
            bg-c-alice-blue
            font-medium text-blue-950
            rounded-full
            '
          >
            <button
              className={`
              px-2 rounded-s-full
              transition duration-500 ease-in-out
              hover:shadow-custom-inner
              hover:text-sky-100
              `}
              onClick={() => {
                removeOneHandler(id);
              }}
            >
              -
            </button>
            <div
              className='
              min-w-[1.5rem]
              cursor-default
              '
            >
              {quantity}
            </div>
            <button
              className={`
              px-2 rounded-e-full
              transition duration-500 ease-in-out
              hover:shadow-custom-inner
              hover:text-sky-100
              `}
              onClick={() => {
                addOneHandler(sku);
              }}
            >
              +
            </button>
          </div>
        </div>
        <div
          className={'w-1/5 flex flex-col justify-center items-center text-sm'}
        >
          {withCodePrice && (
            <>
              <span className={'text-c-sale-red font-bold'}>{`$${getCostString(
                withCodePrice,
              )}`}</span>{' '}
              <span
                className={'text-blue-950 text-xs line-through'}
              >{`$${getCostString(fullPrice)}`}</span>
            </>
          )}
          {!withCodePrice && discountedPrice && (
            <>
              <span className={'text-c-sale-red font-bold'}>{`$${getCostString(
                discountedPrice,
              )}`}</span>{' '}
              <span
                className={'text-blue-950 text-xs line-through'}
              >{`$${getCostString(fullPrice)}`}</span>
            </>
          )}
          {!withCodePrice && !discountedPrice && `$${getCostString(fullPrice)}`}
        </div>
        <div
          className={`w-1/5 flex justify-center items-center text-sm ${
            withCodePrice || discountedPrice ? 'text-blue-950' : ''
          }`}
        >{`$${getCostString(total)}`}</div>
      </div>
    </>
  );
};

export default CartItemRow;
