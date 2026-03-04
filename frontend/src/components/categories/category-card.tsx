import { memo } from "react";
import SquarePen from "lucide-react/dist/esm/icons/square-pen";
import Trash from "lucide-react/dist/esm/icons/trash";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { IconButton } from "@/components/ui/icon-button";
import { Tag } from "@/components/ui/tag";
import { categoryColorMap } from "@/lib/constants";
import type { Category } from "@/types/graphql";

interface CategoryCardProps {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
}

export const CategoryCard = memo(function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  const lightBg = categoryColorMap[category.color]?.light ?? "#E5E7EB";
  const darkColor = categoryColorMap[category.color]?.dark ?? "#374151";

  return (
    <div className="flex flex-col gap-[20px] rounded-[12px] border border-gray-200 bg-white p-[25px]">
      {/* Header: icon + actions */}
      <div className="flex items-start justify-between">
        <div
          className="flex size-[40px] items-center justify-center rounded-[8px]"
          style={{ backgroundColor: category.color }}
        >
          <DynamicIcon name={category.icon} className="size-[24px]" style={{ color: "#FFFFFF" }} />
        </div>
        <div className="flex gap-[8px]">
          <IconButton
            variant="danger"
            icon={<Trash className="size-[24px]" />}
            onClick={onDelete}
          />
          <IconButton
            variant="outline"
            icon={<SquarePen className="size-[24px]" />}
            onClick={onEdit}
          />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-[4px]">
        <h3 className="text-[16px] font-semibold leading-[24px] text-gray-800">
          {category.title}
        </h3>
        {category.description && (
          <p className="h-[40px] overflow-hidden text-ellipsis text-[14px] leading-[20px] text-[#4B5563]">
            {category.description}
          </p>
        )}
      </div>

      {/* Footer: tag + count */}
      <div className="flex items-center justify-between">
        <Tag label={category.title} color={category.color} />
        <span className="text-[14px] leading-[20px] text-[#4B5563]">
          {category.transactionCount} itens
        </span>
      </div>
    </div>
  );
});
