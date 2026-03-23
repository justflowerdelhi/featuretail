"use client";

import Link from "next/link";
import { useStore } from "@/context/StoreContext";

export default function AdminSidebar() {
  const { store } = useStore();

  return (
    <div className="p-4 space-y-2">
      <Link href="/admin/dashboard">Dashboard</Link><br />
      <Link href="/admin/products">Products</Link><br />
      <Link href="/admin/categories">Categories</Link><br />
      <Link href="/admin/orders">Orders</Link><br />

      {/* ✅ SHOW ONLY FOR 3A Featuretail */}
      {store?.id === "cmn0o7s4t0000w6784ebtdzf7" && (
  <>
    <Link href="/admin/our-store/inventory">Inventory</Link><br />
  </>
)}

      <Link href="/admin/settings">Settings</Link><br />
    </div>
  );
}