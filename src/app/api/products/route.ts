import { NextResponse } from "next/server";
import { prisma } from "@/lib/utils/prisma";
import { headers } from "next/headers";

export async function GET() {
  try {
    const headersList = await headers();
    const storeId = headersList.get("x-store-id") || "cmn0o7s4t0000w6784ebtdzf7";

    console.log("STORE ID IN API:", storeId);

    if (!storeId) {
      return NextResponse.json(
        { error: "Store not found" },
        { status: 400 }
      );
    }

    const products = await prisma.product.findMany({
      where: { storeId },
      include: {
        category: true,
        variants: {
          include: {
            images: true,
          },
        },
        images: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    // Flatten images to array of URLs
    const formattedProducts = products.map((p) => ({
      ...p,
      images: Array.isArray(p.images) ? p.images.map((img) => img.url) : [],
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error("PRODUCT API ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const storeId = headersList.get("x-store-id") || "cmn0o7s4t0000w6784ebtdzf7";

    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        ...body,
        storeId, // 🔥 MUST
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}