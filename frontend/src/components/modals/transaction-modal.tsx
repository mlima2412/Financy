import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { TypeToggle } from "@/components/ui/type-toggle";
import { TransactionType, type Transaction, type Category } from "@/types/graphql";
import {
  useCreateTransaction,
  useUpdateTransaction,
} from "@/services/transaction.service";

const transactionSchema = z.object({
  type: z.nativeEnum(TransactionType),
  description: z.string().min(1, "Descrição obrigatória"),
  date: z.string().min(1, "Data obrigatória"),
  amount: z.number().positive("Valor deve ser positivo"),
  categoryId: z.string().min(1, "Categoria obrigatória"),
});

type TransactionForm = z.infer<typeof transactionSchema>;

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  transaction?: Transaction | null;
  categories: Category[];
}

export function TransactionModal({
  open,
  onClose,
  transaction,
  categories,
}: TransactionModalProps) {
  const isEdit = !!transaction;
  const createMutation = useCreateTransaction();
  const updateMutation = useUpdateTransaction();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TransactionForm>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: TransactionType.EXPENSE,
      description: "",
      date: "",
      amount: 0,
      categoryId: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (transaction) {
        reset({
          type: transaction.type,
          description: transaction.description,
          date: transaction.date.slice(0, 10),
          amount: transaction.amount,
          categoryId: transaction.categoryId,
        });
      } else {
        reset({
          type: TransactionType.EXPENSE,
          description: "",
          date: "",
          amount: 0,
          categoryId: "",
        });
      }
    }
  }, [open, transaction, reset]);

  async function onSubmit(data: TransactionForm) {
    const payload = {
      ...data,
      date: new Date(data.date).toISOString(),
    };

    if (isEdit && transaction) {
      await updateMutation.mutateAsync({ id: transaction.id, data: payload });
    } else {
      await createMutation.mutateAsync(payload);
    }
    onClose();
  }

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const categoryOptions = categories.map((c) => ({
    label: c.title,
    value: c.id,
  }));

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Editar transação" : "Nova transação"}
      subtitle={isEdit ? "Altere os dados da transação" : "Registre sua despesa ou receita"}
      submitLabel="Salvar"
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <TypeToggle value={field.value} onChange={field.onChange} />
        )}
      />

      <Input
        label="Descrição"
        placeholder="Ex. Almoço no restaurante"
        error={errors.description?.message}
        {...register("description")}
      />

      <div className="grid grid-cols-2 gap-[16px]">
        <Input
          label="Data"
          type="date"
          error={errors.date?.message}
          {...register("date")}
        />
        <Input
          label="Valor"
          type="number"
          placeholder="0,00"
          step="0.01"
          error={errors.amount?.message}
          {...register("amount", { valueAsNumber: true })}
        />
      </div>

      <Controller
        control={control}
        name="categoryId"
        render={({ field }) => (
          <Select
            label="Categoria"
            placeholder="Selecione uma categoria"
            options={categoryOptions}
            value={field.value}
            onChange={field.onChange}
            error={errors.categoryId?.message}
          />
        )}
      />
    </Modal>
  );
}
