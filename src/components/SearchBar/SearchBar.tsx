import React, { type FC, type FormEventHandler, useState } from 'react';
import type { SearchBarProps } from '../../types/componentTypes';

const SearchBar: FC<SearchBarProps> = (props) => {
  const sterilizeText = (text: string): string => {
    const maxTextLength = 256;

    if (!text || typeof text !== 'string') return '';

    const allowedRegExp = /[\w\s-]/;
    return text
      .split('')
      .filter((l, i) => {
        return allowedRegExp.test(l) && i < maxTextLength;
      })
      .join('');
  };

  const { value, onSearch } = props;
  const [searchValue, setSearchValue] = useState(sterilizeText(value));
  const [isFieldHover, setIsFieldHover] = useState(false);
  const [isResetHover, setIsResetHover] = useState(false);
  const [isSubmitHover, setIsSubmitHover] = useState(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSearch(sterilizeText((e.target as HTMLFormElement).inputField.value));
  };

  const onInputChange: FormEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(sterilizeText((e.target as HTMLInputElement).value));
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        style={{
          padding: '2px 8px',
          display: 'flex',
          alignItems: 'center',
          minHeight: '38px',
          transition: 'all 100ms',
          backgroundColor: 'hsl(0, 0%, 100%)',
          borderColor: isFieldHover ? 'hsl(0, 0%, 60%)' : 'hsl(0, 0%, 80%)',
          borderRadius: '4px',
          borderStyle: 'solid',
          borderWidth: '1px',
        }}
        onMouseEnter={() => {
          setIsFieldHover(true);
        }}
        onMouseLeave={() => {
          setIsFieldHover(false);
        }}
      >
        <input
          name={'inputField'}
          value={searchValue}
          onChange={onInputChange}
          style={{
            outline: '0',
            color: 'rgb(51, 51, 51)',
          }}
        />
        <button
          type={'reset'}
          style={{
            cursor: 'default',
            opacity: searchValue && searchValue.length ? '1' : '0',
          }}
          onClick={() => {
            setSearchValue('');
          }}
          onMouseEnter={() => {
            setIsResetHover(true);
          }}
          onMouseLeave={() => {
            setIsResetHover(false);
          }}
        >
          <svg
            height='20'
            width='20'
            viewBox='0 0 20 20'
            style={{
              transition: 'color 150ms',
              fill: isResetHover ? 'hsl(0, 0%, 60%)' : 'rgb(204, 204, 204)',
            }}
          >
            <path d='M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z' />
          </svg>
        </button>
        <button
          type={'submit'}
          style={{ cursor: 'default' }}
          onMouseEnter={() => {
            setIsSubmitHover(true);
          }}
          onMouseLeave={() => {
            setIsSubmitHover(false);
          }}
        >
          <svg
            height='24'
            width='24'
            viewBox='0 0 24 24'
            style={{
              transition: 'color 150ms',
              fill: isSubmitHover ? 'hsl(0, 0%, 60%)' : 'rgb(204, 204, 204)',
            }}
          >
            <path
              fillRule='evenodd'
              d='M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z'
            />
          </svg>
        </button>
      </form>
    </>
  );
};

export default SearchBar;
