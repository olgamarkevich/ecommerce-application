import React from 'react';
import type { FC } from 'react';
import type { IProductCard } from 'types/componentTypes';
import {
  getDiscountedPrice,
  getListImgSrc,
  getPrice,
  getVendor,
  getAttributeOptions,
  getVariantToShow,
  getSale,
  getProductSku,
} from 'helpers/settingProduct';
import ImageSwiper from 'components/ImageSwiper/ImageSwiper';
import ProductDescription from './ProductDescription/ProductDescription';
import { useSearchParams } from 'react-router-dom';
import AttributesForm from './AttributesForm/AttributesForm';
import CartButton from '../Buttons/CartButton/CartButton';

const ProductCard: FC<IProductCard> = ({ product }) => {
  const [searchParams] = useSearchParams();
  const attributeOptions = getAttributeOptions(product);
  const { index: variantToShowIndex, options: chosenOptions } =
    getVariantToShow(product, attributeOptions, searchParams);
  const imgList = getListImgSrc(product);
  const price = getPrice(product, variantToShowIndex);
  const discountPrice = getDiscountedPrice(product, variantToShowIndex);
  const sale = getSale(price, discountPrice);
  const vendor = getVendor(product.masterVariant);
  const sku = getProductSku(product, variantToShowIndex);

  return (
    <section>
      <div className='flex p-5 md:flex-col justify-center md:items-center'>
        <div className='w-30% md:w-3/4 sm:w-full'>
          <div>
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
              {discountPrice.toLowerCase() !== 'no price' ? (
                <>
                  <div className='font-bold text-2xl float-left ml-1 mr-4 text-c-sale-red'>
                    $ {discountPrice}
                  </div>
                  <div className='h-max mt-auto mr-3 opacity-70 text-c-shadow-blue line-through'>
                    ${price}
                  </div>
                </>
              ) : (
                <div className='font-bold text-2xl float-left text-blue-950 mr-3'>
                  $ {price}
                </div>
              )}
              <div
                className={`h-max my-auto px-2 text-c-sky ${
                  !sale ? 'bg-c-light-blue' : 'bg-c-sale-red'
                } rounded`}
              >
                {sale ? `SAVE ${sale}` : ''}
              </div>
            </div>
            <div className='my-2'>
              <AttributesForm
                attributeOptions={attributeOptions}
                chosenOptions={chosenOptions}
                variantIndex={variantToShowIndex}
              />
            </div>
            <div>
              <CartButton sku={sku} />
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
