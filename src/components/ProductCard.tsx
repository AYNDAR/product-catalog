import React from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types/products";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate(); // ✅ Inside component

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded shadow hover:shadow-xl transition duration-300 cursor-pointer p-4"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain mb-4"
      />

      <h2 className="text-lg font-semibold line-clamp-2">{product.name}</h2>

      <div className="flex items-center text-yellow-500 text-sm">
        ⭐ {product.rating}
      </div>

      <p className="text-xl font-bold mt-2 text-gray-800">${product.price}</p>
    </div>
  );
};

export default ProductCard;
