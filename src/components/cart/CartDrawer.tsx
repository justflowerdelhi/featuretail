"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    increaseQty,
    decreaseQty,
    total,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* BACKDROP */}
      <div
        className="flex-1 bg-black/40"
        onClick={() => setIsCartOpen(false)}
      />

      {/* DRAWER */}
      <div className="w-[380px] bg-white h-full shadow-xl p-4 flex flex-col">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)}>✕</button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((item) => {
              const image =
                typeof item.images?.[0] === "string"
                  ? item.images[0]
                  : item.images?.[0]?.url || "/placeholder.png";

              return (
                <div key={item.id} className="flex gap-3 border-b pb-3">
                  <img
                    src={image}
                    className="w-16 h-16 object-cover rounded"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {item.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => decreaseQty(item.id)}>
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button onClick={() => increaseQty(item.id)}>
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-xs mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* FOOTER */}
        <div className="border-t pt-4">
          <div className="flex justify-between mb-3 font-semibold">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <Link
            href="/checkout"
            className="block bg-pink-600 text-white text-center py-2 rounded"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
