import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import type { RootState, RootDispatch } from '../store/store';

export const useAppDispatch = () => {
  return useDispatch<RootDispatch>();
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
