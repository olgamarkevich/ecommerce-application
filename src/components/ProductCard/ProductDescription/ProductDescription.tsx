import React from 'react';
import type { FC } from 'react';
import { ReactComponent as RecycledSVG } from '../../../assets/svg/recycled-packaging.svg';
import { ReactComponent as PlasticFreeSvg } from '../../../assets/svg/plastic-free.svg';

interface ProductDescriptionProps {
  description: string | undefined;
}

const ProductDescription: FC<ProductDescriptionProps> = ({ description }) => {
  return (
    <>
      <div className='font-bold text-2xl text-blue-950'>Description</div>
      <div className='p-5'>
        <div className='text-blue-950 text-justify'>{description ?? ''}</div>
      </div>
      <div className='flex justify-around w-auto text-blue-900'>
        <div className='flex items-center h-20'>
          <RecycledSVG className='h-auto' />
          Recycled
          <br />
          Packaging
        </div>
        <div className='flex items-center h-20'>
          <PlasticFreeSvg className='h-auto' />
          Plastic Free
        </div>
      </div>
    </>
  );
};

export default ProductDescription;
