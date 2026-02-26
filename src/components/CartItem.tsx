import type { Product } from "../types/products";

type Props = {
  product: Product;
  quantity: number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};

function CartItem({
  product,
  quantity,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}: Props) {
  return (
    <div className="flex justify-between items-center border-b py-3">
      <div>
        <h4 className="font-semibold">{product.name}</h4>
        <p className="text-sm text-gray-600">
          ${product.price} × {quantity}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => decreaseQuantity(product.id)}
            className="px-2 bg-gray-200 rounded"
          >
            −
          </button>

          <span>{quantity}</span>

          <button
            onClick={() => increaseQuantity(product.id)}
            className="px-2 bg-gray-200 rounded"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={() => removeFromCart(product.id)}
        className="text-red-500"
      >
        ✖
      </button>
    </div>
  );
}

export default CartItem;
