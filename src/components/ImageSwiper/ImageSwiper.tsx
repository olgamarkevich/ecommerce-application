import React, { useState } from 'react';
import type { FC } from 'react';
import type { Swiper as SwiperType } from 'swiper';
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

const ImageSwiper: FC<Props> = ({ images, maxThumbSlidesPerView = 4 }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [swiperIndexStart, setSwiperIndexStart] = useState(0);
  const maxSlidesPerView =
    images.length < maxThumbSlidesPerView
      ? images.length
      : maxThumbSlidesPerView;

  const handleThumbClick = (index: number) => {
    if (thumbsSwiper) {
      if (index === swiperIndexStart && swiperIndexStart !== 0) {
        thumbsSwiper.slideTo(swiperIndexStart - 1);
        setSwiperIndexStart(swiperIndexStart - 1);
      }
      if (
        index === maxSlidesPerView + swiperIndexStart - 1 &&
        index !== images.length - 1
      ) {
        thumbsSwiper.slideTo(index + 1);
        setSwiperIndexStart(swiperIndexStart + 1);
      }
    }
  };

  return (
    <>
      <Swiper
        navigation={true}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        zoom={true}
        spaceBetween={5}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[Navigation, Pagination, Zoom, Thumbs]}
        className='mb-4'
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
              <img
                src={src}
                alt=''
                className='h-full rounded cursor-pointer'
                onClick={() => {
                  return handleThumbClick(idx);
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
export default ImageSwiper;
