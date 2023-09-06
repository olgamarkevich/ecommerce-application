import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CategoryTreeSource } from '../types/storeTypes';

interface Catalog {
  categories: CategoryTreeSource[];
}

const initialState: Catalog = {
  categories: [],
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<CategoryTreeSource[]>) => {
      return {
        ...state,
        categories: [...action.payload],
      };
    },
    setIsActive: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return {
        ...state,
        categories: state.categories.map((category) => {
          return category.id === id
            ? { ...category, isActive: true }
            : { ...category, isActive: false };
        }),
      };
    },
    setIsOpen: (
      state,
      action: PayloadAction<{ id: string; isOpen: boolean }>,
    ) => {
      const { id, isOpen } = action.payload;
      let categories = [...state.categories];

      const close = (
        id: string,
        categories: CategoryTreeSource[],
      ): CategoryTreeSource[] => {
        categories = categories.map((category) => {
          return category.id === id ? { ...category, isOpen: false } : category;
        });
        categories
          .filter((category) => {
            return category.parentId === id;
          })
          .forEach((child) => {
            categories = close(child.id, categories);
          });

        return categories;
      };

      const open = (
        id: string,
        categories: CategoryTreeSource[],
      ): CategoryTreeSource[] => {
        categories = categories.map((category) => {
          return category.id === id ? { ...category, isOpen: true } : category;
        });

        const target = categories.find((category) => {
          return category.id === id;
        });

        if (target && target.parentId) {
          categories = open(target.parentId, categories);
        }

        return categories;
      };

      categories = isOpen ? open(id, categories) : close(id, categories);

      return { ...state, categories };
    },
  },
});

export const { setCategories, setIsActive, setIsOpen } = catalogSlice.actions;

export default catalogSlice.reducer;
