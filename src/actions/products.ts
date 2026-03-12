"use server";

import * as db from "@/lib/db";
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
  return db.getProducts({ category, search, sort, page, limit });
}

export async function getProduct(idOrSlug: string) {
  return db.getProduct(idOrSlug);
}

export async function getFeaturedProducts() {
  return db.getFeaturedProducts();
}

export async function getCategories() {
  return db.getCategories();
}

export async function getBanners() {
  return db.getBanners();
}

export async function getRelatedProducts(
  productId: string,
  categoryId: string,
) {
  return db.getRelatedProducts(productId, categoryId);
}
