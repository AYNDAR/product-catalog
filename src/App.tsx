import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import SortOptions from "./components/SortOptions";
import Cart from "./components/Cart";
import CategoryBar from "./components/CategoryBar";
import type { Product } from "./types/products";
import { products } from "./data/products";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Filtering
  let filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    )
    .filter((product) =>
      selectedCategory.toLowerCase() === "all"
        ? true
        : product.category.toLowerCase() === selectedCategory.toLowerCase(),
    );

  // Sorting
  if (sortOrder === "low-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  }

  if (sortOrder === "high-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <header className="bg-[#131921] text-white px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-yellow-400">
          PRODUCT CATALOG
        </h1>

        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-yellow-400 text-black px-4 py-2 rounded shadow font-semibold"
          >
            🛒 ({cartItems.length})
          </button>
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </header>

      <CategoryBar
        selected={selectedCategory}
        setSelected={setSelectedCategory}
      />

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md p-4 space-y-4">
          <button
            onClick={() => {
              setIsCartOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full bg-yellow-400 text-black p-2 rounded"
          >
            🛒 Cart ({cartItems.length})
          </button>
        </div>
      )}

      <div className="px-4 sm:px-6 lg:px-12 py-6">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <SortOptions sortOrder={sortOrder} setSortOrder={setSortOrder} />

        {loading ? (
          <div className="text-center py-12 text-lg text-gray-500">
            Loading...
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No products found.
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />

                <button
                  onClick={() => addToCart(product)}
                  className="mt-2 w-full bg-yellow-400 text-black p-2 rounded hover:bg-yellow-500 transition font-semibold"
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
