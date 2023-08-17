import type React from 'react';

export interface IText {
  text: string;
  className?: string;
}
export interface ILinkItem {
  to: string;
  children: React.ReactNode;
}

export interface IButton {
  text: string;
  onClick?: () => void;
}
