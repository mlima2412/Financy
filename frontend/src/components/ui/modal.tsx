import { useEffect } from "react";
import X from "lucide-react/dist/esm/icons/x";
import { Button } from "./button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  submitLabel?: string;
  onSubmit?: () => void;
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  submitLabel = "Salvar",
  onSubmit,
  isLoading,
  children,
}: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex w-[448px] flex-col gap-[24px] rounded-[12px] border border-gray-200 bg-white p-[25px]">
        <div className="flex w-full gap-[16px] items-start">
          <div className="flex flex-1 flex-col gap-[2px]">
            <h2 className="text-[16px] font-semibold leading-[24px] text-gray-800">{title}</h2>
            {subtitle && (
              <p className="truncate text-[14px] leading-[20px] text-[#4B5563]">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-[32px] items-center justify-center rounded-[8px] border border-gray-300 bg-white p-[8px] text-gray-700 hover:bg-gray-200"
          >
            <X className="size-[24px]" />
          </button>
        </div>
        <div className="flex flex-col gap-[16px]">{children}</div>
        {onSubmit && (
          <Button
            fullWidth
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Salvando..." : submitLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
