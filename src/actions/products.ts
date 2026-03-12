"use server";

import { prisma } from "@/lib/prisma";
import { SortOption } from "@/types";

export async function getProducts({
  category,
  search,
  sort = "newest",
  page = 1,
  limit = 20,
}: {
  category?: string;
  search?: string;
  sort?: SortOption;
  page?: number;
  limit?: number;
} = {}) {
  const where: any = { active: true };

  if (category) {
    where.category = { slug: category };
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { brand: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const orderBy: any =
    sort === "price-asc"
      ? { price: "asc" }
      : sort === "price-desc"
        ? { price: "desc" }
        : sort === "popular"
          ? { rating: "desc" }
          : { createdAt: "desc" };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { images: { orderBy: { position: "asc" } }, category: true },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total, pages: Math.ceil(total / limit) };
}

export async function getProduct(idOrSlug: string) {
  return prisma.product.findFirst({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      active: true,
    },
    include: {
      images: { orderBy: { position: "asc" } },
      category: true,
    },
  });
}

export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { featured: true, active: true },
    include: { images: { orderBy: { position: "asc" } }, category: true },
    take: 8,
  });
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });
}

export async function getBanners() {
  return prisma.banner.findMany({
    where: { active: true },
    orderBy: { position: "asc" },
  });
}

export async function getRelatedProducts(
  productId: string,
  categoryId: string,
) {
  return prisma.product.findMany({
    where: {
      categoryId,
      id: { not: productId },
      active: true,
    },
    include: { images: { orderBy: { position: "asc" } }, category: true },
    take: 4,
  });
}
