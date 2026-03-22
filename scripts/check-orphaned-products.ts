import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkOrphanedProducts() {
  // 1️⃣ Get all products with category relation
  const products = await prisma.product.findMany({
    include: { category: true },
  });

  // 2️⃣ Find orphaned (invalid category)
  const productsWithInvalidCategory = products.filter(
    (p) => !p.category
  );

  // 3️⃣ Products with no images
  const productsWithNoImages = await prisma.product.findMany({
    where: {
      images: { none: {} },
    },
  });

  // 4️⃣ Products with no variants
  const productsWithNoVariants = await prisma.product.findMany({
    where: {
      variants: { none: {} },
    },
  });

  // ✅ Logs
  console.log(
    'Products with invalid category:',
    productsWithInvalidCategory.length
  );

  console.log(
    'Products with no images:',
    productsWithNoImages.length
  );

  console.log(
    'Products with no variants:',
    productsWithNoVariants.length
  );
}

checkOrphanedProducts()
  .catch(console.error)
  .finally(() => prisma.$disconnect());