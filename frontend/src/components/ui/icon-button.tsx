import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface IconButtonProps extends ComponentProps<"button"> {
  variant?: "outline" | "danger";
  icon: React.ReactNode;
}

export function IconButton({
  variant = "outline",
  icon,
  className,
  disabled,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-[32px] items-center justify-center rounded-[8px] border border-gray-300 bg-white p-[8px] transition-colors disabled:opacity-50",
        variant === "outline" &&
          "text-gray-700 hover:bg-gray-200",
        variant === "danger" &&
          "text-[#DC2626] hover:bg-gray-200",
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {icon}
    </button>
  );
}
