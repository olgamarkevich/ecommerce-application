import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import type { RootState, RootDispatch } from '../store/store';
import { useGetCustomerTokenQuery } from '../api/authApi';

export const useAppDispatch = () => {
  return useDispatch<RootDispatch>();
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useCustomerLogin = useGetCustomerTokenQuery;
