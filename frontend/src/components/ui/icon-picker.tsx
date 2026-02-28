import { cn } from "@/lib/utils";
import { availableIcons } from "@/lib/constants";
import { DynamicIcon } from "./dynamic-icon";

interface IconPickerProps {
  value: string;
  onChange: (icon: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      <label className="text-[14px] font-medium leading-[20px] text-gray-700">Ícone</label>
      <div className="flex flex-wrap gap-[8px]">
        {availableIcons.map((icon) => (
          <button
            key={icon}
            type="button"
            onClick={() => onChange(icon)}
            className={cn(
              "flex size-[42px] items-center justify-center overflow-hidden rounded-[8px] px-[13px] py-[15px] transition-colors",
              icon === value
                ? "border border-brand bg-gray-100 text-gray-800"
                : "border border-gray-300 text-gray-700 hover:bg-gray-200",
            )}
          >
            <DynamicIcon name={icon} className="size-[24px]" />
          </button>
        ))}
      </div>
    </div>
  );
}
