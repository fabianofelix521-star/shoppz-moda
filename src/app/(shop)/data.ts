import { prisma } from "@/lib/prisma";

export async function getCategoriesData() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

export async function getBannersData() {
  return prisma.banner.findMany({
    where: { active: true },
    orderBy: { position: "asc" },
  });
}

export async function getFeaturedData() {
  return prisma.product.findMany({
    where: { featured: true, active: true },
    include: { images: { orderBy: { position: "asc" } }, category: true },
    take: 8,
  });
}
