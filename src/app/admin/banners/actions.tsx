"use client";

import { adminDeleteBanner } from "@/actions/admin";
import { useRouter } from "next/navigation";

export function AdminBannerActions({ bannerId }: { bannerId: string }) {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        if (confirm("Delete this banner?")) {
          await adminDeleteBanner(bannerId);
          router.refresh();
        }
      }}
      className="text-xs font-medium text-red-600 hover:underline"
    >
      Delete
    </button>
  );
}
