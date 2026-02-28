import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import { TRANSACTIONS_QUERY } from "@/graphql/queries/transactions";
import {
  CREATE_TRANSACTION_MUTATION,
  UPDATE_TRANSACTION_MUTATION,
  DELETE_TRANSACTION_MUTATION,
} from "@/graphql/mutations/transactions";
import type {
  PaginatedTransactions,
  Transaction,
  TransactionFilters,
  CreateTransactionInput,
  UpdateTransactionInput,
} from "@/types/graphql";

export function useTransactions(filters?: TransactionFilters) {
  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: () =>
      graphqlClient
        .request<{ transactions: PaginatedTransactions }>(TRANSACTIONS_QUERY, {
          filters,
        })
        .then((res) => res.transactions),
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTransactionInput) =>
      graphqlClient
        .request<{ createTransaction: Transaction }>(
          CREATE_TRANSACTION_MUTATION,
          { data },
        )
        .then((res) => res.createTransaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTransactionInput }) =>
      graphqlClient
        .request<{ updateTransaction: Transaction }>(
          UPDATE_TRANSACTION_MUTATION,
          { id, data },
        )
        .then((res) => res.updateTransaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      graphqlClient
        .request<{ deleteTransaction: boolean }>(DELETE_TRANSACTION_MUTATION, {
          id,
        })
        .then((res) => res.deleteTransaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
