import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { getStoreServer } from "../lib/getStoreServer";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

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
            {children}
            <Toaster position="bottom-right" />
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}