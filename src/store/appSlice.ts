import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { AppState } from '../types/storeTypes';
import type { TextInfoState } from '../types/storeTypes';

const initialState: AppState = {
  isInitialized: false,
  isAuthorized: false,
  isCustomerLogged: false,
  loadingSet: new Set(),
  textInfo: null,
};

export const showTextInfo = createAsyncThunk(
  'app/showTextInfo',
  (msgText: string, { dispatch }) => {
    const showTime = 10000;
    const transitionTime = 150;

    dispatch(setTextInfo({ msgText, isOnView: false }));

    setTimeout(() => {
      dispatch(setTextInfo({ msgText, isOnView: true }));
    }, 0);

    setTimeout(() => {
      dispatch(setTextInfo({ msgText, isOnView: false }));
    }, showTime - transitionTime);

    setTimeout(() => {
      dispatch(setTextInfo(null));
    }, showTime);
  },
);

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitializationState: (state, action: PayloadAction<boolean>) => {
      return { ...state, isInitialized: action.payload };
    },
    setAuthorizationState: (state, action: PayloadAction<boolean>) => {
      return { ...state, isAuthorized: action.payload };
    },
    setCustomerLoggedState: (state, action: PayloadAction<boolean>) => {
      return { ...state, isCustomerLogged: action.payload };
    },
    setLoadingSet: (
      state,
      action: PayloadAction<{ value: string; status: boolean }>,
    ) => {
      const { value, status } = action.payload;
      const loadingSet = new Set(state.loadingSet);

      if (status) {
        loadingSet.add(value);
      } else {
        loadingSet.delete(value);
      }

      return { ...state, loadingSet };
    },
    setTextInfo: (state, action: PayloadAction<TextInfoState | null>) => {
      return { ...state, textInfo: action.payload };
    },
  },
});

export const {
  setInitializationState,
  setAuthorizationState,
  setCustomerLoggedState,
  setLoadingSet,
  setTextInfo,
} = appSlice.actions;

export default appSlice.reducer;
