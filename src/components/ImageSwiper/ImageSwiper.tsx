import React from 'react';
import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Zoom } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';

interface Props {
  images: string[];
}

const ImageSwiper: FC<Props> = ({ images }) => {
  return (
    <Swiper
      navigation={true}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      zoom={true}
      modules={[Navigation, Pagination, Zoom]}
    >
      {images.map((src, idx) => {
        return (
          <SwiperSlide key={idx}>
            <div className='swiper-zoom-container'>
              <img src={src} alt='' className='w-full' />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
export default ImageSwiper;
