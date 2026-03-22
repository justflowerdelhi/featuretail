const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const STORE_ID = "cmn0o7s4t0000w6784ebtdzf7";

async function main() {
  const store = await prisma.store.findUnique({
    where: { id: STORE_ID },
  });

  console.log("STORE FOUND:", store);
}

main().finally(() => prisma.$disconnect());
