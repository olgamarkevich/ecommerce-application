import React from 'react';
import type { FC } from 'react';
import style from './PromoCodeSwiper.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { showTextInfo } from 'store/appSlice';
import { useAppDispatch } from 'hooks/hooks';

const PromoCodeSwiper: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination, Autoplay]}
      loop={true}
      autoplay={{ delay: 5000 }}
    >
      <SwiperSlide>
        <div className={`${style.promo_slide} ${style.slide_1}`}>
          <div className={style.promo_wrapper}>
            <div className={style.promo_label}>20% off your first order</div>
            <button
              onClick={() => {
                navigator.clipboard.writeText('First20');
                dispatch(showTextInfo('First20 copied to clipboard'));
              }}
              className={style.promo_code}
            >
              <span>First20</span>
            </button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={`${style.promo_slide} ${style.slide_2}`}>
          <div className={style.promo_wrapper}>
            <div className={style.promo_label}>
              10% off
              <br /> any order
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText('Sale10');
                dispatch(showTextInfo('Sale10 copied to clipboard'));
              }}
              className={style.promo_code}
            >
              <span>Sale10</span>
            </button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={`${style.promo_slide} ${style.slide_3}`}>
          <div className={style.promo_wrapper}>
            <div className={style.promo_label}>today 15% discount on cart</div>
            <button
              onClick={() => {
                navigator.clipboard.writeText('Happy15');
                dispatch(showTextInfo('Happy15 copied to clipboard'));
              }}
              className={style.promo_code}
            >
              <span>Happy15</span>
            </button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default PromoCodeSwiper;
