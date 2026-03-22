import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getStore } from "./lib/getStore";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🌐 STORE DETECTION (RUN FOR ALL ROUTES)
  const host = request.headers.get("host") || "";
  const store = await getStore(host);

  console.log("STORE:", store?.name);

  // ❌ If no store found (optional protection)
  if (!store) {
    return new NextResponse("Store not found", { status: 404 });
  }

  // 🔐 AUTH (ONLY FOR ADMIN)
  const token = request.cookies.get("token")?.value;

  if (
    (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) &&
    pathname !== "/admin/login" &&
    !token
  ) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const response = NextResponse.next();

  // ✅ Attach store ID globally
  response.headers.set("x-store-id", store.id);

  return response;
}

export const config = {
  matcher: ["/:path*"], // ✅ APPLY TO ALL ROUTES
};