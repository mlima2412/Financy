import CircleArrowDown from "lucide-react/dist/esm/icons/circle-arrow-down";
import CircleArrowUp from "lucide-react/dist/esm/icons/circle-arrow-up";
import { cn } from "@/lib/utils";
import { TransactionType } from "@/types/graphql";

interface TypeToggleProps {
  value: TransactionType;
  onChange: (value: TransactionType) => void;
}

export function TypeToggle({ value, onChange }: TypeToggleProps) {
  return (
    <div className="flex rounded-[12px] border border-gray-200 p-[8px]">
      <button
        type="button"
        onClick={() => onChange(TransactionType.EXPENSE)}
        className={cn(
          "flex flex-1 items-center justify-center gap-[12px] rounded-[8px] px-[12px] py-[14px] text-[16px] leading-[18px] transition-colors",
          value === TransactionType.EXPENSE
            ? "border border-[#DC2626] bg-gray-100 font-medium text-gray-800"
            : "font-normal text-[#4B5563]",
        )}
      >
        <CircleArrowDown
          className="size-[24px]"
          style={{ color: "#DC2626" }}
        />
        Despesa
      </button>
      <button
        type="button"
        onClick={() => onChange(TransactionType.INCOME)}
        className={cn(
          "flex flex-1 items-center justify-center gap-[12px] rounded-[8px] px-[12px] py-[14px] text-[16px] leading-[18px] transition-colors",
          value === TransactionType.INCOME
            ? "border border-[#16A34A] bg-gray-100 font-medium text-gray-800"
            : "font-normal text-[#4B5563]",
        )}
      >
        <CircleArrowUp
          className="size-[24px]"
          style={{ color: "#16A34A" }}
        />
        Receita
      </button>
    </div>
  );
}
