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
  isLoading: false,
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
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      return { ...state, isLoading: action.payload };
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
  setLoadingStatus,
  setTextInfo,
} = appSlice.actions;

export default appSlice.reducer;
