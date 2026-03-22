const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Checking NULL storeId...\n");

  console.log("Products:", await prisma.product.count({ where: { storeId: null } }));
  console.log("Categories:", await prisma.category.count({ where: { storeId: null } }));
  console.log("SubCategories:", await prisma.subCategory.count({ where: { storeId: null } }));
  console.log("Orders:", await prisma.order.count({ where: { storeId: null } }));
}

main().finally(() => prisma.$disconnect());
