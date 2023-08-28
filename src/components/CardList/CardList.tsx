import React from 'react';
import type { FC } from 'react';
import type { IProductCardList } from 'types/componentTypes';
import Title from 'components/Title/Title';
import ProductCard from 'components/ProductCard/ProductCard';

const CardList: FC<IProductCardList> = ({ products, title }) => {
  return (
    <section>
      <Title text={title} size='large' />
      <div className='flex flex-wrap justify-between md:justify-center'>
        {products.map((product) => {
          const imgName =
            product.masterVariant &&
            product.masterVariant.images &&
            product.masterVariant.images[0].url
              ? product.masterVariant.images[0].url
              : 'abb_1.jpg';
          const imgSrc = `/store/productImages/${imgName}`;
          const price =
            product.masterVariant &&
            product.masterVariant.prices &&
            product.masterVariant.prices[0]
              ? String(+product.masterVariant.prices[0].value.centAmount / 100)
              : 'No price';
          const discountedPrice =
            product.masterVariant &&
            product.masterVariant.prices &&
            product.masterVariant.prices[0] &&
            product.masterVariant.prices[0].discounted
              ? String(
                  +product.masterVariant.prices[0].discounted.value.centAmount /
                    100,
                )
              : 'No price';

          return (
            <ProductCard
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
