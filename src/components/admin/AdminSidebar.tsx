"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  {
    section: "Main",
    items: [
      { name: "Dashboard", href: "/admin/dashboard", icon: "🏠" },
      { name: "Orders", href: "/admin/orders", icon: "🧾" },
      { name: "Customers", href: "/admin/customers", icon: "👥" },
    ],
  },
  {
    section: "Catalog",
    items: [
      { name: "Products", href: "/admin/catalogue/products", icon: "📦" },
      { name: "Categories", href: "/admin/catalogue/categories", icon: "🗂️" },
    ],
  },
  {
    section: "Marketing",
    items: [
      { name: "Coupons", href: "/admin/coupons", icon: "🎟️" },
      { name: "Messages", href: "/admin/messages", icon: "💬" },
    ],
  },
  {
    section: "System",
    items: [
      { name: "Settings", href: "/admin/settings", icon: "⚙️" },
    ],
  },
];

export default function AdminSidebar({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();

  return (
    <div className="p-3 space-y-6">
      {menu.map((group) => (
        <div key={group.section}>
          {!collapsed && (
            <p className="text-xs text-gray-500 mb-2 px-2">
              {group.section}
            </p>
          )}

          <div className="space-y-1">
            {group.items.map((item) => {
              const active = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
                    ${active ? "bg-black text-white" : "hover:bg-gray-100"}
                  `}
                >
                  <span>{item.icon}</span>
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}