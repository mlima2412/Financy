import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import { DASHBOARD_QUERY } from "@/graphql/queries/dashboard";
import type { DashboardOutput } from "@/types/graphql";

export function useDashboard(month?: number, year?: number) {
  return useQuery({
    queryKey: ["dashboard", month, year],
    queryFn: () =>
      graphqlClient
        .request<{ dashboard: DashboardOutput }>(DASHBOARD_QUERY, {
          month,
          year,
        })
        .then((res) => res.dashboard),
  });
}
