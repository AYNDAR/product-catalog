import React from "react";

type Props = {
  sortOrder: string;
  setSortOrder: (value: string) => void;
  // We keep these in Props if App.tsx still passes them,
  // but we don't need them for the UI anymore if you want it simplified.
  minRating: number;
  setMinRating: (rating: number) => void;
};

const SortOptions: React.FC<Props> = ({ sortOrder, setSortOrder }) => {
  return (
    <div className="mb-6 space-y-4">
      {/* Sorting Section */}
      <div>
        <label
          htmlFor="sortOrder"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Sort Products
        </label>

        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Sort By</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
          <option value="rating">Rating: High → Low</option>
        </select>
      </div>

      {/* The Rating Filter Section was removed from here 
          because it is now handled by the Sort By dropdown logic */}
    </div>
  );
};

export default SortOptions;
