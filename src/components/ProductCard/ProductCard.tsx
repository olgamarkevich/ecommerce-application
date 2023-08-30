import React from 'react';
import type { FC } from 'react';
import type { IProductCard } from 'types/componentTypes';
import {
  getDiscountedPrice,
  getListImgSrc,
  getPrice,
} from 'helpers/settingProduct';
import ImageSwiper from 'components/ImageSwiper/ImageSwiper';

const ProductCard: FC<IProductCard> = ({ product }) => {
  const imgList = getListImgSrc(product);
  const price = getPrice(product);
  const discountPrice = getDiscountedPrice(product);
  return (
    <section className='flex p-5 md:flex-col md:items-center'>
      <div className='w-1/2 md:w-full'>
        <div className='min-w-220px max-w-1000px'>
          <ImageSwiper images={imgList} />
        </div>
      </div>
      <div className='w-1/2 ml-10 md:ml-0'>
        <div>
          <h3 className='font-bold text-2xl text-left text-stone-700'>
            {product.name?.en}
          </h3>
        </div>
        <div className='my-5'>
          <div className='flex font-f-open-sans'>
            <div
              className={`${
                discountPrice.toLowerCase() !== 'no price'
                  ? 'text-c-sale-red'
                  : 'text-stone-800'
              }text-c-sale-red font-bold text-2xl float-left ml-1 mr-4`}
            >
              $ {price}
            </div>
            {discountPrice.toLowerCase() !== 'no price' && (
              <>
                <div className='h-max opacity-70 text-c-shadow-blue line-through mt-auto'>
                  ${discountPrice}
                </div>
                <div className=' text-center'>SOLD OUT</div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
