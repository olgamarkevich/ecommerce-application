import React from 'react';
import type { FC } from 'react';
import type { IText, TextType } from 'types/componentTypes';
import { ReactComponent as WarningSVG } from '../../assets/svg/warning.svg';

const getTypeStyle = (type: TextType) => {
  const typesMap: Record<TextType, string> = {
    warn: 'flex items-center bg-c-dry-sand text-xs text-blue-950',
    text: '',
  };
  return typesMap[type] || '';
};

const TextInfo: FC<IText> = ({ text, type = 'text', className }) => {
  return (
    <div className={`${className} ${getTypeStyle(type)} p-1 my-1`}>
      {type === 'warn' && <WarningSVG className='mx-1' />}
      {text}
    </div>
  );
};

export default TextInfo;
