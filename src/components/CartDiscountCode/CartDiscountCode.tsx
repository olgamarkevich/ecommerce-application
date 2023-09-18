import React, { type FC, type KeyboardEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addUpdateActions } from '../../store/cartSlice';
import { getCostString } from '../../helpers/componentsHelpers';

const CartDiscountCode: FC<{
  total: number;
  totalWithoutCode: number;
}> = ({ total, totalWithoutCode }) => {
  const dispatch = useAppDispatch();
  const saveAmount = totalWithoutCode - total;
  const [code, setCode] = useState<string>('');
  const { discountCodes } = useAppSelector((state) => {
    return state.cart;
  });

  const discountCodeId = discountCodes[0];

  const applyCodeHandler = (code: string) => {
    if (code.length) {
      dispatch(addUpdateActions([{ action: 'addDiscountCode', code }]));
    }
  };

  const inputEnterKeyHandler = (
    e: KeyboardEvent<HTMLInputElement>,
    code: string,
  ) => {
    if (e.key === 'enter') {
      applyCodeHandler(code);
    }
  };

  const clearCodeHandler = (id: string) => {
    if (id) {
      dispatch(
        addUpdateActions([
          {
            action: 'removeDiscountCode',
            discountCode: {
              typeId: 'discount-code',
              id,
            },
          },
        ]),
      );
    }
  };

  return (
    <>
      <div
        className='
        p-1 bg-white rounded-md
        border-c-light-grey hover:border-c-dark-grey border-solid border-[1px]
        transition-all
        '
      >
        {discountCodeId ? (
          <div className={'w-[160px] flex justify-between items-center'}>
            <div className={'text-c-green opacity-70'}>
              {saveAmount > 0
                ? `You save $${getCostString(saveAmount)}`
                : 'Code applied'}
            </div>
            <button
              className={
                'opacity-70 hover:opacity-100 transition-all cursor-pointer'
              }
              onClick={() => {
                clearCodeHandler(discountCodeId);
              }}
            >
              <svg
                width='20px'
                height='20px'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M9 9L15 15'
                  stroke='#fb3859'
                  strokeWidth='3'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M15 9L9 15'
                  stroke='#fb3859'
                  strokeWidth='3'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <circle
                  cx='12'
                  cy='12'
                  r='9'
                  stroke='#fb3859'
                  strokeWidth='3'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className={'w-[160px] flex justify-between items-center'}>
            <input
              className={'w-[140px] outline-none'}
              placeholder={'Have code?'}
              value={code}
              onInput={(e) => {
                setCode(e.currentTarget.value ?? '');
              }}
              onKeyUp={(e) => {
                inputEnterKeyHandler(e, code);
              }}
            />
            <button
              className={
                'opacity-70 hover:opacity-100 transition-all cursor-pointer'
              }
              onClick={() => {
                applyCodeHandler(code);
              }}
            >
              <svg
                width='20px'
                height='20px'
                viewBox='0 0 100 100'
                xmlns='http://www.w3.org/2000/svg'
                version='1.1'
              >
                <path
                  style={{
                    fill: '#6d9654',
                    stroke: '#008000',
                    strokeWidth: '3',
                  }}
                  d='M 4,36 C 8,42 26,73 31,93 38,82 44,63 98,12 78,22 51,44 33,60 26,55 18,44 4,36 z'
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDiscountCode;
