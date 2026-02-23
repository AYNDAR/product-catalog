import { Search, ShoppingCart } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-[#131921] text-white px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-yellow-400">MyShop</h1>

        <div className="flex flex-1 max-w-2xl">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 text-black rounded-l-md focus:outline-none"
          />
          <button
            className="bg-yellow-400 px-4 rounded-r-md text-black"
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
