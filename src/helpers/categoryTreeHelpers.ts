import type { Category } from '@commercetools/platform-sdk';
import type { CategoryTreeSource } from '../types/storeTypes';

export const getCategoryItems = (
  sourceArr: Category[],
  resultArr: CategoryTreeSource[],
  parentId: string | null,
  level: number,
) => {
  sourceArr
    .filter((category) => {
      return parentId === null
        ? !('parent' in category)
        : category.parent?.id === parentId;
    })
    .sort((categoryA, categoryB) => {
      return +categoryA.orderHint - +categoryB.orderHint;
    })
    .forEach((category) => {
      resultArr.push({
        id: category.id,
        name: category.name.en,
        description: category.description ? category.description.en : '',
        slug: category.slug.en,
        parentId,
        level,
        isActive: false,
        isOpen: false,
        hasChildren: false,
      });
      getCategoryItems(sourceArr, resultArr, category.id, level + 1);
    });
};

export const markCategoryActive = (
  resultArr: CategoryTreeSource[],
  categorySlug: string,
) => {
  resultArr.forEach((category) => {
    category.isActive = category.slug === categorySlug;
  });
};

export const markCategoryOpen = (resultArr: CategoryTreeSource[]) => {
  const markOpen = (id: string | null) => {
    if (id === null) return;

    const target = resultArr.find((category) => {
      return category.id === id;
    });

    if (target) {
      target.isOpen = true;
      markOpen(target.parentId);
    }
  };

  const activeCategory = resultArr.find((category) => {
    return category.isActive;
  });
  const parentId = activeCategory ? activeCategory.parentId : null;

  if (parentId) {
    markOpen(parentId);
  }
};

export const checkCategoryChildren = (resultArr: CategoryTreeSource[]) => {
  resultArr.forEach((category) => {
    const id = category.id;
    category.hasChildren =
      resultArr.filter((category) => {
        return category.parentId === id;
      }).length > 0;
  });
};
