import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { NextResponse } from "next/server";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// ✅ FIX HERE
const adapter = new PrismaPg(pool as any);

const prisma = new PrismaClient({ adapter });

export async function GET() {
  try {
    const headersList = await headers();
    const storeId = headersList.get("x-store-id");

    if (!storeId) {
      return NextResponse.json({ error: "Store not found" }, { status: 400 });
    }

    const subcategories = await prisma.subCategory.findMany({
      where: { storeId },
      include: { category: true },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(subcategories);
  } catch (error) {
    console.error("Error fetching subcategories", error);
    return NextResponse.json(
      { error: "Failed to fetch subcategories" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const storeId = headersList.get("x-store-id");

    if (!storeId) {
      return NextResponse.json({ error: "Store not found" }, { status: 400 });
    }

    const data = await req.json();

    const subCategory = await prisma.subCategory.create({
      data: { ...data, storeId },
    });

    return NextResponse.json(subCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating subcategory", error);
    return NextResponse.json(
      { error: "Failed to create subcategory" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Subcategory ID required" },
        { status: 400 }
      );
    }

    await prisma.subCategory.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting subcategory", error);
    return NextResponse.json(
      { error: "Failed to delete subcategory" },
      { status: 500 }
    );
  }
}