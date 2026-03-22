import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";


export async function getAdminStore() {
  const headerList = await headers();
  const storeId = headerList.get("x-store-id");

  if (!storeId) {
    throw new Error("Store not found in admin");
  }

  const store = await prisma.store.findUnique({
    where: { id: storeId },
  });

  if (!store) {
    throw new Error("Invalid store");
  }

  return store;
}
