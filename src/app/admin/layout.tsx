import { getStoreServer } from "@/lib/getStoreServer";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await getStoreServer();

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:block">

        {/* Store Name */}
        <div className="p-6 font-bold text-xl border-b">
          {store?.name}
        </div>

        {/* MENU */}
        <nav className="p-4 space-y-3 text-sm">

          <Link href="/admin/dashboard">Dashboard</Link><br />
          <Link href="/admin/catalogue/products">Products</Link><br />
          <Link href="/admin/catalogue/categories">Categories</Link><br />
          <Link href="/admin/orders">Orders</Link><br />
          <Link href="/admin/messages">Messages</Link><br />
          <Link href="/admin/coupons">Coupons</Link><br />
          <Link href="/admin/settings">Settings</Link><br />

        </nav>

      </aside>

      {/* Main */}
      <main className="flex-1">
        {children}
      </main>

    </div>
  );
}