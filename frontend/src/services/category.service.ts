import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import { CATEGORIES_QUERY } from "@/graphql/queries/categories";
import {
  CREATE_CATEGORY_MUTATION,
  UPDATE_CATEGORY_MUTATION,
  DELETE_CATEGORY_MUTATION,
} from "@/graphql/mutations/categories";
import type {
  CategorySummary,
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@/types/graphql";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      graphqlClient
        .request<{ categories: CategorySummary }>(CATEGORIES_QUERY)
        .then((res) => res.categories),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCategoryInput) =>
      graphqlClient
        .request<{ createCategory: Category }>(CREATE_CATEGORY_MUTATION, {
          data,
        })
        .then((res) => res.createCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryInput }) =>
      graphqlClient
        .request<{ updateCategory: Category }>(UPDATE_CATEGORY_MUTATION, {
          id,
          data,
        })
        .then((res) => res.updateCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      graphqlClient
        .request<{ deleteCategory: boolean }>(DELETE_CATEGORY_MUTATION, { id })
        .then((res) => res.deleteCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}
