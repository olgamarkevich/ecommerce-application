import React from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { IProductCard } from 'types/componentTypes';
import Title from 'components/Title/Title';

const ProductCard: FC<IProductCard> = ({ products, title }) => {
  const getShortDescription = (text: string): string => {
    const space = ' ';
    let maxIndex = 50;
    while (text[maxIndex] !== space) {
      maxIndex--;
    }
    return `${text.slice(0, maxIndex)}...`;
  };

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
            <div
              className='flex m-2 w-1/5 min-w-220px rounded-2xl border border-c-sky-green
              transition-all duration-300
              hover:shadow-2xl hover:scale-105'
              key={product.id}
            >
              <Link
                to={`/product/${product.slug?.en}`}
                className='flex flex-col'
              >
                <div>
                  <img src={imgSrc} alt='Product' className='rounded-2xl' />
                </div>

                <div className='flex flex-col flex-grow justify-between'>
                  <p className='font-bold first-letter:uppercase'>
                    {product.name?.en}
                  </p>
                  <p className='my-2'>
                    {getShortDescription(product.description?.en ?? '')}
                  </p>
                  <div>
                    <span className='font-bold text-xl mx-3'>
                      {discountedPrice}$
                    </span>
                    <span className='text-gray-600 line-through text-sm'>
                      {price}$
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductCard;
