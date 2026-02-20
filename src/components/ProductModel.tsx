import React from "react";
import type { Product } from "../types/products";

interface Props {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<Props> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✖
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded"
        />
        <h2 className="text-xl font-bold mt-4">{product.name}</h2>
        <p className="text-gray-600 mt-2">${product.price}</p>
        <p className="mt-2 text-gray-700">Category: {product.category}</p>
      </div>
    </div>
  );
};

export default ProductModal;
