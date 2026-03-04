import React from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types/products";
import { useCart } from "../context/CartContext";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ✅ Hook must be inside component

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer hover:-translate-y-1">
      <img
        src={product.image}
        alt={product.name}
        onClick={() => navigate(`/product/${product.id}`)}
        className="w-full h-48 object-cover mb-4 bg-black"
      />

      <div className="px-4 pb-4">
        <h2 className="text-lg font-semibold line-clamp-1">{product.name}</h2>

        <div className="flex items-center text-yellow-500 text-sm">
          ⭐ {product.rating}
        </div>

        <p className="text-xl font-bold mt-2 text-gray-800">${product.price}</p>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
