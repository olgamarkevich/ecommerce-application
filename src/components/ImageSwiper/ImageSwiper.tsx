import React from 'react';
import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

interface ISwiper {
  images: string[];
}

const ImageSwiper: FC<ISwiper> = ({ images }) => {
  return (
    <Swiper>
      {images.map((src) => {
        return (
          <SwiperSlide key={src}>
            <img src={src} alt='product' />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ImageSwiper;
