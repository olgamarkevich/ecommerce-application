import React from 'react';
import type { FC } from 'react';
import type { IProductCardList } from 'types/componentTypes';
import Title from 'components/Title/Title';
import Card from 'components/Card/Card';
import {
  getDiscountedPrice,
  getImgSrc,
  getPrice,
} from 'helpers/settingProduct';

const CardList: FC<IProductCardList> = ({ products, title }) => {
  return (
    <section className='py-5 px-4'>
      <Title text={title} size='large' />
      <div className='flex flex-wrap justify-between md:justify-center'>
        {products.map((product) => {
          const imgSrc = getImgSrc(product);
          const price = getPrice(product);
          const discountedPrice = getDiscountedPrice(product);

          return (
            <Card
              product={product}
              imgSrc={imgSrc}
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
