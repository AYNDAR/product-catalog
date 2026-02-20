import type { Product } from "../types/products";

type Props = {
  product: Product;
  removeFromCart: (id: number) => void;
};

function CartItem({ product, removeFromCart }: Props) {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <h4 className="font-semibold">{product.name}</h4>
        <p className="text-sm text-gray-600">${product.price}</p>
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
