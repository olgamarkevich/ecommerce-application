import React from 'react';
import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface Props {
  images: string[];
}

const ImageSwiper: FC<Props> = ({ images }) => {
  return (
    <Swiper>
      {images.map((src, idx) => {
        return (
          <SwiperSlide key={idx}>
            <img src={src} alt='' />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
export default ImageSwiper;
