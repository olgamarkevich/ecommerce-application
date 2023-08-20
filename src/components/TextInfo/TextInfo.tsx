import React from 'react';
import type { FC } from 'react';
import type { IText } from 'types/componentTypes';

const TextInfo: FC<IText> = ({ text, className }) => {
  return <div className={`${className}`}>{text}</div>;
};

export default TextInfo;
