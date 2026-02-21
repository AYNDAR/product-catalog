import { useState, useEffect } from "react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulated loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home & Furniture",
    "Beauty & Personal Care",
    "Books & Education",
    "Gaming",
  ];

  const addToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
    setIsCartOpen(true);
  };

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
    <div className="min-h-screen bg-gray-100 relative">
      {/* Responsive Header */}
      <header className="bg-white shadow-md px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold">Product Catalog</h1>

        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow"
          >
            🛒 ({cartItems.length})
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </header>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md p-4 space-y-4">
          <button
            onClick={() => {
              setIsCartOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            🛒 Cart ({cartItems.length})
          </button>
        </div>
      )}

      <div className="px-4 sm:px-6 lg:px-12 py-6">
        {/* Controls */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        <SortOptions sortOrder={sortOrder} setSortOrder={setSortOrder} />
        {loading ? (
          <div className="text-center py-12 text-lg text-gray-500">
            Loading...
          </div>
        ) : (
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
        )}
      </div>

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
