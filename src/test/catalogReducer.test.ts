import reducer, {
  setCategories,
  setIsActive,
  setIsOpen,
} from '../store/catalogSlice';
import type { CategoryTreeSource } from '../types/storeTypes';

interface Catalog {
  categories: CategoryTreeSource[];
}

const emptyCatalog = {
  categories: [],
};

const categories = [
  {
    id: 'id',
    name: 'name',
    description: 'description',
    slug: 'slug',
    parentId: null,
    level: 0,
    isActive: false,
    isOpen: false,
    hasChildren: true,
  },
];

const someCatalog: Catalog = {
  categories,
};

describe('catalogReducer should work correctly', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(emptyCatalog);
  });

  test('setCategories should set new catalog data', () => {
    expect(reducer(emptyCatalog, setCategories(categories))).toEqual(
      someCatalog,
    );
    expect(reducer(someCatalog, setCategories([]))).toEqual(emptyCatalog);
  });

  test('setIsActive should set active category', () => {
    expect(reducer(someCatalog, setIsActive('id'))).toEqual({
      categories: [
        {
          id: 'id',
          name: 'name',
          description: 'description',
          slug: 'slug',
          parentId: null,
          level: 0,
          isActive: true,
          isOpen: false,
          hasChildren: true,
        },
      ],
    });
  });

  test('setIsOpen should set open/close category', () => {
    expect(reducer(someCatalog, setIsOpen({ id: 'id', isOpen: true }))).toEqual(
      {
        categories: [
          {
            id: 'id',
            name: 'name',
            description: 'description',
            slug: 'slug',
            parentId: null,
            level: 0,
            isActive: false,
            isOpen: true,
            hasChildren: true,
          },
        ],
      },
    );

    expect(
      reducer(
        {
          categories: [
            {
              id: 'id',
              name: 'name',
              description: 'description',
              slug: 'slug',
              parentId: null,
              level: 0,
              isActive: false,
              isOpen: true,
              hasChildren: true,
            },
          ],
        },
        setIsOpen({ id: 'id', isOpen: false }),
      ),
    ).toEqual(someCatalog);
  });
});
