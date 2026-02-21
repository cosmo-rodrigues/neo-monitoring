"use client";

import { Tag } from "antd";
import { useTranslation } from "@/i18n/context";
import type { Prioridade } from "@/types/chamado";

const PRIORIDADE_CONFIG: Record<Prioridade, { color: string }> = {
  "Crítica": { color: "red" },
  Alta: { color: "orange" },
  "Média": { color: "gold" },
  Baixa: { color: "default" },
};

interface PriorityTagProps {
  prioridade: Prioridade;
  className?: string;
}

export function PriorityTag({ prioridade, className }: PriorityTagProps) {
  const { t } = useTranslation();
  const config = PRIORIDADE_CONFIG[prioridade];

  return (
    <Tag color={config.color} className={className}>
      {t(`common.priority.${prioridade}`)}
    </Tag>
  );
}
