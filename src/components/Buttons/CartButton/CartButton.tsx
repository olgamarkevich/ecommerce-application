import React, { type FC, type MouseEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  getProductIdFromCart,
  getProductQuantityFromCart,
} from '../../../helpers/cartHelpers';
import { addUpdateActions } from '../../../store/cartSlice';

interface ICartButton {
  sku: string;
}

const CartButton: FC<ICartButton> = (props) => {
  const { sku } = props;
  const { products } = useAppSelector((state) => {
    return state.cart;
  });
  const productId = getProductIdFromCart(sku, products);
  const quantityInCart = getProductQuantityFromCart(sku, products);

  const dispatch = useAppDispatch();

  const [buttonState, setButtonState] = useState<'add' | 'remove'>(
    productId ? 'remove' : 'add',
  );
  const [quantityToAdd, setQuantityToAdd] = useState<number>(1);
  const [minusButtonDisabled, setMinusButtonDisabled] =
    useState<boolean>(false);
  const [plusButtonDisabled, setPlusButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    setButtonState(productId ? 'remove' : 'add');
  }, [productId]);

  useEffect(() => {
    if (buttonState === 'add') {
      setMinusButtonDisabled(quantityToAdd < 2);
      setPlusButtonDisabled(quantityToAdd >= 99);
    }
    if (buttonState === 'remove') {
      setMinusButtonDisabled(quantityInCart < 1);
      setPlusButtonDisabled(quantityInCart >= 99);
    }
  }, [buttonState, quantityToAdd, quantityInCart]);

  const removeOneFromCartHandler = (lineItemId: string): void => {
    dispatch(
      addUpdateActions([{ action: 'removeLineItem', lineItemId, quantity: 1 }]),
    );
  };

  const removeAllFromCartHandler = (lineItemId: string): void => {
    dispatch(addUpdateActions([{ action: 'removeLineItem', lineItemId }]));
  };

  const addOneToCartHandler = (sku: string) => {
    dispatch(addUpdateActions([{ action: 'addLineItem', sku, quantity: 1 }]));
  };

  const mainButtonHandler = (
    e: MouseEvent<HTMLDivElement>,
    sku: string,
    productId: string | null,
  ) => {
    if (
      !(e.target as HTMLDivElement).classList.contains('cart-button__main-area')
    ) {
      return;
    }

    if (buttonState === 'add') {
      dispatch(
        addUpdateActions([
          { action: 'addLineItem', sku, quantity: quantityToAdd },
        ]),
      );
      setQuantityToAdd(1);
    }

    if (buttonState === 'remove' && productId) {
      removeAllFromCartHandler(productId);
    }
  };

  const minusButtonHandler = (productId: string | null) => {
    if (buttonState === 'add') {
      setQuantityToAdd(quantityToAdd > 1 ? quantityToAdd - 1 : 1);
    }

    if (buttonState === 'remove' && productId) {
      removeOneFromCartHandler(productId);
    }
  };

  const plusButtonHandler = (sku: string) => {
    if (buttonState === 'add') {
      setQuantityToAdd(quantityToAdd + 1);
    }

    if (buttonState === 'remove') {
      addOneToCartHandler(sku);
    }
  };

  if (quantityToAdd > 99) setQuantityToAdd(1);

  return (
    <div
      className={`cart-button__main-area min-w-[100px] max-w-little-s flex ${
        buttonState === 'add' ? 'bg-c-light-blue' : 'bg-c-green'
      } rounded-full border-solid border-2 ${
        buttonState === 'add' ? 'border-light-blue' : 'border-green'
      } font-medium text-c-alice-blue transition duration-500 ease-in-out ${
        buttonState === 'add'
          ? 'hover:shadow-custom-inner'
          : 'hover:shadow-custom-invert'
      } hover:text-sky-100 cursor-pointer`}
      onClick={(e) => {
        mainButtonHandler(e, sku, productId);
      }}
    >
      <div
        className='
        flex justify-between items-center
        bg-c-alice-blue
        font-medium text-c-light-blue
        rounded-full
        '
      >
        <button
          className={`
          px-2 rounded-s-full
          transition duration-500 ease-in-out
          ${
            buttonState === 'add'
              ? 'hover:shadow-custom-inner'
              : 'hover:shadow-custom-invert'
          } hover:text-sky-100
          `}
          disabled={minusButtonDisabled}
          onClick={() => {
            minusButtonHandler(productId);
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
          {buttonState === 'add' && quantityToAdd}
          {buttonState === 'remove' && quantityInCart}
        </div>
        <button
          className={`
            px-2 rounded-e-full
            transition duration-500 ease-in-out
            ${
              buttonState === 'add'
                ? 'hover:shadow-custom-inner'
                : 'hover:shadow-custom-invert'
            } hover:text-sky-100
            `}
          disabled={plusButtonDisabled}
          onClick={() => {
            plusButtonHandler(sku);
          }}
        >
          +
        </button>
      </div>
      <div
        className='cart-button__main-area
        py-1 px-4
        '
      >
        {buttonState === 'add' && 'ADD TO CART'}
        {buttonState === 'remove' && 'REMOVE ALL'}
      </div>
    </div>
  );
};

export default CartButton;
