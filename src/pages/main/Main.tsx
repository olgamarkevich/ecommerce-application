import CategoryMain from 'components/CategoryMain/CategoryMain';
import PromoCodeSwiper from 'components/PromoCodeSwiper/PromoCodeSwiper';
import React from 'react';
import type { FC } from 'react';

const Main: FC = () => {
  return (
    <>
      <PromoCodeSwiper />
      <CategoryMain />
    </>
  );
};

export default Main;
