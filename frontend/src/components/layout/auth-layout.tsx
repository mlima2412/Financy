import { Logo } from "@/components/ui/logo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-[48px]">
      <div className="flex flex-col items-center gap-8">
        <Logo />
        <div className="flex w-[448px] flex-col gap-8 rounded-xl border border-gray-200 bg-white p-[33px]">
          {children}
        </div>
      </div>
    </div>
  );
}
