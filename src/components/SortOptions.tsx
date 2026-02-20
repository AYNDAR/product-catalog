import React from "react";

type Props = {
  sortOrder: string;
  setSortOrder: (value: string) => void;
};

const SortOptions: React.FC<Props> = ({ sortOrder, setSortOrder }) => {
  return (
    <div className="mb-4">
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
      </select>
    </div>
  );
};

export default SortOptions;
