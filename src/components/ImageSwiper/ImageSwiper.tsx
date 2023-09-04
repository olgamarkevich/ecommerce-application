import React, { useState } from 'react';
import type { FC } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Zoom, Thumbs, FreeMode } from 'swiper';
import ButtonClose from 'components/Buttons/ButtonClose/ButtonClose';
import { ReactComponent as FullScreenSVG } from '../../assets/svg/full-screen.svg';
import { ReactComponent as ZoomInSVG } from '../../assets/svg/zoom-in.svg';
import { ReactComponent as ZoomOutSVG } from '../../assets/svg/zoom-out.svg';

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
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
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

  const activeModal = () => {
    if (!isModal) {
      setModalActive(true);
      setZoomActive(true);
    }
  };

  const disableModal = () => {
    if (isModal) {
      setModalActive(false);
      disableZoomMode();
    }
  };

  const activeZoomMode = () => {
    if (mainSwiper) {
      if (isZoom) {
        mainSwiper.zoom.in();
        setZoomActive(false);
      }
    }
  };

  const disableZoomMode = () => {
    if (mainSwiper) {
      if (!isZoom) {
        mainSwiper.zoom.out();
        setZoomActive(true);
      }
    }
  };

  return (
    <div
      className={`${
        isModal
          ? 'flex flex-col justify-start items-center fixed h-screen w-screen top-0 left-0 z-50 bg-c-black-opacity-3'
          : 'min-w-220px max-w-1000px'
      }`}
    >
      <div
        className={`min-w-0 ${
          isModal
            ? ' max-w-medium-s md:max-w-small-xs m:max-w-little-s relative top-10'
            : ''
        }`}
      >
        {isModal && (
          <ButtonClose onClick={disableModal} className='-top-9 -right-9' />
        )}
        <Swiper
          navigation={true}
          onSwiper={setMainSwiper}
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
          onClick={activeModal}
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
          <div className='absolute z-10 w-10 bottom-0 right-0 bg-cyan-400 rounded-md'>
            {!isModal && (
              <FullScreenSVG
                className='stroke-sky-50 hover:stroke-c-light-blue transition-colors'
                onClick={activeModal}
              />
            )}
            {isModal &&
              (!isZoom ? (
                <ZoomOutSVG
                  className='stroke-sky-50 hover:stroke-c-light-blue transition-colors'
                  onClick={disableZoomMode}
                />
              ) : (
                <ZoomInSVG
                  className='stroke-sky-50 hover:stroke-c-light-blue transition-colors'
                  onClick={activeZoomMode}
                />
              ))}
          </div>
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
                  className='h-auto rounded cursor-pointer'
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
  );
};

export default ImageSwiper;
