import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? date : date.toISOString();
  const [year, month, day] = d.slice(0, 10).split("-").map(Number);
  return format(new Date(year!, month! - 1, day!), "dd/MM/yy");
}

export function formatMonthYear(date: Date): string {
  return format(date, "MMMM '/' yyyy", { locale: ptBR });
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}
