import type {
  ProductProjection,
  ProductVariant,
} from '@commercetools/platform-sdk';

import type { AttributeOptionsSet } from '../types/componentTypes';

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

export const getPrice = (product: Product, variantIndex?: number) => {
  const masterVariantPrice =
    product.masterVariant &&
    product.masterVariant.prices &&
    product.masterVariant.prices[0]
      ? String(+product.masterVariant.prices[0].value.centAmount / 100)
      : 'No price';

  if (
    variantIndex &&
    variantIndex > 0 &&
    product.variants &&
    variantIndex - 1 < product.variants.length &&
    product.variants[variantIndex - 1] &&
    product.variants[variantIndex - 1].prices !== undefined
  ) {
    const variantPrices = product.variants[variantIndex - 1].prices;

    return variantPrices
      ? String(+variantPrices[0].value.centAmount / 100)
      : 'No price';
  }

  return masterVariantPrice;
};

export const getDiscountedPrice = (product: Product, variantIndex?: number) => {
  const masterVariantPrice =
    product.masterVariant &&
    product.masterVariant.prices &&
    product.masterVariant.prices[0] &&
    product.masterVariant.prices[0].discounted
      ? String(
          +product.masterVariant.prices[0].discounted.value.centAmount / 100,
        )
      : 'No price';

  if (
    variantIndex &&
    variantIndex > 0 &&
    product.variants &&
    variantIndex - 1 < product.variants.length &&
    product.variants[variantIndex - 1] &&
    product.variants[variantIndex - 1].prices !== undefined
  ) {
    const variantPrices = product.variants[variantIndex - 1].prices;

    return variantPrices && variantPrices[0].discounted
      ? String(+variantPrices[0].discounted.value.centAmount / 100)
      : 'No price';
  }

  return masterVariantPrice;
};

export const getVendor = (variant: Variant) => {
  if (!variant) return '';
  const vendor = variant.attributes?.find((attr) => {
    return attr.name.toLowerCase() === 'vendor';
  });

  return vendor ? vendor.value.en : '';
};

export const getAttributeOptions = (product: Product): AttributeOptionsSet => {
  const attributeOptions: AttributeOptionsSet = {};
  const attributeNames =
    product.masterVariant && product.masterVariant.attributes
      ? product.masterVariant.attributes
          .map((attributeObj) => {
            return attributeObj.name;
          })
          .filter((name) => {
            return name.toLowerCase() !== 'vendor';
          })
      : [];

  return attributeNames.reduce((acc, attributeName) => {
    acc[attributeName] = [];
    const masterVariant =
      product.masterVariant && product.masterVariant.attributes
        ? product.masterVariant.attributes.find((attributeObj) => {
            return attributeObj.name === attributeName;
          })
        : null;

    if (masterVariant) {
      acc[attributeName].push(
        typeof masterVariant.value === 'object' && 'en' in masterVariant.value
          ? masterVariant.value.en
          : String(masterVariant.value),
      );
    }

    if (product.variants) {
      const variantsAttributes = product.variants.map((variant) => {
        return variant.attributes ? variant.attributes : null;
      });

      variantsAttributes.forEach((attributes) => {
        const attribute = attributes
          ? attributes.find((attributeObj) => {
              return attributeObj.name === attributeName;
            })
          : null;

        if (attribute) {
          const value =
            typeof attribute.value === 'object' && 'en' in attribute.value
              ? attribute.value.en
              : String(attribute.value);

          if (!acc[attributeName].includes(value)) {
            acc[attributeName].push(value);
          }
        }
      });
    }

    return acc;
  }, attributeOptions);
};

export const getVariantToShow = (
  product: Product,
  attributeOptions: AttributeOptionsSet,
  searchParams: URLSearchParams,
): { index: number; options?: Record<string, string> } => {
  const attributesNames = Object.keys(attributeOptions);
  const params: Record<string, string> = {};

  if (searchParams.size !== attributesNames.length) return { index: 0 };

  searchParams.forEach((value, key) => {
    if (
      attributesNames.includes(key) &&
      attributeOptions[key].includes(value)
    ) {
      params[key] = value;
    }
  });

  if (Object.keys(params).length !== attributesNames.length) {
    return { index: 0 };
  }

  const index = product.variants
    ? product.variants.reduce((acc, variant, variantIndex) => {
        return Object.keys(params).every((attributeName) => {
          const attributeValue = params[attributeName];
          const variantAttribute = variant.attributes
            ? variant.attributes.find((attributeObj) => {
                return attributeObj.name === attributeName;
              })
            : undefined;

          if (!variantAttribute) return false;

          const value =
            typeof variantAttribute.value === 'object' &&
            'en' in variantAttribute.value
              ? variantAttribute.value.en
              : String(variantAttribute.value);

          return value === attributeValue;
        })
          ? variantIndex
          : acc;
      }, -1)
    : -1;

  return { index: index + 1, options: params };
};
