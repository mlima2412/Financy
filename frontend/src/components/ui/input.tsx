import { forwardRef, useState, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends Omit<ComponentProps<"input">, "size"> {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helper, leftIcon, rightIcon, className, disabled, onFocus, onBlur, ...props }, ref) => {
    const [focused, setFocused] = useState(false);

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            className={cn(
              "text-[14px] font-medium leading-[20px]",
              error ? "text-danger" : focused ? "text-brand" : "text-gray-700",
            )}
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg border bg-white px-[13px] py-[15px]",
            error ? "border-danger" : "border-gray-300",
            focused && "ring-1 ring-brand",
            disabled && "opacity-50",
            className,
          )}
        >
          {leftIcon && (
            <span className="text-gray-400">{leftIcon}</span>
          )}
          <input
            ref={ref}
            className="flex-1 bg-transparent text-base leading-[18px] text-gray-800 outline-none placeholder:text-gray-400"
            disabled={disabled}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            {...props}
          />
          {rightIcon && (
            <span className="text-gray-400">{rightIcon}</span>
          )}
        </div>
        {error && <span className="text-[12px] leading-[16px] text-danger">{error}</span>}
        {!error && helper && (
          <span className="text-[12px] leading-[16px] text-gray-500">{helper}</span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
