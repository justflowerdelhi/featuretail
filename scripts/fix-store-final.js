const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const STORE_ID = "PASTE_YOUR_STORE_ID_HERE";

async function main() {
  console.log("🚀 Fixing ALL invalid storeId records...\n");

  const fix = async (model, name) => {
    const before = await prisma[model].count({
      where: {
        OR: [
          { storeId: null },
          { storeId: "" },
        ],
      },
    });

    const result = await prisma[model].updateMany({
      where: {
        OR: [
          { storeId: null },
          { storeId: "" },
        ],
      },
      data: { storeId: STORE_ID },
    });

    const after = await prisma[model].count({
      where: {
        OR: [
          { storeId: null },
          { storeId: "" },
        ],
      },
    });

    console.log(`✅ ${name}: fixed ${result.count} | remaining ${after}`);
  };

  await fix("product", "Products");
  await fix("category", "Categories");
  await fix("subCategory", "SubCategories");
  await fix("order", "Orders");

  console.log("\n🎯 Done");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
