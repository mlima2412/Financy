import Wallet from "lucide-react/dist/esm/icons/wallet";
import CircleArrowUp from "lucide-react/dist/esm/icons/circle-arrow-up";
import CircleArrowDown from "lucide-react/dist/esm/icons/circle-arrow-down";
import { formatCurrency } from "@/lib/utils";

interface SummaryCardsProps {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-[16px] rounded-[12px] border border-gray-200 bg-white p-[25px]">
      <div className="flex items-center gap-[12px]">
        {icon}
        <span className="text-[12px] font-medium uppercase leading-[16px] tracking-[0.6px] text-gray-500">
          {label}
        </span>
      </div>
      <p className="text-[28px] font-bold leading-[32px] text-gray-800">
        {value}
      </p>
    </div>
  );
}

export function SummaryCards({
  totalBalance,
  monthlyIncome,
  monthlyExpenses,
}: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-[24px]">
      <SummaryCard
        icon={<Wallet className="size-[24px] text-brand" />}
        label="Saldo Total"
        value={formatCurrency(totalBalance)}
      />
      <SummaryCard
        icon={<CircleArrowUp className="size-[24px]" style={{ color: "#16A34A" }} />}
        label="Receitas do mês"
        value={formatCurrency(monthlyIncome)}
      />
      <SummaryCard
        icon={<CircleArrowDown className="size-[24px]" style={{ color: "#DC2626" }} />}
        label="Despesas do mês"
        value={formatCurrency(monthlyExpenses)}
      />
    </div>
  );
}
