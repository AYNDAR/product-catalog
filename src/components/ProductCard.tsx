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
      onClick={() => navigate(`/product/${product.id}`)} // ✅ Navigation added
      className="bg-white rounded shadow-md p-4 cursor-pointer
                 hover:shadow-xl
                 hover:scale-105
                 transition-transform duration-300"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />

      <h2 className="text-lg font-bold mt-2">{product.name}</h2>

      <p className="text-gray-600 font-semibold">${product.price}</p>
    </div>
  );
};

export default ProductCard;
