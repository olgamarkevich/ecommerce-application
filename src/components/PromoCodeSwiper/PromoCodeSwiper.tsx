import React from 'react';
import type { FC } from 'react';
import style from './PromoCodeSwiper.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';

const PromoCodeSwiper: FC = () => {
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
            <div className={style.promo_code}>First20</div>
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
            <div className={style.promo_code}>Sale10</div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={`${style.promo_slide} ${style.slide_3}`}>
          <div className={style.promo_wrapper}>
            <div className={style.promo_label}>today 15% discount on cart</div>
            <div className={style.promo_code}>Happy15</div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default PromoCodeSwiper;
