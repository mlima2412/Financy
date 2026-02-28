import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "solid" | "outline";
  size?: "md" | "sm";
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = "solid",
  size = "md",
  icon,
  fullWidth,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-center gap-[8px] rounded-[8px] font-medium transition-colors",
        size === "md" && "h-[48px] px-[16px] py-[12px] text-[16px] leading-[24px]",
        size === "sm" && "h-[36px] px-[12px] py-[8px] text-[14px] leading-[20px]",
        variant === "solid" &&
          "bg-brand text-white hover:bg-brand-dark disabled:opacity-50",
        variant === "outline" &&
          "border border-gray-300 bg-white text-gray-700 hover:bg-gray-200 disabled:opacity-50",
        fullWidth && "w-full",
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
