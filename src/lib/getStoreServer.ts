import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function getStoreServer() {
  const headerList = await headers();
  const host = headerList.get("host") || "";

  console.log("HOST:", host); // 🔍 debug

  let store = await prisma.store.findFirst({
    where: {
      OR: [
        { domain: host },
        { customDomain: host },
      ],
    },
  });

  // ✅ FALLBACK (VERY IMPORTANT)
  if (!store) {
    store = await prisma.store.findFirst();
  }

  console.log("STORE FOUND:", store);

  return store;
}