import { useState } from "react";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import SortOptions from "./components/SortOptions";
import Cart from "./components/Cart";
import type { Product } from "./types/products";
import products from "./data/products.json";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const categories = [
    ...new Set(products.map((product: Product) => product.category)),
  ];

  // Add to cart
  const addToCart = (product: Product) => {
    setCartItems((prev: Product[]) => [...prev, product]);
    setIsCartOpen(true);
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
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-12 py-6 relative">
      <h1 className="text-3xl font-bold text-center py-6">Product Catalog</h1>

      {/* Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed top-6 right-6 bg-blue-600 text-white px-4 py-2 rounded shadow-lg z-30"
      >
        🛒 ({cartItems.length})
      </button>

      {/* Controls */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      <SortOptions sortOrder={sortOrder} setSortOrder={setSortOrder} />

      {/* Products Grid */}
      <div
        className="grid gap-6
                   grid-cols-1
                   sm:grid-cols-2
                   md:grid-cols-3
                   lg:grid-cols-4
                   xl:grid-cols-5"
      >
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />

            <button
              onClick={() => addToCart(product)}
              className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Sidebar (Only Once) */}
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
