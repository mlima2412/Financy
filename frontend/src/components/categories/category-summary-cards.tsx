import TagIcon from "lucide-react/dist/esm/icons/tag";
import ArrowUpDown from "lucide-react/dist/esm/icons/arrow-up-down";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import type { Category } from "@/types/graphql";

interface CategorySummaryCardsProps {
  totalCategories: number;
  totalTransactions: number;
  mostUsedCategory: string | null;
  categories: Category[];
}

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex gap-[16px] rounded-[12px] border border-gray-200 bg-white p-[25px]">
      <div className="flex size-[32px] shrink-0 items-center justify-center">
        {icon}
      </div>
      <div className="flex flex-1 flex-col gap-[8px]">
        <p className="text-[28px] font-bold leading-[32px] text-gray-800">{value}</p>
        <span className="text-[12px] font-medium uppercase leading-[16px] tracking-[0.6px] text-gray-500">
          {label}
        </span>
      </div>
    </div>
  );
}

export function CategorySummaryCards({
  totalCategories,
  totalTransactions,
  mostUsedCategory,
  categories,
}: CategorySummaryCardsProps) {
  const mostUsed = categories.find((c) => c.title === mostUsedCategory);

  return (
    <div className="flex gap-[24px]">
      <div className="flex-1">
        <SummaryCard
          icon={<TagIcon className="size-[24px]" style={{ color: "#374151" }} />}
          label="Total de categorias"
          value={totalCategories}
        />
      </div>
      <div className="flex-1">
        <SummaryCard
          icon={<ArrowUpDown className="size-[24px]" style={{ color: "#9333EA" }} />}
          label="Total de transações"
          value={totalTransactions}
        />
      </div>
      <div className="flex-1">
        <SummaryCard
          icon={
            mostUsed ? (
              <DynamicIcon
                name={mostUsed.icon}
                className="size-[24px]"
                style={{ color: mostUsed.color }}
              />
            ) : (
              <TagIcon className="size-[24px] text-gray-400" />
            )
          }
          label="Categoria mais utilizada"
          value={mostUsedCategory ?? "-"}
        />
      </div>
    </div>
  );
}
