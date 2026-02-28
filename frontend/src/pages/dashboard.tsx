import { lazy, Suspense, useState } from "react";
import { useDashboard } from "@/services/dashboard.service";
import { useCategories } from "@/services/category.service";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { CategoriesSidebar } from "@/components/dashboard/categories-sidebar";
import type { Transaction } from "@/types/graphql";

const TransactionModal = lazy(
  () => import("@/components/modals/transaction-modal").then((m) => ({ default: m.TransactionModal })),
);

export function DashboardPage() {
  const [month] = useState(() => new Date().getMonth() + 1);
  const [year] = useState(() => new Date().getFullYear());
  const { data: dashboard, isLoading } = useDashboard(month, year);
  const { data: categorySummary } = useCategories();

  const [modalState, setModalState] = useState<{
    open: boolean;
    transaction?: Transaction | null;
  }>({ open: false });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
      </div>
    );
  }

  if (!dashboard) return null;

  return (
    <div className="grid grid-cols-3 gap-[24px]">
      {/* Summary Cards - span all 3 columns */}
      <div className="col-span-3">
        <SummaryCards
          totalBalance={dashboard.totalBalance}
          monthlyIncome={dashboard.monthlyIncome}
          monthlyExpenses={dashboard.monthlyExpenses}
        />
      </div>

      {/* Recent Transactions - spans 2 columns */}
      <div className="col-span-2">
        <RecentTransactions
          transactions={dashboard.recentTransactions}
          onNewTransaction={() => setModalState({ open: true })}
        />
      </div>

      {/* Categories Sidebar - 1 column */}
      <div className="col-span-1">
        <CategoriesSidebar categories={dashboard.categories} />
      </div>

      {modalState.open && (
        <Suspense fallback={null}>
          <TransactionModal
            open={modalState.open}
            onClose={() => setModalState({ open: false })}
            transaction={modalState.transaction}
            categories={categorySummary?.categories ?? []}
          />
        </Suspense>
      )}
    </div>
  );
}
