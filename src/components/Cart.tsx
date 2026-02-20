import type { Product } from "../types/products";
import CartItem from "./CartItem";

type Props = {
  cartItems: Product[];
  removeFromCart: (id: number) => void;
  isOpen: boolean;
  onClose: () => void;
};

function Cart({ cartItems, removeFromCart, isOpen, onClose }: Props) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-4 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">🛒 Cart</h2>
          <button onClick={onClose} className="text-gray-500">
            ✖
          </button>
        </div>

        {cartItems.length === 0 && (
          <p className="text-gray-500">Cart is empty</p>
        )}

        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            product={item}
            removeFromCart={removeFromCart}
          />
        ))}

        <div className="mt-4 font-bold border-t pt-4">Total: ${total}</div>
      </div>
    </>
  );
}

export default Cart;
