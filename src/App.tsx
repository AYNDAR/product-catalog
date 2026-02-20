import { useState } from "react";
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import SortOptions from "./components/SortOptions";
import Cart from "./components/Cart";
import type { Product } from "./types/products";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const categories = [...new Set(products.map((product) => product.category))];

  // Add to cart
  const addToCart = (product: Product) => {
    setCartItems((prev: Product[]) => [...prev, product]);
    setIsCartOpen(true); // auto open cart
  };

  // Remove from cart
  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  let filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true,
    );

  if (sortOrder === "low-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  }

  if (sortOrder === "high-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <h1 className="text-3xl font-bold text-center py-6">Product Catalog</h1>
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed top-6 right-6 bg-blue-600 text-white px-4 py-2 rounded shadow-lg z-30"
      >
        🛒 ({cartItems.length})
      </button>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      <SortOptions sortOrder={sortOrder} setSortOrder={setSortOrder} />

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
            />
            <ProductCard product={product} />

            <button
              onClick={() => addToCart(product)}
              className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Sidebar */}
      <Cart
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}

export default App;
