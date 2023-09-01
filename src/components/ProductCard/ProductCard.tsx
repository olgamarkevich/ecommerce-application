import React from 'react';
import type { FC } from 'react';
import type { IProductCard } from 'types/componentTypes';
import {
  getDiscountedPrice,
  getListImgSrc,
  getPrice,
  getVendor,
} from 'helpers/settingProduct';
import ImageSwiper from 'components/ImageSwiper/ImageSwiper';
import ProductDescription from 'components/ProductDescription/ProductDescription';

const ProductCard: FC<IProductCard> = ({ product }) => {
  const imgList = getListImgSrc(product);
  const price = getPrice(product);
  const discountPrice = getDiscountedPrice(product);
  const vendor = getVendor(product.masterVariant);
  return (
    <section className='py-5'>
      <div className='flex p-5 md:flex-col justify-center md:items-center'>
        <div className='w-1/3 md:w-full'>
          <div className='min-w-220px max-w-1000px'>
            <ImageSwiper images={imgList} />
          </div>
        </div>
        <div className='w-1/2 ml-10 md:ml-0 md:mt-10 md:w-auto'>
          <div>
            <div className='text-left font-thin font-f-open-sans text-blue-900'>
              {vendor}
            </div>
            <div className='font-bold text-2xl text-left text-blue-950'>
              {product.name?.en}
            </div>
          </div>
          <div className='my-5'>
            <div className='flex font-f-open-sans'>
              <div
                className={`${
                  discountPrice.toLowerCase() !== 'no price'
                    ? 'text-c-sale-red'
                    : 'text-blue-950'
                } font-bold text-2xl float-left ml-1 mr-4`}
              >
                $ {discountPrice}
              </div>
              {price.toLowerCase() !== 'no price' && (
                <>
                  <div className='h-max mt-auto mr-3 opacity-70 text-c-shadow-blue line-through'>
                    ${price}
                  </div>
                  <div className='h-max my-auto px-2 text-c-sky bg-c-light-blue rounded'>
                    SOLD OUT
                  </div>
                </>
              )}
            </div>
            <div className='mt-10'>
              <ProductDescription description={product.description?.en} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
