"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ProductCard({ product, categorySlug }: any) {
  if (!product) return null;

  const { addToCart, setIsCartOpen } = useCart();
  const [loading, setLoading] = useState(false);

  // ✅ Safe Image
  const imageUrl =
    Array.isArray(product?.images) && product.images.length > 0
      ? product.images[0]
      : "/placeholder.jpg";

  const isOutOfStock = product.stock === 0;
  const isBestSeller = product.tags?.some(
    (t: any) => t.tag?.name === "best-seller"
  );
  const isNewArrival = product.tags?.some(
    (t: any) => t.tag?.name === "new-arrival"
  );
  const isFeatured = product.tags?.some(
    (t: any) => t.tag?.name === "featured"
  );

  const currency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition duration-300 overflow-hidden flex flex-col">

      {/* IMAGE */}
      <Link href={`/shop/${categorySlug}/${product.slug}`}>
        <div className="relative h-52 bg-gray-100 overflow-hidden">


          {/* BADGES */}
          {isBestSeller && (
            <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs px-2 py-1 rounded">
              🔥 Best Seller
            </span>
          )}

          {isNewArrival && (
            <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
              🆕 New
            </span>
          )}

          {isFeatured && (
            <span className="absolute bottom-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
              ⭐ Featured
            </span>
          )}

          {/* Image */}
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
          />
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-3 flex flex-col flex-1">

        <Link href={`/shop/${categorySlug}/${product.slug}`}>
          <h3 className="text-sm font-medium line-clamp-2 min-h-[40px] hover:text-pink-600 transition">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="text-yellow-500 text-sm mt-1">
          ⭐⭐⭐⭐☆ <span className="text-gray-400">(124)</span>
        </div>

        {/* Stock */}
        <div className="text-xs text-gray-500 mt-1">
          {isOutOfStock
            ? "❌ Out of stock"
            : product.stock < 5
            ? `⚠️ Only ${product.stock} left`
            : `${product.stock} in stock`}
        </div>

        {/* Price */}
        <div className="mt-2">
          <span className="text-pink-600 font-bold text-lg">
            {currency.format(product.price)}
          </span>
        </div>

        {/* BUTTON */}
        <button
          disabled={isOutOfStock || loading}
          onClick={() => {
            setLoading(true);
            addToCart({
              ...product,
              images: product.images?.length
                ? product.images.map((img: any) =>
                    typeof img === "string" ? img : img.url
                  )
                : ["/placeholder.jpg"],
              quantity: 1,
            });
            setIsCartOpen(true); // 🔥 OPEN DRAWER
            toast.custom((t) => (
              <div className="bg-white shadow-lg border rounded-lg p-4 flex items-center gap-3">
                <img
                  src={imageUrl}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="text-sm font-semibold">
                    Added to cart
                  </p>
                  <p className="text-xs text-gray-600">
                    {product.name}
                  </p>
                  <p className="text-xs text-pink-600">
                    Qty: 1
                  </p>
                </div>
              </div>
            ));

            setTimeout(() => setLoading(false), 800);
          }}
          className={`mt-3 py-2 rounded-md text-sm font-medium transition ${
            isOutOfStock
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-pink-600 hover:bg-pink-700 text-white"
          }`}
        >
          {isOutOfStock
            ? "Out of Stock"
            : loading
            ? "Adding..."
            : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}