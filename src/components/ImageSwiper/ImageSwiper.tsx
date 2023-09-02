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

export interface ImageSwiperProps {
  images: string[];
  maxThumbSlidesPerView?: number;
}

const ImageSwiper: FC<ImageSwiperProps> = ({
  images,
  maxThumbSlidesPerView = 4,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [swiperIndexStart, setSwiperIndexStart] = useState(0);
  const [isModal, setModalActive] = useState(false);
  const [isZoom, setZoomActive] = useState(false);

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

  const activeModal = (swiper: SwiperType) => {
    if (!isModal) {
      setModalActive(true);
      setZoomActive(true);
    }
    if (isModal) {
      if (isZoom) {
        swiper.zoom.in();
        setZoomActive(false);
      } else {
        swiper.zoom.out();
        setZoomActive(true);
      }
    }
  };

  const disableModal = () => {
    if (isModal) {
      setModalActive(false);
      setZoomActive(false);
    }
  };

  return (
    <div
      className={`${
        isModal
          ? 'flex flex-col justify-start items-center fixed h-screen w-screen top-0 left-0 z-50 bg-c-black-opacity-3'
          : 'min-w-220px max-w-1000px'
      }`}
      onClick={() => {
        disableModal();
      }}
    >
      <div
        className={`relative top-16 min-w-0 ${isModal ? 'max-w-60vh' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <Swiper
            navigation={true}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            spaceBetween={5}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[Navigation, Pagination, Zoom, Thumbs]}
            onDoubleClick={(swiper) => {
              activeModal(swiper);
            }}
            zoom={{ toggle: false }}
            className={`mb-4 ${isModal ? '' : 'cursor-pointer'}`}
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
                <SwiperSlide
                  key={idx}
                  className={`${isModal ? 'max-w-24' : 'max-w-20% max-h-20%'}`}
                >
                  <img
                    src={src}
                    alt=''
                    className='h-full rounded cursor-pointer'
                    onClick={() => {
                      handleThumbClick(idx);
                    }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ImageSwiper;
