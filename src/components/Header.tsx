import { Search, ShoppingCart } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-[#0F172A] text-white px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-cyan-400 font-bold tracking-wide">
          PRODUCT CATALOG
        </h1>

        <div className="flex flex-1 max-w-2xl">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 text-black rounded-l-md focus:outline-none"
          />
          <button
            className="bg-cyan-500 text-white hover:bg-cyan-600 transition shadow-md"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2 cursor-pointer">
          <ShoppingCart />
          <span>Cart</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
