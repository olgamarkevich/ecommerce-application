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
    <div className={'justify-self-stretch min-w-180px mb-5 p-2'}>
      <span>Categories</span>
      <ul>
        {categories.map((category) => {
          return (
            <li
              key={category.id}
              className={`filter_option w-full flex justify-between items-center gap-1 ${
                category.level === 1
                  ? 'pl-1'
                  : category.level === 2
                  ? 'pl-3'
                  : 'pl-5'
              } ${
                checkShouldBeShown(category.parentId)
                  ? 'scale-y-100 block'
                  : 'scale-y-0 hidden'
              } 
              rounded-2xl p-1 hover:scale-105 transition-all 
              ${category.isActive ? 'bg-sky-200' : ''} transition-all`}
              onClick={() => {
                setActive(category.id);
                toggleIsOpen(category.id);
              }}
            >
              <Link
                to={`/products/${category.slug}`}
                className={`rounded p-1 hover:scale-105 transition-all ${
                  category.isActive ? 'bg-sky-200' : ''
                }`}
              >
                {category.name}
              </Link>
              <div
                className={`filter__show-btn w-2.5 h-2.5 rounded ${
                  category.isOpen ? 'rotate-45' : '-rotate-45'
                } cursor-pointer ${
                  category.hasChildren ? 'block' : 'hidden'
                } border-b-solid border-b-2 border-b-gray-400 border-r-solid border-r-2 border-r-gray-400 mr-1`}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryTree;
