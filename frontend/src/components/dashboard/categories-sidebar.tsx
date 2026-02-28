import { Tag } from "@/components/ui/tag";
import { AppLink } from "@/components/ui/link";
import { formatCurrency } from "@/lib/utils";
import type { Category } from "@/types/graphql";

interface CategoriesSidebarProps {
  categories: Category[];
}

export function CategoriesSidebar({ categories }: CategoriesSidebarProps) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-[24px] pb-[21px] pt-[20px]">
        <span className="text-[12px] font-medium uppercase leading-[16px] tracking-[0.6px] text-gray-500">
          Categorias
        </span>
        <AppLink to="/categorias" iconRight>
          Gerenciar
        </AppLink>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-[20px] p-[24px]">
        {categories.length === 0 ? (
          <p className="py-[32px] text-center text-[14px] leading-[20px] text-gray-500">
            Nenhuma categoria
          </p>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-[4px]">
              <Tag label={cat.title} color={cat.color} />
              <span className="flex-1 text-right text-[14px] leading-[20px] text-[#4B5563]">
                {cat.transactionCount} itens
              </span>
              <span className="w-[88px] text-right text-[14px] font-semibold leading-[20px] text-gray-800">
                {formatCurrency(cat.totalValue)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
