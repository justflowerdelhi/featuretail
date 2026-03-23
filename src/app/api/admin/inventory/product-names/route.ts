import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/admin/inventory/product-names — returns unique product names for datalist
export async function GET() {
  try {
    const names = await prisma.storeInventory.findMany({
      select: { productName: true },
      distinct: ["productName"],
      orderBy: { productName: "asc" },
    });
    const productNames = names.map((n) => n.productName).filter(Boolean);
    return NextResponse.json(productNames);
  } catch (error) {
    console.error("GET product-names error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product names" },
      { status: 500 }
    );
  }
}
