import React from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { IProductCard } from 'types/componentTypes';
import type { IProductItem } from 'types/storeTypes';
import Title from 'components/Title/Title';

const ProductCard: FC<IProductCard> = ({ products, title }) => {
  return (
    <section>
      <Title text={title} size='large' />
      <div className='flex flex-wrap justify-between md:justify-center'>
        {products.map((product: IProductItem) => {
          return (
            <div
              className='flex m-2 w-1/5 min-w-220px rounded-2xl border border-c-sky-green
              transition-all duration-300
              hover:shadow-2xl hover:scale-105'
              key={product.id}
            >
              <Link to={`/product/${product.name}-${product.id}`}>
                <div>
                  <img
                    src={product.images[0]}
                    alt='Product'
                    className=' rounded-2xl'
                  />
                </div>

                <div>
                  <p className='font-bold first-letter:uppercase'>
                    {product.name}
                  </p>
                  <p>{product.shortDescription}</p>
                  <div className='flex justify-center'>
                    <span className='font-bold text-xl mx-3'>
                      {product.price}$
                    </span>
                    <span className='text-gray-600 line-through text-sm'>
                      {product.oldPrice}$
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
