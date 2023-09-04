import React from 'react';
import type { FC } from 'react';
import type { IProductCardList } from 'types/componentTypes';
import Card from 'components/Card/Card';
import {
  getDiscountedPrice,
  getListImgSrc,
  getPrice,
} from 'helpers/settingProduct';

const CardList: FC<IProductCardList> = ({ products }) => {
  return (
    <section className='py-5'>
      <div className=' grid grid-cols-auto gap-3 justify-evenly md:gap-y-3 md:items-center'>
        {products.map((product) => {
          const imgSrcList = getListImgSrc(product);
          const price = getPrice(product);
          const discountedPrice = getDiscountedPrice(product);

          return (
            <Card
              product={product}
              imgSrcList={imgSrcList}
              price={price}
              discountedPrice={discountedPrice}
              key={product.id}
            />
          );
        })}
      </div>
    </section>
  );
};

export default CardList;
