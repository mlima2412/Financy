import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AppLinkProps extends RouterLinkProps {
  iconLeft?: boolean;
  iconRight?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function AppLink({
  iconLeft,
  iconRight,
  className,
  children,
  ...props
}: AppLinkProps) {
  return (
    <RouterLink
      className={cn(
        "inline-flex items-center gap-[4px] text-[14px] font-medium leading-[20px] text-brand hover:underline",
        className,
      )}
      {...props}
    >
      {iconLeft && <ChevronLeft className="size-[24px]" />}
      <span>{children}</span>
      {iconRight && <ChevronRight className="size-[24px]" />}
    </RouterLink>
  );
}

interface ButtonLinkProps {
  iconLeft?: boolean;
  iconRight?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function ButtonLink({
  iconLeft,
  iconRight,
  className,
  children,
  onClick,
}: ButtonLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-[4px] text-[14px] font-medium leading-[20px] text-brand hover:underline",
        className,
      )}
    >
      {iconLeft && <ChevronLeft className="size-[24px]" />}
      <span>{children}</span>
      {iconRight && <ChevronRight className="size-[24px]" />}
    </button>
  );
}
