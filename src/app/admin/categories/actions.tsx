"use client";

import { useState } from "react";
import { adminDeleteCategory } from "@/actions/admin";
import { useRouter } from "next/navigation";
import { CategoryForm } from "./category-form";

interface CategoryData {
  id: string;
  name: string;
  description?: string | null;
  image?: string | null;
}

export function AdminCategoryActions({
  categoryId,
  category,
}: {
  categoryId: string;
  category: CategoryData;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setEditing(true)}
          className="text-xs font-medium text-blue-600 hover:underline"
        >
          Editar
        </button>
        <button
          onClick={async () => {
            if (
              confirm(
                "Excluir esta categoria? Os produtos desta categoria serão afetados.",
              )
            ) {
              await adminDeleteCategory(categoryId);
              router.refresh();
            }
          }}
          className="text-xs font-medium text-red-600 hover:underline"
        >
          Excluir
        </button>
      </div>
      {editing && (
        <CategoryForm category={category} onClose={() => setEditing(false)} />
      )}
    </>
  );
}
