import { NextResponse } from "next/server";
import { prisma } from "@/lib/utils/prisma";
import { headers } from "next/headers";

export async function GET() {
  try {
    const headersList = await headers();
    const storeId = headersList.get("x-store-id");

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

    const formattedProducts = products.map((p: any) => ({
      ...p,
      images: Array.isArray(p.images)
        ? p.images.map((img: any) => img.url)
        : [],
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
    const storeId = headersList.get("x-store-id");

    if (!storeId) {
      return NextResponse.json({ error: "Store not found" }, { status: 400 });
    }

    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        ...body,
        storeId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("PRODUCT CREATE ERROR:", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}