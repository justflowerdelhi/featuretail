"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Menu, ChevronLeft } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  console.log("mobileOpen:", mobileOpen);
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* 🔥 MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          {/* SIDEBAR */}
          <div
            className="relative w-64 bg-white h-full shadow-lg z-50"
            onClick={(e) => e.stopPropagation()}  // ✅ IMPORTANT
          >
            <AdminSidebar />
          </div>
        </div>
      )}

      {/* 💻 DESKTOP SIDEBAR */}
      <aside
        className={`hidden md:flex flex-col border-r bg-white transition-all
        ${collapsed ? "w-16" : "w-64"}`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && <span className="font-bold">Admin</span>}
          <button onClick={() => setCollapsed(!collapsed)}>
            <ChevronLeft size={18} />
          </button>
        </div>

        <AdminSidebar collapsed={collapsed} />
      </aside>

      {/* 📦 MAIN */}
      <div className="flex-1 flex flex-col">

        {/* 🔝 TOP BAR */}
        <div className="flex items-center gap-3 p-4 border-b bg-white">

          {/* ☰ HAMBURGER (mobile) */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>

          <h1 className="font-semibold">Admin Panel</h1>
        </div>

        {/* CONTENT */}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}