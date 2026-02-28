import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Mail from "lucide-react/dist/esm/icons/mail";
import LockKeyhole from "lucide-react/dist/esm/icons/lock-keyhole";
import Eye from "lucide-react/dist/esm/icons/eye";
import EyeClosed from "lucide-react/dist/esm/icons/eye-closed";
import UserRound from "lucide-react/dist/esm/icons/user-round";
import LogIn from "lucide-react/dist/esm/icons/log-in";
import { useAuth } from "@/hooks/use-auth";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const registerSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterForm) {
    try {
      setError("");
      await registerUser(data);
      navigate("/dashboard");
    } catch {
      setError("Erro ao criar conta. Tente novamente.");
    }
  }

  return (
    <AuthLayout>
      {/* Header — centered, gap-[4px] */}
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-[20px] font-bold leading-[28px] text-gray-800">
          Criar conta
        </h1>
        <p className="text-[16px] leading-[24px] text-[#4B5563]">
          Comece a controlar suas finanças ainda hoje
        </p>
      </div>

      {/* Form — gap-[24px] between sections */}
      <div>
        {error && (
          <p className="mb-4 text-sm text-danger">{error}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Inputs group — gap-[16px] */}
          <div className="flex flex-col gap-4">
            <Input
              label="Nome completo"
              placeholder="Seu nome completo"
              leftIcon={<UserRound className="size-6" />}
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="E-mail"
              placeholder="mail@exemplo.com"
              type="email"
              leftIcon={<Mail className="size-6" />}
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Senha"
              placeholder="Digite sua senha"
              type={showPassword ? "text" : "password"}
              leftIcon={<LockKeyhole className="size-6" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex items-center justify-center text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? (
                    <Eye className="size-6" />
                  ) : (
                    <EyeClosed className="size-6" />
                  )}
                </button>
              }
              error={errors.password?.message}
              helper="A senha deve ter no mínimo 8 caracteres"
              {...register("password")}
            />
          </div>

          {/* Cadastrar button */}
          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </Button>

          {/* Divider — gap-[12px] */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 border-t border-gray-300" />
            <span className="text-sm leading-5 text-gray-500">ou</span>
            <div className="h-px flex-1 border-t border-gray-300" />
          </div>

          {/* Login section — gap-[16px] */}
          <div className="flex flex-col gap-4">
            <p className="text-center text-[14px] leading-[20px] text-[#4B5563]">
              Já tem uma conta?
            </p>
            <Button
              variant="outline"
              fullWidth
              icon={<LogIn className="size-6" />}
              onClick={() => navigate("/")}
            >
              Fazer login
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
