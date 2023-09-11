import { useAppDispatch, useAppSelector } from './hooks';
import {
  useCreateCartQuery,
  useGetActiveCartQuery,
  useUpdateCartQuery,
} from '../api/cartApi';
import { useEffect } from 'react';
import { setLoadingSet } from '../store/appSlice';
import { clearUpdateActions, setCart, setNullCart } from '../store/cartSlice';
import type { Cart } from '@commercetools/platform-sdk';
import { getCartFromResponse } from '../helpers/cartHelpers';

const useCart = () => {
  const dispatch = useAppDispatch();
  const { customerId } = useAppSelector((state) => {
    return state.auth;
  });
  const { cartId, version, updateActions } = useAppSelector((state) => {
    return state.cart;
  });

  // Fetch active cart
  const {
    data: activeCartData,
    error: activeCartError,
    isLoading: isActiveCartLoading,
  } = useGetActiveCartQuery(undefined, {
    skip: !customerId || cartId !== undefined,
  });

  // Create new cart
  const { data: createCartData, isLoading: isCreateCartLoading } =
    useCreateCartQuery(
      { currency: 'USD' },
      { skip: !(cartId === null && updateActions.length > 0) },
    );

  // Update cart
  const { data: cartUpdateData, isLoading: isCartUpdateLoading } =
    useUpdateCartQuery(
      {
        id: cartId as string,
        body: { version: version as number, actions: updateActions },
      },
      { skip: !cartId || !version || updateActions.length === 0 },
    );

  // Set active cart when exist
  useEffect(() => {
    if (activeCartData) {
      console.log('Load');
      const cart = getCartFromResponse(activeCartData as Cart);
      dispatch(setCart(cart));
    }
  }, [dispatch, activeCartData]);

  // Set null when no active cart
  useEffect(() => {
    if (activeCartError) {
      console.log('Nothing to Load');
      dispatch(setNullCart());
    }
  }, [dispatch, activeCartError]);

  // Set new cart
  useEffect(() => {
    if (createCartData) {
      console.log('Create New');
      const cart = getCartFromResponse(createCartData as Cart);
      dispatch(setCart(cart));
    }
  }, [dispatch, createCartData]);

  // Set cart after updating
  useEffect(() => {
    if (cartUpdateData) {
      console.log('Update');
      const cart = getCartFromResponse(cartUpdateData as Cart);
      dispatch(setCart(cart));
      dispatch(clearUpdateActions());
    }
  }, [dispatch, cartUpdateData]);

  // Set loading status
  useEffect(() => {
    dispatch(
      setLoadingSet({
        value: 'activeCartLoadingInCart',
        status: isActiveCartLoading,
      }),
    );
  }, [dispatch, isActiveCartLoading]);

  useEffect(() => {
    dispatch(
      setLoadingSet({
        value: 'createCartLoadingInCart',
        status: isCreateCartLoading,
      }),
    );
  }, [dispatch, isCreateCartLoading]);

  useEffect(() => {
    dispatch(
      setLoadingSet({
        value: 'cartUpdateLoadingInCart',
        status: isCartUpdateLoading,
      }),
    );
  }, [dispatch, isCartUpdateLoading]);
};

export default useCart;
