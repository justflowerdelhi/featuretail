import { prisma } from "@/lib/utils/prisma";

export async function getStore(host: string) {
  const cleanHost = host.replace("www.", "");

  // localhost fallback
  if (cleanHost.includes("localhost")) {
    return prisma.store.findFirst();
  }

  const subdomain = cleanHost.split(".")[0];

  return prisma.store.findFirst({
    where: {
      OR: [
        { domain: subdomain },
        { customDomain: cleanHost },
      ],
    },
  });
}