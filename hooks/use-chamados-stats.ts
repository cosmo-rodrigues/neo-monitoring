"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "@/services/api";

export function useChamadosStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
  });
}
