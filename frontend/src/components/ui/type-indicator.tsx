import CircleArrowUp from "lucide-react/dist/esm/icons/circle-arrow-up";
import CircleArrowDown from "lucide-react/dist/esm/icons/circle-arrow-down";
import { TransactionType } from "@/types/graphql";

interface TypeIndicatorProps {
  type: TransactionType;
  showLabel?: boolean;
}

export function TypeIndicator({ type, showLabel = true }: TypeIndicatorProps) {
  const isIncome = type === TransactionType.INCOME;

  return (
    <div className="flex items-center gap-[8px]">
      {isIncome ? (
        <CircleArrowUp className="size-[24px]" style={{ color: "#16A34A" }} />
      ) : (
        <CircleArrowDown className="size-[24px]" style={{ color: "#DC2626" }} />
      )}
      {showLabel && (
        <span
          className="text-[14px] font-medium leading-[20px]"
          style={{ color: isIncome ? "#15803D" : "#B91C1C" }}
        >
          {isIncome ? "Entrada" : "Saída"}
        </span>
      )}
    </div>
  );
}
