import type React from 'react';
import type { MouseEventHandler } from 'react';

export interface IPopUp {
  text: string;
  isOnView?: boolean;
}

export interface IText {
  text: string;
  className?: string;
}
export interface ILinkItem {
  to: string;
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export interface IButton {
  text: string;
  onClick?: () => void;
}
