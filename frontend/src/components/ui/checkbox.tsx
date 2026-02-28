import { cn } from "@/lib/utils";
import Check from "lucide-react/dist/esm/icons/check";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function Checkbox({ checked, onChange, label, className }: CheckboxProps) {
  return (
    <label className={cn("flex cursor-pointer items-center gap-2", className)}>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "flex h-4 w-4 items-center justify-center rounded border transition-colors",
          checked
            ? "border-brand bg-brand text-white"
            : "border-gray-300 bg-white",
        )}
      >
        {checked && <Check className="h-3 w-3" />}
      </button>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}
