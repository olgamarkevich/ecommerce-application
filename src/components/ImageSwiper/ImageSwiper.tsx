import React, { useState } from 'react';
import type { FC } from 'react';
import type { Swiper as SwiperType } from 'swiper';
//import type { SwiperProps } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Zoom, Thumbs, FreeMode } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import 'swiper/css/thumbs';

import './ImageSwiper.css';

interface Props {
  images: string[];
  maxThumbSlidesPerView?: number;
}

const ImageSwiper: FC<Props> = ({ images, maxThumbSlidesPerView = 5 }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const maxSlidesPerView =
    images.length < maxThumbSlidesPerView
      ? images.length
      : maxThumbSlidesPerView;
  return (
    <>
      <Swiper
        navigation={true}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        zoom={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[Navigation, Pagination, Zoom, Thumbs]}
        className='my-4'
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
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={15}
        slidesPerView={maxSlidesPerView}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='swiperThumb'
      >
        {images.map((src, idx) => {
          return (
            <SwiperSlide key={idx}>
              <img src={src} alt='' className='h-full rounded' />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
export default ImageSwiper;
