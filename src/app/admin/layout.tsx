import { getStoreServer } from "@/lib/getStoreServer";
import AdminSidebar from "@/components/admin/AdminSidebar";

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
        <AdminSidebar />
      </aside>

      {/* Main */}
      <main className="flex-1">
        {children}
      </main>

    </div>
  );
}