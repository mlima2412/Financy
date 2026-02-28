import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import { ME_QUERY } from "@/graphql/queries/user";
import { UPDATE_USER_MUTATION } from "@/graphql/mutations/user";
import type { User, UpdateUserInput } from "@/types/graphql";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () =>
      graphqlClient
        .request<{ me: User }>(ME_QUERY)
        .then((res) => res.me),
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateUserInput) =>
      graphqlClient
        .request<{ updateUser: User }>(UPDATE_USER_MUTATION, { data })
        .then((res) => res.updateUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
