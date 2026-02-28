import { useState, useRef, useEffect } from "react";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import ChevronUp from "lucide-react/dist/esm/icons/chevron-up";
import Check from "lucide-react/dist/esm/icons/check";
import { cn } from "@/lib/utils";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

export function Select({
  label,
  placeholder = "Selecione",
  options,
  value,
  onChange,
  error,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="flex flex-col gap-[8px]" ref={ref}>
      {label && (
        <label
          className={cn(
            "text-[14px] font-medium leading-[20px]",
            error ? "text-danger" : "text-gray-700",
          )}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            "flex w-full items-center justify-between gap-[12px] rounded-[8px] border border-gray-300 bg-white px-[13px] py-[15px] text-left text-[16px] leading-[18px]",
            selected ? "text-gray-800" : "text-gray-400",
            open && "ring-1 ring-brand",
          )}
        >
          <span>{selected?.label ?? placeholder}</span>
          {open ? (
            <ChevronUp className="size-[24px] text-gray-400" />
          ) : (
            <ChevronDown className="size-[24px] text-gray-400" />
          )}
        </button>
        {open && (
          <div className="absolute top-full left-0 z-50 mt-1 w-full rounded-[8px] border border-gray-300 bg-white shadow-[0px_4px_15px_rgba(0,0,0,0.1)]">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-[13px] py-[15px] text-[16px] leading-[18px] text-gray-800 hover:bg-gray-100",
                  option.value === value && "font-medium",
                )}
              >
                <span>{option.label}</span>
                {option.value === value && (
                  <Check className="size-[24px] text-brand" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <span className="text-[12px] leading-[16px] text-danger">{error}</span>}
    </div>
  );
}
