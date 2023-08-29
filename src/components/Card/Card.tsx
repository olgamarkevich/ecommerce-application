import React from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { ICard } from 'types/componentTypes';

const Card: FC<ICard> = ({ product, imgSrc, price, discountedPrice }) => {
  const getShortDescription = (text: string): string => {
    const space = ' ';
    let maxIndex = 50;
    while (text[maxIndex] !== space) {
      maxIndex--;
    }
    return `${text.slice(0, maxIndex)}...`;
  };

  return (
    <div
      className='flex m-2 w-1/5 min-w-220px rounded-2xl border border-c-sky-green
              transition-all duration-300
              hover:shadow-2xl hover:scale-105'
    >
      <Link to={`/product/${product.slug?.en}`} className='flex flex-col'>
        <div>
          <img src={imgSrc} alt='Product' className='rounded-2xl' />
        </div>

        <div className='flex flex-col flex-grow justify-between'>
          <p className='font-bold first-letter:uppercase'>{product.name?.en}</p>
          <p className='my-2'>
            {getShortDescription(product.description?.en ?? '')}
          </p>
          <div>
            <span className='font-bold text-xl mx-3'>{discountedPrice}$</span>
            <span className='text-gray-600 line-through text-sm'>{price}$</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;