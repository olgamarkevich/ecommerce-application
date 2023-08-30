import React, { type FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setIsActive, setIsOpen } from '../../store/catalogSlice';

const CategoryTree: FC = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => {
    return state.catalog;
  });

  const checkShouldBeShown = (id: string | null) => {
    const parent = categories.find((category) => {
      return category.id === id;
    });

    return parent ? parent.isOpen : true;
  };

  const toggleIsOpen = (id: string) => {
    const target = categories.find((category) => {
      return category.id === id;
    });

    dispatch(setIsOpen({ id, isOpen: !target?.isOpen }));
  };

  const setActive = (id: string) => {
    dispatch(setIsActive(id));
  };

  return (
    <div className={'justify-self-stretch min-w-180px'}>
      <ul>
        Categories
        {categories.map((category) => {
          return (
            <li
              key={category.id}
              className={`w-full flex justify-between gap-1 ${
                category.level === 1
                  ? 'pl-1'
                  : category.level === 2
                  ? 'pl-3'
                  : 'pl-5'
              } ${
                checkShouldBeShown(category.parentId)
                  ? 'scale-x-100 block'
                  : 'scale-y-0 hidden'
              } transition-all`}
            >
              <Link
                to={`/products/${category.slug}`}
                className={`rounded p-1 hover:scale-105 transition-all ${
                  category.isActive ? 'bg-sky-200' : ''
                }`}
                onClick={() => {
                  setActive(category.id);
                }}
              >
                {category.name}
              </Link>
              <div
                className={`cursor-pointer ${
                  category.isOpen ? 'rotate-90' : 'rotate-0'
                } hover:scale-105`}
                onClick={() => {
                  toggleIsOpen(category.id);
                }}
              >
                {category.hasChildren ? '\uFE65' : ''}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryTree;
