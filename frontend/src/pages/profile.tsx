import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import UserRound from "lucide-react/dist/esm/icons/user-round";
import Mail from "lucide-react/dist/esm/icons/mail";
import LogOut from "lucide-react/dist/esm/icons/log-out";
import { useAuth } from "@/hooks/use-auth";
import { useUpdateUser } from "@/services/user.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const profileSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
});

type ProfileForm = z.infer<typeof profileSchema>;

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, updateUser: setAuthUser } = useAuth();
  const updateUser = useUpdateUser();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({ name: user.name });
    }
  }, [user, reset]);

  async function onSubmit(data: ProfileForm) {
    const updated = await updateUser.mutateAsync(data);
    setAuthUser(updated);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  if (!user) return null;

  return (
    <div className="flex justify-center">
      <div className="flex w-[448px] flex-col gap-[32px] rounded-[12px] border border-gray-200 bg-white p-[33px]">
        {/* Header */}
        <div className="flex flex-col items-center gap-[24px]">
          <div className="flex size-[64px] items-center justify-center rounded-full bg-gray-300">
            <span className="text-[24px] font-medium leading-[40px] text-gray-800">
              {user.name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join("")}
            </span>
          </div>
          <div className="flex flex-col items-center gap-[2px] text-center">
            <h2 className="text-[20px] font-semibold leading-[28px] text-gray-800">{user.name}</h2>
            <p className="text-[16px] leading-[24px] text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full border-t border-gray-200" />

        {/* Form */}
        <div>
          {success && (
            <p className="mb-4 text-[14px] leading-[20px] text-success">
              Alterações salvas com sucesso!
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[16px]">
            <Input
              label="Nome completo"
              leftIcon={<UserRound className="size-[24px]" />}
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="E-mail"
              leftIcon={<Mail className="size-[24px]" />}
              value={user.email}
              disabled
              helper="O e-mail não pode ser alterado"
            />
          </form>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-[16px]">
          <Button type="submit" fullWidth disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
            {isSubmitting ? "Salvando..." : "Salvar alterações"}
          </Button>

          <Button
            variant="outline"
            fullWidth
            icon={<LogOut className="size-[24px]" />}
            onClick={handleLogout}
          >
            Sair da conta
          </Button>
        </div>
      </div>
    </div>
  );
}
