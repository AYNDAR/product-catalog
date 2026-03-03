import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import SortOptions from "./components/SortOptions";
import Cart from "./components/Cart";
import CategoryBar from "./components/CategoryBar";
import type { Product } from "./types/products";
import { products } from "./data/products";
import Footer from "./components/Footer";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState<Product[]>([]);
  const removeOneFromCart = (id: number) => {
    setCartItems((prev) => {
      const index = prev.findIndex((item) => item.id === id);

      if (index === -1) return prev;

      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };
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
  // 1. Filter the products first
  const filtered = products
    .filter((product) =>
      product.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    )
    .filter((product) => {
      const categoryMatch =
        selectedCategory.toUpperCase() === "ALL" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();
      return categoryMatch;
    })
    .filter((product) => product.rating >= minRating);

  const sortedAndFilteredProducts = [...filtered].sort((a, b) => {
    switch (sortOrder) {
      case "low-high":
        return a.price - b.price;
      case "high-low":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating; // Highest rating first
      default:
        return 0; // No sorting applied
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <header className="sticky top-0 z-50 bg-[#0F172A] text-white px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center shadow-lg">
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

      <div className="mb-4 z-10">
        <CategoryBar
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
      </div>

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

      <div className="mb-4 relative z-20">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="px-4 sm:px-6 lg:px-12 py-6">
          <SortOptions
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            minRating={minRating}
            setMinRating={setMinRating}
          />

          {loading ? (
            <div className="text-center py-12 text-lg text-gray-500">
              Loading...
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-500 text-lg mt-10">
              No products found.
            </p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
              {sortedAndFilteredProducts.map((product) => (
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
      </div>

      <Cart
        cartItems={cartItems}
        addToCart={addToCart}
        removeOneFromCart={removeOneFromCart}
        removeFromCart={removeFromCart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
      <Footer />
    </div>
  );
}

export default App;
