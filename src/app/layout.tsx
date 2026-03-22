
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { getStoreServer } from "../lib/getStoreServer";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import CartDrawer from "@/components/cart/CartDrawer";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const store = await getStoreServer();

  return (
    <html lang="en">
      <body
        style={{
          "--primary": store?.primaryColor || "#000000",
        } as React.CSSProperties}
      >
        <StoreProvider store={store}>
          <CartProvider>
            <Header />
            {children}
            <CartDrawer /> {/* 🔥 GLOBAL */}
            <Toaster position="bottom-right" />
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}