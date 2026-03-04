import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import SortOptions from "./components/SortOptions";
import Cart from "./components/Cart";
import CategoryBar from "./components/CategoryBar";
import Footer from "./components/Footer";
import { products } from "./data/products";
import { useCart } from "./context/CartContext";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Cart Context
  const { cartItems } = useCart();

  /* ===============================
     SEARCH DEBOUNCE
  =============================== */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  /* ===============================
     LOADING SIMULATION
  =============================== */
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  /* ===============================
     FILTER PRODUCTS
  =============================== */
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    )
    .filter((product) => {
      if (selectedCategory === "All") return true;
      return product.category.toLowerCase() === selectedCategory.toLowerCase();
    })
    .filter((product) => product.rating >= minRating);

  /* ===============================
     SORT PRODUCTS
  =============================== */
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOrder) {
      case "low-high":
        return a.price - b.price;

      case "high-low":
        return b.price - a.price;

      case "rating":
        return b.rating - a.rating;

      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ===============================
          HEADER
      =============================== */}
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

      {/* ===============================
          CATEGORY BAR
      =============================== */}
      <CategoryBar
        selected={selectedCategory}
        setSelected={setSelectedCategory}
      />

      {/* ===============================
          MOBILE MENU
      =============================== */}
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

      {/* ===============================
          SEARCH + SORT
      =============================== */}
      <div className="px-4 sm:px-6 lg:px-12 py-6">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <SortOptions
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          minRating={minRating}
          setMinRating={setMinRating}
        />

        {/* ===============================
            PRODUCT GRID
        =============================== */}
        {loading ? (
          <div className="text-center py-12 text-lg text-gray-500">
            Loading...
          </div>
        ) : sortedProducts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No products found.
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {sortedProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===============================
          CART SIDEBAR
      =============================== */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* ===============================
          FOOTER
      =============================== */}
      <Footer />
    </div>
  );
}

export default App;
