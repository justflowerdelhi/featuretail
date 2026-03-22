import ProductCard from "./ProductCard";

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("API ERROR:", text);
    return [];
  }
  return res.json();
}

export default async function NewArrivals() {
  const products = await getProducts();
  if (!Array.isArray(products)) {
    return null;
  }
  const newProducts = products
  .filter(
    (p: any) =>
      p.stock > 0 &&
      (
        // ✅ Either tagged OR recent
        p.tags?.some((t: any) => t.tag?.name === "new-arrival") ||
        new Date(p.createdAt).getTime() >
          Date.now() - 7 * 24 * 60 * 60 * 1000 // last 7 days
      )
  )
  .sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  )
  .slice(0, 8);
  return (
    <section className="py-6 md:py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-10">
          🆕 New Arrivals
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {newProducts.map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              categorySlug={product.category?.slug || "all"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}