import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function GET() {
  try {
    const headersList = await headers(); // ✅ FIX
    const storeId = headersList.get("x-store-id");
    const categories = await prisma.category.findMany({
      where: {
        storeId: storeId!,
      },
      include: {
        subCategories: true
      },
      orderBy: {
        name: "asc"
      }
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("CATEGORY FETCH ERROR:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const headersList = await headers();
  const storeId = headersList.get("x-store-id");
  const data = await req.json();

  const category = await prisma.category.create({
    data: {
      ...data,
      storeId: storeId!,
    },
  });

  return NextResponse.json(category);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Category ID required" },
      { status: 400 }
    );
  }

  await prisma.category.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}