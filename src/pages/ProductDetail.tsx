import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products.json";
import type { Product } from "../types/products";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product: Product | undefined = products.find(
    (p) => p.id === Number(id),
  );

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        className="mb-4 px-4 py-2 bg-gray-300 rounded"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded"
        />
        <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
        <p className="text-gray-600 mt-2">${product.price}</p>
        <p className="text-gray-700 mt-2">{product.description}</p>
        <p className="mt-2 text-gray-700">Category: {product.category}</p>
      </div>
    </div>
  );
}

export default ProductDetail;
