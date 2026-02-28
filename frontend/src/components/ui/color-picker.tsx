import { cn } from "@/lib/utils";
import { availableColors } from "@/lib/constants";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      <label className="text-[14px] font-medium leading-[20px] text-gray-700">Cor</label>
      <div className="flex gap-[8px]">
        {availableColors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={cn(
              "flex flex-1 items-center justify-center overflow-hidden rounded-[8px] p-[5px] transition-all",
              color === value
                ? "border border-brand bg-gray-100"
                : "border border-gray-300",
            )}
          >
            <div
              className="h-[20px] w-full rounded-[4px]"
              style={{ backgroundColor: color }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
