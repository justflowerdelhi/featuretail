import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

/* GET */
export async function GET() {
  const headersList = await headers();
  const storeId = headersList.get("x-store-id") || "cmn0o7s4t0000w6784ebtdzf7";
  const orders = await prisma.order.findMany({
    where: { storeId },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}

/* DELETE */
export async function DELETE(req: Request) {
  const headersList = await headers();
  const storeId = headersList.get("x-store-id") || "cmn0o7s4t0000w6784ebtdzf7";
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id")!;
  // Only delete if order belongs to this store
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order || order.storeId !== storeId) {
    return NextResponse.json({ error: "Order not found for this store" }, { status: 404 });
  }
  await prisma.order.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
