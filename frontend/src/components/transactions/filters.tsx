import { useEffect, useMemo, useRef, useState } from "react";
import Search from "lucide-react/dist/esm/icons/search";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { TransactionType, type TransactionFilters, type Category } from "@/types/graphql";
import { formatMonthYear } from "@/lib/utils";

interface FiltersProps {
  filters: TransactionFilters;
  onFiltersChange: (filters: TransactionFilters) => void;
  categories: Category[];
}

const typeOptions = [
  { label: "Todos", value: "" },
  { label: "Entrada", value: TransactionType.INCOME },
  { label: "Saída", value: TransactionType.EXPENSE },
];

function getLast12Months(): { label: string; value: string }[] {
  const months: { label: string; value: string }[] = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = formatMonthYear(d);
    const value = `${d.getMonth() + 1}-${d.getFullYear()}`;
    months.push({ label: label.charAt(0).toUpperCase() + label.slice(1), value });
  }
  return months;
}

export function Filters({ filters, onFiltersChange, categories }: FiltersProps) {
  const [search, setSearch] = useState(filters.search ?? "");
  const periodOptions = useMemo(getLast12Months, []);
  const onFiltersChangeRef = useRef(onFiltersChange);
  const filtersRef = useRef(filters);
  onFiltersChangeRef.current = onFiltersChange;
  filtersRef.current = filters;

  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChangeRef.current({
        ...filtersRef.current,
        search: search || undefined,
        page: 1,
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const categoryOptions = useMemo(
    () => [
      { label: "Todas", value: "" },
      ...categories.map((c) => ({ label: c.title, value: c.id })),
    ],
    [categories],
  );

  const currentPeriod = filters.month && filters.year
    ? `${filters.month}-${filters.year}`
    : "";

  return (
    <div className="flex gap-[16px] rounded-[12px] border border-gray-200 bg-white px-[25px] pb-[25px] pt-[21px]">
      <div className="flex-1">
        <Input
          label="Buscar"
          placeholder="Buscar por descrição"
          leftIcon={<Search className="size-[24px]" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex-1">
        <Select
          label="Tipo"
          placeholder="Tipo"
          options={typeOptions}
          value={filters.type ?? ""}
          onChange={(v) =>
            onFiltersChange({
              ...filters,
              type: (v as TransactionType) || undefined,
              page: 1,
            })
          }
        />
      </div>
      <div className="flex-1">
        <Select
          label="Categoria"
          placeholder="Categoria"
          options={categoryOptions}
          value={filters.categoryId ?? ""}
          onChange={(v) =>
            onFiltersChange({ ...filters, categoryId: v || undefined, page: 1 })
          }
        />
      </div>
      <div className="flex-1">
        <Select
          label="Período"
          placeholder="Período"
          options={periodOptions}
          value={currentPeriod}
          onChange={(v) => {
            if (v) {
              const [m, y] = v.split("-");
              onFiltersChange({
                ...filters,
                month: Number(m),
                year: Number(y),
                page: 1,
              });
            } else {
              onFiltersChange({
                ...filters,
                month: undefined,
                year: undefined,
                page: 1,
              });
            }
          }}
        />
      </div>
    </div>
  );
}
