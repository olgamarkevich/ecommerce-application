import type React from 'react';
import type { MouseEventHandler } from 'react';
import type { IProductItem } from './storeTypes';

export interface IPopUp {
  text: string;
  isOnView?: boolean;
}

export type TextType = 'warn' | 'text';

export interface IText {
  text: string | undefined;
  type?: TextType;
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

export type TitleSizes = 'small' | 'medium' | 'large';

export interface ITitle {
  text: string;
  size: TitleSizes;
}

export interface IProductCard {
  products: IProductItem[];
  title: string;
}
