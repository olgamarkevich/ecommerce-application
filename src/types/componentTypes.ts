import type React from 'react';
import type { MouseEventHandler } from 'react';
import type { ProductProjection } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';

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
  className?: string;
}

export interface IButton {
  text: string;
  onClick?: () => void;
}

export type TitleSizes = 'small' | 'medium' | 'large';

export interface ITitle {
  text: string;
  size: TitleSizes;
  margin?: string;
  color?: string;
}

export interface IProductCardList {
  products: Partial<ProductProjection>[];
  title?: string;
}
export interface ICard {
  product: Partial<ProductProjection>;
  imgSrcList: string[];
  price: string;
  discountedPrice: string;
}

export interface IProductCard {
  product: Partial<ProductProjection>;
}

export type AttributeOptionsSet = Record<string, string[]>;

// eslint-disable-next-line autofix/no-unused-vars
type OnSearch = (searchString: string) => void;

export interface SearchBarProps {
  value: string;
  onSearch: OnSearch;
}

export type ChooseAttributeHandler = (
  // eslint-disable-next-line autofix/no-unused-vars
  attributeName: string,
  // eslint-disable-next-line autofix/no-unused-vars
  attributeValue: string,
  // eslint-disable-next-line autofix/no-unused-vars
  isAttributeSet: boolean,
) => void;

export interface AttributesItem {
  attributeName: string;
  attributeValues: string[];
  chooseAttributeHandler: ChooseAttributeHandler;
  filterOptions: URLSearchParams;
}
