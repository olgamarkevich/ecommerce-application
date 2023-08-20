import reducer, {
  setInitializationState,
  setAuthorizationState,
  setCustomerLoggedState,
  setLoadingStatus,
  setTextInfo,
  showTextInfo,
} from '../store/appSlice';
import type { AppState } from '../types/storeTypes';
import { loadCustomerFromLocalStorage } from '../store/authSlice';

const nullState: AppState = {
  isInitialized: false,
  isAuthorized: false,
  isCustomerLogged: false,
  isLoading: false,
  textInfo: null,
};

const someState: AppState = {
  isInitialized: true,
  isAuthorized: true,
  isCustomerLogged: true,
  isLoading: true,
  textInfo: { msgText: 'Some text info', isOnView: true },
};

describe('appReducer should work correctly', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(nullState);
  });

  test('setInitializationState should set isInitialized', () => {
    expect(reducer(nullState, setInitializationState(true))).toEqual({
      ...nullState,
      isInitialized: true,
    });

    expect(reducer(someState, setInitializationState(false))).toEqual({
      ...someState,
      isInitialized: false,
    });
  });

  test('setAuthorizationState should set isInitialized', () => {
    expect(reducer(nullState, setAuthorizationState(true))).toEqual({
      ...nullState,
      isAuthorized: true,
    });

    expect(reducer(someState, setAuthorizationState(false))).toEqual({
      ...someState,
      isAuthorized: false,
    });
  });

  test('setCustomerLoggedState should set isInitialized', () => {
    expect(reducer(nullState, setCustomerLoggedState(true))).toEqual({
      ...nullState,
      isCustomerLogged: true,
    });

    expect(reducer(someState, setCustomerLoggedState(false))).toEqual({
      ...someState,
      isCustomerLogged: false,
    });
  });

  test('setLoadingStatus should set isInitialized', () => {
    expect(reducer(nullState, setLoadingStatus(true))).toEqual({
      ...nullState,
      isLoading: true,
    });

    expect(reducer(someState, setLoadingStatus(false))).toEqual({
      ...someState,
      isLoading: false,
    });
  });

  test('setTextInfo should set isInitialized', () => {
    expect(reducer(someState, setTextInfo(null))).toEqual({
      ...someState,
      textInfo: null,
    });

    expect(
      reducer(
        nullState,
        setTextInfo({ msgText: 'Some text info', isOnView: true }),
      ),
    ).toEqual({
      ...nullState,
      textInfo: { msgText: 'Some text info', isOnView: true },
    });

    expect(
      reducer(
        nullState,
        setTextInfo({ msgText: 'Some text info', isOnView: false }),
      ),
    ).toEqual({
      ...nullState,
      textInfo: { msgText: 'Some text info', isOnView: false },
    });

    expect(
      reducer(
        someState,
        setTextInfo({ msgText: 'Some text info', isOnView: false }),
      ),
    ).toEqual({
      ...someState,
      textInfo: { msgText: 'Some text info', isOnView: false },
    });

    expect(
      reducer(
        someState,
        setTextInfo({ msgText: 'Some text info', isOnView: true }),
      ),
    ).toEqual({
      ...someState,
      textInfo: { msgText: 'Some text info', isOnView: true },
    });
  });
});

describe('Thunk showTextInfo should work correctly', () => {
  test('should dispatch setTextInfo', async () => {
    const dispatch = jest.fn();
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    const thunk = showTextInfo('Some text message');

    await thunk(
      dispatch,
      () => {
        return undefined;
      },
      undefined,
    );

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(3);

    const [pending, payloadCall, fulfilled] = calls;
    expect(pending[0].type).toBe(showTextInfo.pending('', '', null).type);
    expect(payloadCall[0].type).toBe('app/setTextInfo');
    expect(payloadCall[0].payload).toEqual({
      msgText: 'Some text message',
      isOnView: false,
    });
    expect(fulfilled[0].type).toBe(
      showTextInfo.fulfilled(undefined, '', '').type,
    );

    expect(setTimeout).toHaveBeenCalledTimes(3);
    expect(setTimeout).toHaveBeenNthCalledWith(1, expect.any(Function), 0);
    expect(setTimeout).toHaveBeenNthCalledWith(2, expect.any(Function), 9850);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000);
  });
});
