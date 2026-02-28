import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Mail from "lucide-react/dist/esm/icons/mail";
import LockKeyhole from "lucide-react/dist/esm/icons/lock-keyhole";
import EyeClosed from "lucide-react/dist/esm/icons/eye-closed";
import Eye from "lucide-react/dist/esm/icons/eye";
import UserRoundPlus from "lucide-react/dist/esm/icons/user-round-plus";
import { useAuth } from "@/hooks/use-auth";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const loginSchema = z.object({
  email: z.string().email("E-mail invalido"),
  password: z.string().min(1, "Senha obrigatoria"),
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginForm) {
    try {
      setError("");
      await login(data);
      navigate("/dashboard");
    } catch {
      setError("E-mail ou senha incorretos");
    }
  }

  return (
    <AuthLayout>
      {/* Header — centered, gap-[4px] */}
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-xl font-bold leading-7 text-gray-800">
          Fazer login
        </h1>
        <p className="text-base leading-6 text-[#4B5563]">
          Entre na sua conta para continuar
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
              {...register("password")}
            />

            <div className="flex items-center justify-between">
              <Checkbox
                checked={remember}
                onChange={setRemember}
                label="Lembrar-me"
              />
              <button
                type="button"
                className="text-sm font-medium leading-5 text-brand hover:underline"
              >
                Recuperar senha
              </button>
            </div>
          </div>

          {/* Entrar button */}
          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>

          {/* Divider — gap-[12px] */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 border-t border-gray-300" />
            <span className="text-sm leading-5 text-gray-500">ou</span>
            <div className="h-px flex-1 border-t border-gray-300" />
          </div>

          {/* Sign up — gap-[16px] */}
          <div className="flex flex-col gap-4">
            <p className="text-center text-sm leading-5 text-[#4B5563]">
              Ainda não tem uma conta?
            </p>
            <Button
              variant="outline"
              fullWidth
              icon={<UserRoundPlus className="size-6" />}
              onClick={() => navigate("/cadastro")}
            >
              Criar conta
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
