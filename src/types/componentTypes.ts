import type React from 'react';

export interface ILinkItem {
  to: string;
  className?: string;
  children: React.ReactNode;
}
