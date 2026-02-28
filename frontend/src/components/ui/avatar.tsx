import { cn } from "@/lib/utils";
import { getInitials } from "@/lib/utils";

interface AvatarProps {
  name: string;
  size?: "sm" | "lg";
  className?: string;
}

export function Avatar({ name, size = "sm", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-gray-300 font-medium text-gray-800",
        size === "sm" && "size-[36px] text-[14px] leading-[20px]",
        size === "lg" && "size-[80px] text-[20px] leading-[28px]",
        className,
      )}
    >
      {getInitials(name)}
    </div>
  );
}
