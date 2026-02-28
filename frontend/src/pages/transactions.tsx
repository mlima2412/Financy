import { lazy, Suspense, useCallback, useState } from "react";
import Plus from "lucide-react/dist/esm/icons/plus";
import { Button } from "@/components/ui/button";
import { Filters } from "@/components/transactions/filters";
import { TransactionTable } from "@/components/transactions/transaction-table";
import { useTransactions, useDeleteTransaction } from "@/services/transaction.service";
import { useCategories } from "@/services/category.service";
import type { Transaction, TransactionFilters } from "@/types/graphql";

const TransactionModal = lazy(
  () => import("@/components/modals/transaction-modal").then((m) => ({ default: m.TransactionModal })),
);

export function TransactionsPage() {
  const [filters, setFilters] = useState<TransactionFilters>({
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useTransactions(filters);
  const { data: categorySummary } = useCategories();
  const deleteMutation = useDeleteTransaction();

  const [modalState, setModalState] = useState<{
    open: boolean;
    transaction?: Transaction | null;
  }>({ open: false });

  const categories = categorySummary?.categories ?? [];

  const handlePageChange = useCallback(
    (page: number) => setFilters((prev) => ({ ...prev, page })),
    [],
  );

  return (
    <div className="flex flex-col gap-[32px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[2px]">
          <h1 className="text-[24px] font-bold leading-[32px] text-gray-800">Transações</h1>
          <p className="text-[16px] leading-[24px] text-[#4B5563]">
            Gerencie todas as suas transações financeiras
          </p>
        </div>
        <Button
          size="sm"
          icon={<Plus className="size-[24px]" />}
          onClick={() => setModalState({ open: true })}
        >
          Nova transação
        </Button>
      </div>

      {/* Filters */}
      <Filters
        filters={filters}
        onFiltersChange={setFilters}
        categories={categories}
      />

      {/* Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
        </div>
      ) : (
        <TransactionTable
          transactions={data?.transactions ?? []}
          onEdit={(t) => setModalState({ open: true, transaction: t })}
          onDelete={(id) => deleteMutation.mutate(id)}
          page={data?.page}
          totalPages={data?.totalPages}
          total={data?.total}
          limit={filters.limit ?? 10}
          onPageChange={handlePageChange}
        />
      )}

      {modalState.open && (
        <Suspense fallback={null}>
          <TransactionModal
            open={modalState.open}
            onClose={() => setModalState({ open: false })}
            transaction={modalState.transaction}
            categories={categories}
          />
        </Suspense>
      )}
    </div>
  );
}
