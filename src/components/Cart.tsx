import { useMemo } from "react";
import type { Product } from "../types/products";
import CartItem from "./CartItem";

type CartProduct = Product & {
  quantity: number;
};

type Props = {
  cartItems: Product[];
  removeFromCart: (id: number) => void;
  // Added these to match what CartItem likely expec
  //
  addToCart: (product: Product) => void;
  removeOneFromCart: (id: number) => void;
  isOpen: boolean;
  onClose: () => void;
};

function Cart({
  cartItems,
  removeFromCart,
  addToCart,
  removeOneFromCart,
  isOpen,
  onClose,
}: Props) {
  // ⭐ Group cart items using memo
  const items = useMemo(() => {
    const grouped: CartProduct[] = [];

    cartItems.forEach((product) => {
      const existing = grouped.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        grouped.push({ ...product, quantity: 1 });
      }
    });

    return grouped;
  }, [cartItems]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

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
        className={`fixed top-0 right-0 h-full
        w-[85%] max-w-sm sm:w-96
        bg-white shadow-xl p-4 z-50
        transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">🛒 Cart</h2>
          <button onClick={onClose} className="text-gray-500 text-xl">
            ×
          </button>
        </div>

        {/* Cart Content Scroll Area */}
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-180px)]">
          {items.length === 0 && (
            <p className="text-gray-500 text-center mt-10">Cart is empty</p>
          )}

          {items.map((item) => (
            <CartItem
              key={item.id}
              product={item}
              quantity={item.quantity}
              removeFromCart={removeFromCart}
              // Passing the required props to fix the TS error:
              increaseQuantity={() => addToCart(item)}
              decreaseQuantity={() => removeOneFromCart(item.id)}
            />
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t pt-4 space-y-2 mt-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <button className="bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
                Clear Cart
              </button>

              <button
                onClick={onClose}
                className="bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition"
              >
                Back to Products
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
