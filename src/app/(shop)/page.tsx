export const dynamic = "force-dynamic";

import { getCategoriesData, getBannersData, getFeaturedData } from "./data";
import { CategoryCards } from "@/components/home/category-cards";
import { PromoBanner } from "@/components/home/promo-banner";
import { PopularItems } from "@/components/home/popular-items";
import { EditorialCard } from "@/components/home/editorial-card";

export default async function HomePage() {
  const [categories, banners, featured] = await Promise.all([
    getCategoriesData(),
    getBannersData(),
    getFeaturedData(),
  ]);

  const mainBanner = banners[0];
  const editorialProduct = featured[featured.length - 1];

  return (
    <div className="space-y-8 py-4 mx-auto max-w-7xl">
      {/* Category cards - Women & Men */}
      <CategoryCards categories={categories} />

      {/* Promo banner */}
      {mainBanner && <PromoBanner banner={mainBanner} />}

      {/* Popular items */}
      <PopularItems products={featured} />

      {/* Editorial card */}
      {editorialProduct && <EditorialCard product={editorialProduct} />}

      {/* Extra spacing for bottom nav */}
      <div className="h-4" />
    </div>
  );
}
