"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });
  if (user?.role !== "ADMIN") throw new Error("Forbidden");
  return session;
}

export async function adminGetProducts() {
  await requireAdmin();
  return prisma.product.findMany({
    include: { images: { orderBy: { position: "asc" } }, category: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function adminCreateProduct(data: {
  name: string;
  brand: string;
  description: string;
  price: number;
  compareAt?: number;
  sizes: string[];
  categoryId: string;
  featured: boolean;
  images: string[];
}) {
  await requireAdmin();
  const slug = slugify(data.name);

  const product = await prisma.product.create({
    data: {
      name: data.name,
      slug,
      brand: data.brand,
      description: data.description,
      price: data.price,
      compareAt: data.compareAt,
      sizes: data.sizes,
      categoryId: data.categoryId,
      featured: data.featured,
      images: {
        create: data.images.map((url, i) => ({ url, position: i })),
      },
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  return product;
}

export async function adminUpdateProduct(
  id: string,
  data: {
    name?: string;
    brand?: string;
    description?: string;
    price?: number;
    compareAt?: number;
    sizes?: string[];
    categoryId?: string;
    featured?: boolean;
    active?: boolean;
    images?: string[];
  },
) {
  await requireAdmin();
  const { images, ...rest } = data;

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...rest,
      slug: rest.name ? slugify(rest.name) : undefined,
    },
  });

  if (images) {
    await prisma.productImage.deleteMany({ where: { productId: id } });
    await prisma.productImage.createMany({
      data: images.map((url, i) => ({ url, position: i, productId: id })),
    });
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
  return product;
}

export async function adminDeleteProduct(id: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function adminGetOrders() {
  await requireAdmin();
  return prisma.order.findMany({
    include: { items: true, user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function adminUpdateOrderStatus(id: string, status: string) {
  await requireAdmin();
  const order = await prisma.order.update({
    where: { id },
    data: { status: status as any },
  });
  revalidatePath("/admin/orders");
  return order;
}

export async function adminGetCategories() {
  await requireAdmin();
  return prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });
}

export async function adminCreateCategory(data: {
  name: string;
  description?: string;
  image?: string;
}) {
  await requireAdmin();
  const category = await prisma.category.create({
    data: { ...data, slug: slugify(data.name) },
  });
  revalidatePath("/admin/categories");
  return category;
}

export async function adminUpdateCategory(
  id: string,
  data: { name?: string; description?: string; image?: string },
) {
  await requireAdmin();
  const category = await prisma.category.update({
    where: { id },
    data: {
      ...data,
      slug: data.name ? slugify(data.name) : undefined,
    },
  });
  revalidatePath("/admin/categories");
  return category;
}

export async function adminDeleteCategory(id: string) {
  await requireAdmin();
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
}

export async function adminGetBanners() {
  await requireAdmin();
  return prisma.banner.findMany({ orderBy: { position: "asc" } });
}

export async function adminCreateBanner(data: {
  title: string;
  subtitle?: string;
  cta?: string;
  link?: string;
  bgColor?: string;
}) {
  await requireAdmin();
  const banner = await prisma.banner.create({ data });
  revalidatePath("/admin/banners");
  revalidatePath("/");
  return banner;
}

export async function adminDeleteBanner(id: string) {
  await requireAdmin();
  await prisma.banner.delete({ where: { id } });
  revalidatePath("/admin/banners");
  revalidatePath("/");
}

export async function adminGetDashboardStats() {
  await requireAdmin();
  const [productCount, orderCount, userCount, revenue] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.order.aggregate({ _sum: { total: true } }),
  ]);

  return {
    products: productCount,
    orders: orderCount,
    users: userCount,
    revenue: revenue._sum.total || 0,
  };
}

export async function adminGetSetting(key: string) {
  await requireAdmin();
  const setting = await prisma.setting.findUnique({ where: { key } });
  return setting?.value ?? "";
}

export async function adminSaveSetting(key: string, value: string) {
  await requireAdmin();
  await prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
  revalidatePath("/admin");
  revalidatePath("/");
}

// Public: read a setting without admin check (for footer, logo, etc.)
export async function getPublicSetting(key: string) {
  const setting = await prisma.setting.findUnique({ where: { key } });
  return setting?.value ?? "";
}

export async function getPublicSettings(keys: string[]) {
  const settings = await prisma.setting.findMany({
    where: { key: { in: keys } },
  });
  const map: Record<string, string> = {};
  for (const s of settings) map[s.key] = s.value;
  return map;
}
