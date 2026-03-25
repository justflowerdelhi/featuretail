"use client";

import { useState, ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* MOBILE SIDEBAR OVERLAY */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50" onClick={() => setOpen(false)} />
          <div className="w-64 max-w-full bg-white h-full p-4 overflow-y-auto shadow-lg animate-slide-in-right">
            <AdminSidebar />
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="w-64 max-w-full bg-white border-r hidden md:block md:sticky md:top-0 md:h-screen md:overflow-y-auto">
        <AdminSidebar />
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full min-w-0">
        {/* Hamburger for mobile */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b md:hidden flex items-center px-4 py-2 shadow-sm">
          <button
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            onClick={() => setOpen(true)}
            aria-label="Open sidebar"
          >
            <span className="text-2xl">☰</span>
          </button>
          <span className="ml-4 font-bold text-lg">Admin Panel</span>
        </div>
        <div className="p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}