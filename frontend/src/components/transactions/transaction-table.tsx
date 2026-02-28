import { memo } from "react";
import Pencil from "lucide-react/dist/esm/icons/pencil";
import Trash from "lucide-react/dist/esm/icons/trash";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { Tag } from "@/components/ui/tag";
import { TypeIndicator } from "@/components/ui/type-indicator";
import { IconButton } from "@/components/ui/icon-button";
import { Pagination } from "@/components/ui/pagination";
import { formatCurrency, formatDate } from "@/lib/utils";
import { TransactionType, type Transaction } from "@/types/graphql";
import { categoryColorMap } from "@/lib/constants";

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  page?: number;
  totalPages?: number;
  total?: number;
  limit: number;
  onPageChange: (page: number) => void;
}

function getCategoryLight(color: string): string {
  return categoryColorMap[color]?.light ?? "#E5E7EB";
}

function getCategoryDark(color: string): string {
  return categoryColorMap[color]?.dark ?? "#374151";
}

const TransactionTableRow = memo(function TransactionTableRow({
  transaction,
  onEdit,
  onDelete,
}: {
  transaction: Transaction;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const isIncome = transaction.type === TransactionType.INCOME;
  const valuePrefix = isIncome ? "+ " : "- ";
  const catColor = transaction.category?.color ?? "#6B7280";

  return (
    <div className="flex items-center border-b border-gray-200">
      {/* Description cell */}
      <div className="flex flex-1 items-center gap-[16px] px-[24px] h-[72px]">
        <div
          className="flex size-[40px] shrink-0 items-center justify-center rounded-[8px]"
          style={{ backgroundColor: getCategoryLight(catColor) }}
        >
          <DynamicIcon
            name={transaction.category?.icon ?? "receipt-text"}
            className="size-[24px]"
            style={{ color: getCategoryDark(catColor) }}
          />
        </div>
        <span className="text-[16px] font-medium leading-[24px] text-gray-800">
          {transaction.description}
        </span>
      </div>

      {/* Date cell */}
      <div className="flex h-[72px] w-[112px] shrink-0 items-center justify-center px-[24px]">
        <span className="text-[14px] leading-[20px] text-[#4B5563]">
          {formatDate(transaction.date)}
        </span>
      </div>

      {/* Category cell */}
      <div className="flex h-[72px] w-[200px] shrink-0 items-center justify-center px-[24px]">
        {transaction.category && (
          <Tag
            label={transaction.category.title}
            color={transaction.category.color}
          />
        )}
      </div>

      {/* Type cell */}
      <div className="flex h-[72px] w-[136px] shrink-0 items-center justify-center px-[24px]">
        <TypeIndicator type={transaction.type} />
      </div>

      {/* Value cell */}
      <div className="flex h-[72px] w-[200px] shrink-0 items-center justify-end px-[24px]">
        <span className="text-[14px] font-semibold leading-[20px] text-gray-800">
          {valuePrefix}{formatCurrency(transaction.amount)}
        </span>
      </div>

      {/* Actions cell */}
      <div className="flex h-[72px] w-[120px] shrink-0 items-center justify-center gap-[8px] px-[24px]">
        <IconButton
          variant="danger"
          icon={<Trash className="size-[24px]" />}
          onClick={onDelete}
        />
        <IconButton
          variant="outline"
          icon={<Pencil className="size-[24px]" />}
          onClick={onEdit}
        />
      </div>
    </div>
  );
});

export function TransactionTable({
  transactions,
  onEdit,
  onDelete,
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-[12px] border border-gray-200 bg-white p-[48px] text-center text-[14px] leading-[20px] text-gray-500">
        Nenhuma transação encontrada
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[12px] border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center border-b border-gray-200">
        <div className="flex flex-1 items-center px-[24px] py-[20px]">
          <span className="text-[12px] font-medium uppercase leading-[16px] tracking-[0.6px] text-gray-500">
            Descrição
          </span>
        </div>
        <div className="flex w-[112px] shrink-0 items-center justify-center px-[24px] py-[20px]">
          <span className="text-[12px] font-medium uppercase leading-[16px] tracking-[0.6px] text-gray-500">
            Data
          </span>
        </div>
        <div className="flex w-[200px] shrink-0 items-center justify-center px-[24px] py-[20px]">
          <span className="text-[12px] font-medium uppercase leading-[16px] tracking-[0.6px] text-gray-500">
            Categoria
          </span>
        </div>
        <div className="flex w-[136px] shrink-0 items-center justify-center px-[24px] py-[20px]">
          <span className="text-[12px] font-medium uppercase leading-[16px] tracking-[0.6px] text-gray-500">
            Tipo
          </span>
        </div>
        <div className="flex w-[200px] shrink-0 items-center justify-end px-[24px] py-[20px]">
          <span className="text-[12px] font-medium uppercase leading-[16px] tracking-[0.6px] text-gray-500">
            Valor
          </span>
        </div>
        <div className="flex w-[120px] shrink-0 items-center justify-end px-[24px] py-[20px]">
          <span className="text-[12px] font-medium uppercase leading-[16px] tracking-[0.6px] text-gray-500">
            Ações
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col">
        {transactions.map((t) => (
          <TransactionTableRow
            key={t.id}
            transaction={t}
            onEdit={() => onEdit(t)}
            onDelete={() => onDelete(t.id)}
          />
        ))}
      </div>

      {/* Footer / Pagination */}
      {page != null && totalPages != null && totalPages > 0 && total != null && (
        <div className="px-[24px] py-[20px]">
          <Pagination
            page={page}
            totalPages={totalPages}
            total={total}
            limit={limit}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
