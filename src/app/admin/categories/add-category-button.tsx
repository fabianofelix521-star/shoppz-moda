"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryForm } from "./category-form";

export function AddCategoryButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="primary"
        size="md"
        onClick={() => setOpen(true)}
        className="gap-1.5"
      >
        <Plus size={16} />
        <span className="hidden sm:inline">Adicionar</span>
      </Button>
      {open && <CategoryForm onClose={() => setOpen(false)} />}
    </>
  );
}
