import { useNavigate, useLocation } from "react-router-dom";
import { Logo } from "@/components/ui/logo";
import { Avatar } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Transações", href: "/transacoes" },
  { label: "Categorias", href: "/categorias" },
];

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-[48px] pb-[17px] pt-[16px]">
      <Logo size="sm" />
      <nav className="absolute left-1/2 -translate-x-1/2 flex gap-[20px]">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <button
              key={link.href}
              type="button"
              onClick={() => navigate(link.href)}
              className={cn(
                "text-[14px] leading-[20px] transition-colors",
                isActive
                  ? "font-semibold text-brand"
                  : "font-normal text-[#4B5563] hover:text-gray-700",
              )}
            >
              {link.label}
            </button>
          );
        })}
      </nav>
      <button type="button" onClick={() => navigate("/perfil")}>
        <Avatar name={user?.name ?? "U"} size="sm" />
      </button>
    </header>
  );
}
