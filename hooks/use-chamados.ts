"use client";

import { createChamado, fetchChamadoById, fetchChamados } from "@/services/api";
import { CreateChamadoInput, PaginatedParams } from "@/types/chamado";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useChamadosList(params: PaginatedParams) {
  return useQuery({
    queryKey: ["chamados", params],
    queryFn: () => fetchChamados(params),
    placeholderData: (previousData) => previousData,
  });
}

export function useChamadoDetail(id: number | null) {
  return useQuery({
    queryKey: ["chamado", id],
    queryFn: () => fetchChamadoById(id!),
    enabled: id !== null,
  });
}

export function useCreateChamado() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateChamadoInput) => createChamado(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chamados"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}
