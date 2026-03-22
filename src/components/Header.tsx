"use client";

import { useStore } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function Header() {
  const { store } = useStore();
  const { cart, setIsCartOpen } = useCart();

  // ✅ Better count (handles quantity also)
  const totalItems = cart.reduce(
    (sum: number, item: any) => sum + (item.quantity || 1),
    0
  );

  return (
    <header className="sticky top-0 z-50 bg-white border-b">

      {/* TOP ROW */}
      <div className="flex items-center justify-between px-6 py-3">

        {/* LOGO */}
        <Link href="/" className="flex items-center">
          {store?.logo ? (
            <img
              src={store.logo}
              alt="logo"
              className="h-16 w-auto object-contain"
            />
          ) : (
            <span className="text-xl font-bold">
              {store?.name || "Featuretail"}
            </span>
          )}
        </Link>

        {/* SEARCH BAR */}
        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* CART */}
        <div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-sm font-medium"
          >
            Cart ({totalItems})
          </button>
        </div>

      </div>

      {/* CATEGORY QUICK LINKS */}
      <div className="flex gap-4 text-xs text-gray-600 px-6 pb-2">
        <span>Art & Craft</span>
        <span>Birthday</span>
        <span>Gift Packaging</span>
        <span>Home Decor</span>
      </div>

      {/* NAVIGATION */}
      <div className="flex gap-6 px-6 py-2 text-sm border-t">
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>

    </header>
  );
}