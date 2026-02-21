"use client";

import { Tag } from "antd";
import { useTranslation } from "@/i18n/context";
import type { Status } from "@/types/chamado";

const STATUS_CONFIG: Record<Status, { color: string }> = {
  Aberto: { color: "blue" },
  "Em andamento": { color: "orange" },
  Resolvido: { color: "green" },
  Cancelado: { color: "default" },
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { t } = useTranslation();
  const config = STATUS_CONFIG[status];

  return (
    <Tag color={config.color} className={className}>
      {t(`common.status.${status}`)}
    </Tag>
  );
}
