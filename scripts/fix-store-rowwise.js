const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const STORE_ID = "cmn0o7s4t0000w6784ebtdzf7";

async function fixModel(model, name) {
  console.log(`\n🔧 Fixing ${name}...`);

  const records = await prisma[model].findMany({
    where: {
      OR: [
        { storeId: null },
        { storeId: "" }
      ]
    }
  });

  console.log(`Found ${records.length} records`);

  for (const r of records) {
    try {
      await prisma[model].update({
        where: { id: r.id },
        data: { storeId: STORE_ID },
      });
      console.log(`✅ Fixed ${name} ID: ${r.id}`);
    } catch (err) {
      console.log(`❌ Failed ${name} ID: ${r.id}`, err.message);
    }
  }
}

async function main() {
  await fixModel("category", "Categories");
  await fixModel("subCategory", "SubCategories");
  await fixModel("product", "Products");
  await fixModel("order", "Orders");

  console.log("\n🎯 DONE");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
