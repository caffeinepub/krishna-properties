import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CustomerQuery } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllQueries() {
  const { actor, isFetching } = useActor();
  return useQuery<CustomerQuery[]>({
    queryKey: ["queries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllQueries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetQueryCountByStatus() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<[string, bigint]>>({
    queryKey: ["queryCountByStatus"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQueryCountByStatus();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddQuery() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      email: string;
      serviceType: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addQuery(
        data.name,
        data.phone,
        data.email,
        data.serviceType,
        data.message,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queries"] });
      queryClient.invalidateQueries({ queryKey: ["queryCountByStatus"] });
    },
  });
}

export function useUpdateQueryStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      queryId,
      newStatus,
    }: { queryId: bigint; newStatus: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateQueryStatus(queryId, newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queries"] });
      queryClient.invalidateQueries({ queryKey: ["queryCountByStatus"] });
    },
  });
}
