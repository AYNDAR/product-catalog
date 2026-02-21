import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products.json";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl w-full grid md:grid-cols-2 gap-6">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover rounded-lg"
        />

        {/* Product Information */}
        <div className="flex flex-col justify-center space-y-3">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-500">
            Product Number: {product.productNumber}
          </p>

          <p className="text-xl font-semibold text-blue-600">
            Price: ${product.price}
          </p>

          <p>Category: {product.category}</p>

          <p>Rating: ⭐ {product.rating}</p>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition"
          >
            ← Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
