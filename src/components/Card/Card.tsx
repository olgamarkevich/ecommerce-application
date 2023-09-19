import React, { useState } from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { ICard } from 'types/componentTypes';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import CartButton from '../Buttons/CartButton/CartButton';
import AttributeBlock from '../AttributeBlock/AttributeBlock';

const Card: FC<ICard> = ({ product, imgSrcList, price, discountedPrice }) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const getShortDescription = (text: string): string => {
    const space = ' ';
    let maxIndex = 50;
    while (text[maxIndex] !== space) {
      maxIndex--;
    }
    return `${text.slice(0, maxIndex)}...`;
  };

  const handleMouseEnter = () => {
    if (swiper) {
      swiper.autoplay.start();
    }
  };

  const handleMouseLeave = () => {
    if (swiper) {
      swiper.autoplay.stop();
    }
  };

  return (
    <div
      className='pb-1 flex flex-col justify-between w-1/5 min-w-240px rounded-2xl border border-c-sky-green
              transition-all duration-300
              hover:shadow-2xl hover:scale-105'
    >
      <Link
        to={`/product/${product.slug?.en}`}
        className='grow flex flex-col min-w-0'
      >
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Swiper
            onSwiper={(s) => {
              return setSwiper(s);
            }}
            spaceBetween={10}
            autoplay={false}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
          >
            {imgSrcList.map((imgSrc, idx) => {
              return (
                <SwiperSlide key={idx} className='rounded-2xl'>
                  <img src={imgSrc} alt='Product' className='rounded-2xl' />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className='grow flex flex-col justify-between p-3'>
          <p className='font-bold first-letter:uppercase'>{product.name?.en}</p>
          <div className='my-2 self-start'>
            <AttributeBlock
              product={product}
              sku={product.masterVariant?.sku || ''}
              shortDescription={getShortDescription(
                product.description?.en ?? '',
              )}
            />
          </div>
          <div>
            {discountedPrice.toLowerCase() !== 'no price' ? (
              <>
                <span className='font-bold text-xl mx-3'>
                  {discountedPrice}$
                </span>
                <span className='text-gray-600 line-through text-sm'>
                  {price}$
                </span>
              </>
            ) : (
              <span className='font-bold text-xl mx-3'>{price}$</span>
            )}
          </div>
        </div>
      </Link>
      <div className={'mx-auto'}>
        <CartButton sku={product.masterVariant?.sku || ''} />
      </div>
    </div>
  );
};

export default Card;
