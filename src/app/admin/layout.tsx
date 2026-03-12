export const dynamic = "force-dynamic";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { findUserRole } from "@/lib/db";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/login");

  const role = await findUserRole(session.user.id);

  if (role !== "ADMIN") redirect("/");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-4 pt-16 lg:p-6 lg:pt-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
