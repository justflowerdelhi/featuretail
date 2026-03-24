import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { NextResponse } from "next/server";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// ✅ FIX: cast pool to any to avoid type conflict
const adapter = new PrismaPg(pool as any);

const prisma = new PrismaClient({ adapter });

export async function GET() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  const orders = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
  });

  const salesByDate: Record<string, number> = {};

  orders.forEach((order: any) => {
    const date = order.createdAt.toISOString().split("T")[0];

    if (!salesByDate[date]) {
      salesByDate[date] = 0;
    }

    salesByDate[date] += order.total;
  });

  const result = Object.keys(salesByDate)
    .sort()
    .map((date) => ({
      date,
      total: salesByDate[date],
    }));

  return NextResponse.json(result);
}