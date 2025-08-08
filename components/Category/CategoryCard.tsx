// components/CategoryCard.tsx
'use client';

import React from 'react';

type SubCategory = {
  name: string;
  id: string;
};

type Category = {
  id: string;
  name: string;
  SubCategories: SubCategory[];
};

type Props = {
  category: Category;
  onAddSubCategoryClick: (categoryId: string) => void;
};

const CategoryCard = ({ category, onAddSubCategoryClick }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">{category.name}</h2>
        <button
          className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => onAddSubCategoryClick(category.id)}
        >
          + Add
        </button>
      </div>
      <ul className="space-y-2">
        {category.SubCategories.map((sub, i) => (
          <li
            key={i}
            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full inline-block text-sm"
          >
            {sub.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryCard;
