import React from 'react';
import type { FC } from 'react';
import type { IButton } from 'types/componentTypes';

import './ButtonClose.css';

interface ButtonCloseProps extends Pick<IButton, 'onClick'> {
  className: string /*width, height*/;
}

const ButtonClose: FC<ButtonCloseProps> = ({ onClick, className }) => {
  return (
    <div className={`${className} ButtonClose`} onClick={onClick}>
      <></>
    </div>
  );
};

export default ButtonClose;
