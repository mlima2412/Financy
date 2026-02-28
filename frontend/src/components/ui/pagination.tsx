import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

function PaginationButton({
  active,
  disabled,
  children,
  onClick,
}: {
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex size-[32px] items-center justify-center rounded-[8px] text-[14px] font-medium leading-[20px] transition-colors",
        active
          ? "bg-brand text-white"
          : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-200",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      {children}
    </button>
  );
}

export function Pagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: PaginationProps) {
  const safePage = Math.max(1, Math.min(page, totalPages));
  const start = (safePage - 1) * limit + 1;
  const end = Math.min(safePage * limit, total);

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-[14px] leading-[20px] text-gray-700">
        <span className="font-medium">{start}</span> a <span className="font-medium">{end}</span> | <span className="font-medium">{total}</span> resultados
      </span>
      <div className="flex items-center gap-[8px]">
        <PaginationButton
          disabled={safePage <= 1}
          onClick={() => onPageChange(safePage - 1)}
        >
          <ChevronLeft className="size-[24px]" />
        </PaginationButton>
        {pages.map((p) => (
          <PaginationButton
            key={p}
            active={p === safePage}
            onClick={() => onPageChange(p)}
          >
            {p}
          </PaginationButton>
        ))}
        <PaginationButton
          disabled={safePage >= totalPages}
          onClick={() => onPageChange(safePage + 1)}
        >
          <ChevronRight className="size-[24px]" />
        </PaginationButton>
      </div>
    </div>
  );
}
