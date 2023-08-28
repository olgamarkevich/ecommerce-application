// Test data

import type { IProductItem } from './storeTypes';

export const productsList: IProductItem[] = [
  {
    id: 1,
    name: 'shampoo',
    brand: 'old spice',
    images: ['TestImg/img1.png', 'TestImg/img2.png', 'TestImg/img3.png'],
    category: 'Beauty',
    shortDescription: 'That is very cool shampoo',
    description: 'That is very cool shampoo and some info',
    price: 20,
    oldPrice: 25,
  },
  {
    id: 2,
    name: 'shampoo',
    brand: 'Clean line',
    images: ['TestImg/img4.png', 'TestImg/img1.png', 'TestImg/img6.png'],
    category: 'Beauty',
    shortDescription: 'That is very cool shampoo',
    description: 'That is very cool shampoo and some info',
    price: 15,
    oldPrice: 25,
  },
  {
    id: 3,
    name: 'Wooden plate',
    brand: 'Extra eco',
    images: ['TestImg/img2.png', 'TestImg/img1.png', 'TestImg/img5.png'],
    category: 'Accessory',
    shortDescription: 'Eco wooden tool',
    description:
      'Eco wooden tool and some info and some info and some info and some info and some info and some info and some info',
    price: 20,
    oldPrice: 25,
  },
  {
    id: 4,
    name: 'earphones',
    brand: 'no apple',
    images: ['TestImg/img1.png', 'TestImg/img2.png', 'TestImg/img3.png'],
    category: 'Accessory',
    shortDescription: 'The best headphones in the world',
    description:
      'The best headphones in the world and some info and some info and some info and some info and some info and some info and some info and some info',
    price: 20,
    oldPrice: 25,
  },
];
