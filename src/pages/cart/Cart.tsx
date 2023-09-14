import React, { type FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Select from 'react-select';
import Title from 'components/Title/Title';
import ButtonSubmit from 'components/Buttons/ButtonSubmit/ButtonSubmit';
import CartItemRow from 'components/CartItemRow/CartItemRow';
import CartDiscountCode from 'components/CartDiscountCode/CartDiscountCode';
import { getCostString } from '../../helpers/componentsHelpers';
import { Link } from 'react-router-dom';
import type { LineItem } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/cart';
import { addUpdateActions } from '../../store/cartSlice';
import type { MyCartUpdateAction } from '@commercetools/platform-sdk';

const shippingOptions = [
  { value: 0, label: 'Standard Shipping' },
  { value: 1995, label: 'Express Shipping' },
];

const Cart: FC = () => {
  const dispatch = useAppDispatch();
  const { products, totalProductsQuantity, totalPrice, discountCodes } =
    useAppSelector((state) => {
      return state.cart;
    });
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const totalWithoutCode = products.reduce((acc, product) => {
    if (product.price.discounted) {
      return acc + product.price.discounted.value.centAmount;
    }

    return acc + product.price.value.centAmount;
  }, 0);

  const clearCartHandler = (products: LineItem[]) => {
    const actions = products.map((product): MyCartUpdateAction => {
      return { action: 'removeLineItem', lineItemId: product.id };
    });

    dispatch(addUpdateActions(actions));
    setIsModalOpen(false);
  };

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (products.length === 0 && discountCodes.length > 0) {
      const actions = discountCodes.map((id): MyCartUpdateAction => {
        return {
          action: 'removeDiscountCode',
          discountCode: {
            typeId: 'discount-code',
            id,
          },
        };
      });

      dispatch(addUpdateActions(actions));
    }
  }, [products, discountCodes]);

  return (
    <div className={'flex flex-wrap'}>
      <div className={'p-4 basis-768px grow'}>
        <div className={'flex flex-wrap justify-between'}>
          <Title text='Shopping Cart' size='large' />
          <div className={'font-semibold text-blue-900'}>
            {totalProductsQuantity && totalProductsQuantity > 0
              ? `${totalProductsQuantity} Items`
              : 'Cart is empty'}
          </div>
        </div>
        {!!totalProductsQuantity && totalProductsQuantity > 0 && (
          <div>
            <div className={'flex'}>
              <div className={'w-2/5 font-semibold text-sm text-c-light-blue'}>
                PRODUCT DETAILS
              </div>
              <div className={'w-1/5 font-semibold text-sm text-c-light-blue'}>
                QUANTITY
              </div>
              <div className={'w-1/5 font-semibold text-sm text-c-light-blue'}>
                PRICE
              </div>
              <div className={'w-1/5 font-semibold text-sm text-c-light-blue'}>
                TOTAL
              </div>
            </div>
            {products.map((product) => {
              return <CartItemRow item={product} key={product.id} />;
            })}
          </div>
        )}
        <div className={'pt-5 flex justify-between text-left text-blue-900'}>
          <Link
            to={'/products/all'}
            className={'opacity-70 hover:opacity-100 transition-all'}
          >
            Return to Catalog
          </Link>
          {totalProductsQuantity && totalProductsQuantity > 0 && (
            <div
              className={
                'opacity-70 hover:opacity-100 hover:text-c-pink-red hover:font-bold transition-all cursor-pointer'
              }
              onClick={() => {
                openModalHandler();
              }}
            >
              Clear Cart
            </div>
          )}
        </div>
      </div>
      {totalProductsQuantity && totalProductsQuantity > 0 && (
        <div className={'p-4 basis-320px l:grow bg-c-sky'}>
          <Title text='Order Summary' size='medium' />
          <div className={'flex flex-wrap justify-between'}>
            <div className={'mx-auto my-5 basis-240px'}>
              <div className={'flex justify-between'}>
                <div>Items quantity:</div>
                <div>{totalProductsQuantity ?? ''}</div>
              </div>
              <div className={'flex justify-between'}>
                <div>Items cost:</div>
                <div>{totalPrice ? `$${getCostString(totalPrice)}` : ''}</div>
              </div>
              <div className={'mt-3 flex justify-between items-center'}>
                <div>
                  <Select
                    options={shippingOptions}
                    defaultValue={shippingOptions[0]}
                    onChange={(newValue) => {
                      setShippingCost(newValue?.value ?? 0);
                    }}
                    classNames={{
                      singleValue: () => {
                        return 'text-sm';
                      },
                      menu: () => {
                        return 'text-sm text-left';
                      },
                    }}
                  />
                </div>
                <div>
                  {shippingCost > 0
                    ? `$${getCostString(shippingCost)}`
                    : 'Free'}
                </div>
              </div>
            </div>
            <div
              className={
                'mx-auto my-5 basis-240px flex justify-between items-center'
              }
            >
              <div className={'text-left basis-1/3'}>Coupon:</div>
              <div className={'basis-2/3'}>
                <CartDiscountCode
                  total={totalPrice || totalWithoutCode}
                  totalWithoutCode={totalWithoutCode}
                />
              </div>
            </div>
            <div className={'mx-auto my-5 basis-240px flex justify-between'}>
              <div>Total:</div>
              <div>
                {totalPrice
                  ? `$${getCostString(totalPrice + shippingCost)}`
                  : ''}
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div
          className={
            'fixed top-0 left-0 right-0 bottom-0 w-full h-screen overflow-hidden z-50 flex items-center justify-center backdrop-blur-sm'
          }
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModalHandler();
          }}
        >
          <div className={'max-w-little-xs bg-c-alice-blue rounded-md'}>
            <h3 className={'p-2 text-c-pink-red font-bold'}>
              All items will be removed from your shopping Cart.
            </h3>
            <h3 className={'p-2 text-c-light-blue font-bold'}>Are you sure?</h3>
            <div className={'p-4 flex justify-around'}>
              <ButtonSubmit
                text={'Confirm'}
                onClick={() => {
                  clearCartHandler(products);
                }}
              />
              <ButtonSubmit
                text={'Cancel'}
                onClick={() => {
                  closeModalHandler();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
