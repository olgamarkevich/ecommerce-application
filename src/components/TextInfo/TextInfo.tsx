import React from 'react';
import type { FC } from 'react';
import type { IText } from 'types/componentTypes';

import style from './TextInfo.module.css';

const TextInfo: FC<IText> = ({ text }) => {
  return <div className={style.font}>{text}</div>;
};

export default TextInfo;
