import React from 'react';
import type { FC } from 'react';
import type { IProductCard } from 'types/componentTypes';
import { getListImgSrc } from 'helpers/settingProduct';
import ImageSwiper from 'components/ImageSwiper/ImageSwiper';

const ProductCard: FC<IProductCard> = ({ product }) => {
  const imgList = getListImgSrc(product);
  return (
    <section className='flex p-5 md:flex-col md:items-center'>
      <div className='w-1/2 md:w-full'>
        <div className='min-w-220px max-w-1000px'>
          <ImageSwiper images={imgList} />
        </div>
      </div>
      <div className='w-1/2'>
        <div className='product-header'>
          <p>
            {product.masterVariant &&
              product.masterVariant.attributes &&
              product.masterVariant.attributes[0].name}
          </p>
          <p>{product.name?.en}</p>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
