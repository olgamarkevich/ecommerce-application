import React from 'react';
import type { FC } from 'react';
import style from './CategoryMain.module.css';
import { NavLink } from 'react-router-dom';

const CategoryMain: FC = () => {
  return (
    <div className={style.category_main}>
      <div className={style.col}>
        <NavLink
          to='/products/beauty-care'
          className={`${style.category_main__item} ${style.item_1}`}
        >
          <div className={style.category_label}>Beauty & Care</div>
        </NavLink>
      </div>

      <div className={style.col}>
        <NavLink
          to='/products/home-kitchen'
          className={`${style.category_main__item} ${style.item_2}`}
        >
          <div className={style.category_label}>Home & Kitchen</div>
        </NavLink>
      </div>
      <div className={style.col}>
        <NavLink
          to='/products/audio-tech'
          className={`${style.category_main__item} ${style.item_3}`}
        >
          <div className={style.category_label}>Audio-tech</div>
        </NavLink>
      </div>
    </div>
  );
};

export default CategoryMain;
