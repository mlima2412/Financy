import { lazy, Suspense, useState } from "react";
import Plus from "lucide-react/dist/esm/icons/plus";
import { Button } from "@/components/ui/button";
import { CategorySummaryCards } from "@/components/categories/category-summary-cards";
import { CategoryCard } from "@/components/categories/category-card";
import { useCategories, useDeleteCategory } from "@/services/category.service";
import type { Category } from "@/types/graphql";

const CategoryModal = lazy(
  () => import("@/components/modals/category-modal").then((m) => ({ default: m.CategoryModal })),
);

export function CategoriesPage() {
  const { data, isLoading } = useCategories();
  const deleteMutation = useDeleteCategory();

  const [modalState, setModalState] = useState<{
    open: boolean;
    category?: Category | null;
  }>({ open: false });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
      </div>
    );
  }

  const categories = data?.categories ?? [];

  return (
    <div className="flex flex-col gap-[32px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[2px]">
          <h1 className="text-[24px] font-bold leading-[32px] text-gray-800">Categorias</h1>
          <p className="text-[16px] leading-[24px] text-[#4B5563]">
            Organize suas transações por categorias
          </p>
        </div>
        <Button
          size="sm"
          icon={<Plus className="size-[24px]" />}
          onClick={() => setModalState({ open: true })}
        >
          Nova categoria
        </Button>
      </div>

      {/* Summary Cards */}
      <CategorySummaryCards
        totalCategories={data?.totalCategories ?? 0}
        totalTransactions={data?.totalTransactions ?? 0}
        mostUsedCategory={data?.mostUsedCategory ?? null}
        categories={categories}
      />

      {/* Category Grid */}
      <div className="grid grid-cols-4 gap-[16px]">
        {categories.length === 0 ? (
          <div className="col-span-4 rounded-[12px] border border-gray-200 bg-white p-[48px] text-center text-[14px] leading-[20px] text-gray-500">
            Nenhuma categoria criada
          </div>
        ) : (
          categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onEdit={() => setModalState({ open: true, category: cat })}
              onDelete={() => deleteMutation.mutate(cat.id)}
            />
          ))
        )}
      </div>

      {modalState.open && (
        <Suspense fallback={null}>
          <CategoryModal
            open={modalState.open}
            onClose={() => setModalState({ open: false })}
            category={modalState.category}
          />
        </Suspense>
      )}
    </div>
  );
}
