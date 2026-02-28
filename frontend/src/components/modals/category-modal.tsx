import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { IconPicker } from "@/components/ui/icon-picker";
import { ColorPicker } from "@/components/ui/color-picker";
import { availableColors, availableIcons } from "@/lib/constants";
import type { Category } from "@/types/graphql";
import {
  useCreateCategory,
  useUpdateCategory,
} from "@/services/category.service";

const categorySchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  description: z.string().optional(),
  icon: z.string().min(1, "Selecione um ícone"),
  color: z.string().min(1, "Selecione uma cor"),
});

type CategoryForm = z.infer<typeof categorySchema>;

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  category?: Category | null;
}

export function CategoryModal({ open, onClose, category }: CategoryModalProps) {
  const isEdit = !!category;
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: "",
      description: "",
      icon: availableIcons[0],
      color: availableColors[0],
    },
  });

  useEffect(() => {
    if (open) {
      if (category) {
        reset({
          title: category.title,
          description: category.description ?? "",
          icon: category.icon,
          color: category.color,
        });
      } else {
        reset({
          title: "",
          description: "",
          icon: availableIcons[0],
          color: availableColors[0],
        });
      }
    }
  }, [open, category, reset]);

  async function onSubmit(data: CategoryForm) {
    if (isEdit && category) {
      await updateMutation.mutateAsync({ id: category.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
    onClose();
  }

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Editar categoria" : "Nova categoria"}
      subtitle={
        isEdit
          ? "Altere os dados da categoria"
          : "Organize suas transações com categorias"
      }
      submitLabel="Salvar"
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <Input
        label="Título"
        placeholder="Ex. Alimentação"
        error={errors.title?.message}
        {...register("title")}
      />

      <Input
        label="Descrição"
        placeholder="Descrição da categoria"
        helper="Opcional"
        {...register("description")}
      />

      <Controller
        control={control}
        name="icon"
        render={({ field }) => (
          <IconPicker value={field.value} onChange={field.onChange} />
        )}
      />

      <Controller
        control={control}
        name="color"
        render={({ field }) => (
          <ColorPicker value={field.value} onChange={field.onChange} />
        )}
      />
    </Modal>
  );
}
