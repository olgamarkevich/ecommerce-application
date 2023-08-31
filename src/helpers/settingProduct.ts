import type {
  ProductProjection,
  ProductVariant,
} from '@commercetools/platform-sdk';

type Product = Partial<ProductProjection>;
type Variant = Partial<ProductVariant> | undefined;

export const getImgSrc = (product: Product) => {
  const imgName =
    product.masterVariant &&
    product.masterVariant.images &&
    product.masterVariant.images[0].url
      ? product.masterVariant.images[0].url
      : 'abb_1.jpg';
  return `/store/productImages/${imgName}`;
};

export const getListImgSrc = (product: Product) => {
  const imgNameList = product.masterVariant?.images;
  if (imgNameList)
    return imgNameList.map((img) => {
      return `/store/productImages/${img.url}`;
    });
  return [`/store/productImages/abb_1.jpg`];
};

export const getPrice = (product: Product) => {
  return product.masterVariant &&
    product.masterVariant.prices &&
    product.masterVariant.prices[0]
    ? String(+product.masterVariant.prices[0].value.centAmount / 100)
    : 'No price';
};

export const getDiscountedPrice = (product: Product) => {
  return product.masterVariant &&
    product.masterVariant.prices &&
    product.masterVariant.prices[0] &&
    product.masterVariant.prices[0].discounted
    ? String(+product.masterVariant.prices[0].discounted.value.centAmount / 100)
    : 'No price';
};

export const getVendor = (variant: Variant) => {
  if (!variant) return '';
  const vendor = variant.attributes?.find((attr) => {
    return attr.name.toLowerCase() === 'vendor';
  });

  return vendor ? vendor.value.en : '';
};
