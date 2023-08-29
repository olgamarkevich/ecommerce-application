import React from 'react';
import type { FC } from 'react';
import type { IProductCard } from 'types/componentTypes';
import { getListImgSrc } from 'helpers/settingProduct';
import ImageSwiper from 'components/ImageSwiper/ImageSwiper';

const ProductCard: FC<IProductCard> = ({ product }) => {
  const imgList = getListImgSrc(product);
  return (
    <section>
      <div className='product-left'>
        <div className='product-gallery'>
          <ImageSwiper images={imgList} />
        </div>
      </div>
      <div className='product-right'>
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
