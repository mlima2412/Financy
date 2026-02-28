import CircleArrowUp from "lucide-react/dist/esm/icons/circle-arrow-up";
import CircleArrowDown from "lucide-react/dist/esm/icons/circle-arrow-down";
import Plus from "lucide-react/dist/esm/icons/plus";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { Tag } from "@/components/ui/tag";
import { AppLink } from "@/components/ui/link";
import { formatCurrency, formatDate } from "@/lib/utils";
import { TransactionType, type Transaction } from "@/types/graphql";

interface RecentTransactionsProps {
  transactions: Transaction[];
  onNewTransaction: () => void;
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
  const isIncome = transaction.type === TransactionType.INCOME;
  const valuePrefix = isIncome ? "+ " : "- ";

  return (
    <div className="flex items-center border-b border-gray-200">
      {/* Left cell: icon + text */}
      <div className="flex flex-1 items-center gap-[16px] px-[24px] h-[80px]">
        <div
          className="flex size-[40px] shrink-0 items-center justify-center rounded-[8px]"
          style={{ backgroundColor: transaction.category?.color ? getCategoryLight(transaction.category.color) : "#E5E7EB" }}
        >
          <DynamicIcon
            name={transaction.category?.icon ?? "receipt-text"}
            className="size-[24px]"
            style={{ color: transaction.category?.color ? getCategoryDark(transaction.category.color) : "#374151" }}
          />
        </div>
        <div className="flex flex-1 flex-col gap-[2px]">
          <span className="text-[16px] font-medium leading-[24px] text-gray-800">
            {transaction.description}
          </span>
          <span className="text-[14px] leading-[20px] text-[#4B5563]">
            {formatDate(transaction.date)}
          </span>
        </div>
      </div>

      {/* Center cell: tag */}
      <div className="flex h-[80px] w-[160px] shrink-0 items-center justify-center px-[24px]">
        {transaction.category && (
          <Tag
            label={transaction.category.title}
            color={transaction.category.color}
          />
        )}
      </div>

      {/* Right cell: value + arrow */}
      <div className="flex h-[80px] w-[160px] shrink-0 items-center justify-end gap-[8px] px-[24px]">
        <span className="text-[14px] font-semibold leading-[20px] text-gray-800">
          {valuePrefix}{formatCurrency(transaction.amount)}
        </span>
        {isIncome ? (
          <CircleArrowUp className="size-[24px]" style={{ color: "#16A34A" }} />
        ) : (
          <CircleArrowDown className="size-[24px]" style={{ color: "#DC2626" }} />
        )}
      </div>
    </div>
  );
}

function getCategoryLight(color: string): string {
  const map: Record<string, string> = {
    "#16A34A": "#E0FAE9",
    "#2563EB": "#DBEAFE",
    "#9333EA": "#F3E8FF",
    "#DB2777": "#FCE7F3",
    "#DC2626": "#FEE2E2",
    "#EA580C": "#FFEDD5",
    "#CA8A04": "#F7F3CA",
  };
  return map[color] ?? "#E5E7EB";
}

function getCategoryDark(color: string): string {
  const map: Record<string, string> = {
    "#16A34A": "#15803D",
    "#2563EB": "#1D4ED8",
    "#9333EA": "#7E22CE",
    "#DB2777": "#BE185D",
    "#DC2626": "#B91C1C",
    "#EA580C": "#C2410C",
    "#CA8A04": "#A16207",
  };
  return map[color] ?? "#374151";
}

export function RecentTransactions({
  transactions,
  onNewTransaction,
}: RecentTransactionsProps) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-[21px] pl-[24px] pr-[12px] pt-[20px]">
        <span className="text-[12px] font-medium uppercase leading-[16px] tracking-[0.6px] text-gray-500">
          Transações recentes
        </span>
        <AppLink to="/transacoes" iconRight>
          Ver todas
        </AppLink>
      </div>

      {/* Body */}
      <div className="flex flex-col">
        {transactions.length === 0 ? (
          <p className="py-[32px] text-center text-[14px] leading-[20px] text-gray-500">
            Nenhuma transação recente
          </p>
        ) : (
          transactions.map((t) => (
            <TransactionRow key={t.id} transaction={t} />
          ))
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center px-[24px] py-[20px]">
        <button
          type="button"
          onClick={onNewTransaction}
          className="flex items-center gap-[4px] text-[14px] font-medium leading-[20px] text-brand hover:underline"
        >
          <Plus className="size-[24px]" />
          <span>Nova transação</span>
        </button>
      </div>
    </div>
  );
}
