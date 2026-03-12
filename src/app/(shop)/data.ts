import { getCategoriesSimple, getBanners, getFeaturedProducts } from "@/lib/db";

export async function getCategoriesData() {
  return getCategoriesSimple();
}

export async function getBannersData() {
  return getBanners();
}

export async function getFeaturedData() {
  return getFeaturedProducts();
}
