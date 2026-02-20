import React from "react";

type Props = {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  categories: string[];
};

const CategoryFilter: React.FC<Props> = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="category-select" className="block mb-1 font-medium">
        Category
      </label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
