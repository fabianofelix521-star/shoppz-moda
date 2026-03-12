export const dynamic = 'force-dynamic';

import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Footer } from "@/components/layout/footer";
import { getPublicSetting } from "@/actions/admin";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logoUrl = await getPublicSetting("logo_url");

  return (
    <>
      <Header logoUrl={logoUrl} />
      <main className="pb-28 lg:pb-0">{children}</main>
      <Footer />
      <BottomNav />
    </>
  );
}
