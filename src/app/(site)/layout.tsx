import Header from "@/components/Header";
import CartDrawer from "@/components/cart/CartDrawer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <CartDrawer />
    </>
  );
}
