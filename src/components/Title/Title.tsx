import React from 'react';
import type { FC } from 'react';
import type { ITitle, TitleSizes } from 'types/componentTypes';

const getSize = (size: TitleSizes) => {
  const sizeMap: Record<TitleSizes, string> = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-3xl',
  };
  return sizeMap[size] || 'text-xl';
};

const Title: FC<ITitle> = ({ text, size }) => {
  return (
    <div
      className={`title ${getSize(size)}
      font-bold text-blue-900
      font-f-open-sans tracking-[0.3em]`}
    >
      {text}
    </div>
  );
};

export default Title;
