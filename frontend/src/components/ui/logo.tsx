import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md";
  className?: string;
}

export function Logo({ size = "md", className }: LogoProps) {
  return (
    <div className={cn("flex items-center", size === "sm" ? "gap-[8.351px]" : "gap-[11px]", className)}>
      <img
        src="/logo-icon.svg"
        alt=""
        className={size === "sm" ? "h-[24px] w-[24px]" : "h-[32px] w-[32px]"}
      />
      <img
        src="/logo-text.svg"
        alt="Financy"
        className={size === "sm" ? "h-[14px] w-[67px]" : "h-[19px] w-[90px]"}
      />
    </div>
  );
}
