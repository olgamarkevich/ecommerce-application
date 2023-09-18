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
import {
  getCartFromResponse,
  getCartUpdateSuccessMessage,
} from '../helpers/cartHelpers';
import { toast } from 'react-toastify';

const useCart = () => {
  const dispatch = useAppDispatch();
  const { customerId } = useAppSelector((state) => {
    return state.auth;
  });
  const { cartId, version, updateActions, products } = useAppSelector(
    (state) => {
      return state.cart;
    },
  );

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
  const {
    data: cartUpdateData,
    error: cartUpdateError,
    isLoading: isCartUpdateLoading,
  } = useUpdateCartQuery(
    {
      id: cartId as string,
      body: { version: version as number, actions: updateActions },
    },
    { skip: !cartId || !version || updateActions.length === 0 },
  );

  // Set active cart when exist
  useEffect(() => {
    if (activeCartData) {
      const cart = getCartFromResponse(activeCartData as Cart);
      dispatch(setCart(cart));
    }
  }, [dispatch, activeCartData]);

  // Set null when no active cart
  useEffect(() => {
    if (activeCartError) {
      dispatch(setNullCart());
    }
  }, [dispatch, activeCartError]);

  // Set new cart
  useEffect(() => {
    if (createCartData) {
      const cart = getCartFromResponse(createCartData as Cart);
      dispatch(setCart(cart));
    }
  }, [dispatch, createCartData]);

  // Show Cart Update Success message
  useEffect(() => {
    if (cartUpdateData && updateActions.length) {
      const nextProducts = getCartFromResponse(cartUpdateData as Cart).products;
      const message = getCartUpdateSuccessMessage(
        updateActions,
        products,
        nextProducts,
      );
      toast.success(message);
    }
  }, [cartUpdateData]);

  useEffect(() => {
    if (cartUpdateError) {
      toast.error(
        'data' in cartUpdateError &&
          cartUpdateError.data &&
          typeof cartUpdateError.data === 'object' &&
          'message' in cartUpdateError.data
          ? (cartUpdateError.data.message as string)
          : 'Server Error. Try later!',
      );
    }
  }, [cartUpdateError]);

  // Set cart after updating
  useEffect(() => {
    if (cartUpdateData) {
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
