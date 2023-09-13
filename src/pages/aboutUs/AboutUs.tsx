import Title from 'components/Title/Title';
import React from 'react';
import type { FC } from 'react';
import style from './AboutUs.module.css';

const AboutUs: FC = () => {
  return (
    <>
      <Title text='About us' size='large' />
      <div className={style.aboutUs_wrapper}>
        <div className={style.col}>
          <div className={style.about_us_item}>
            <div className={style.about_us_img}>
              <img src='' alt='' />
            </div>
            <div className={style.about_us_user}>Olga Markevich</div>
            <div className={style.about_us_location}>Minsk</div>
            <div className={style.about_us_position}>Frontend developer</div>
          </div>
        </div>
        <div className={style.col}>
          <div className={style.about_us_item}>
            <div className={style.about_us_img}>
              <img src='../../assets/abous_us/user_2.jpg' alt='' />
            </div>
            <div className={style.about_us_user}>Oleksiy Chuguyenko</div>
            <div className={style.about_us_location}>Zaporizhzhia</div>
            <div className={style.about_us_position}>Frontend developer</div>
          </div>
        </div>
        <div className={style.col}>
          <div className={style.about_us_item}>
            <div className={style.about_us_img}>
              <img src='../../assets/abous_us/user_3.png' alt='' />
            </div>
            <div className={style.about_us_user}>Andrey Odinec</div>
            <div className={style.about_us_location}>Gomel</div>
            <div className={style.about_us_position}>Frontend developer</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
