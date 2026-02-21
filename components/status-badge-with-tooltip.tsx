"use client";

import { Tooltip } from "antd";
import { StatusBadge } from "./status-badge";
import type { Status } from "@/types/chamado";

interface StatusBadgeWithTooltipProps {
  status: Status;
  tooltipTitle: string;
  tooltipContent?: string;
  className?: string;
}

/**
 * StatusBadge wrapped with Tooltip capability.
 * Demonstrates composition pattern for adding features without prop drilling.
 *
 * @example
 * <StatusBadgeWithTooltip
 *   status="Em andamento"
 *   tooltipTitle="Status"
 *   tooltipContent="Atribuído para João Silva"
 * />
 */
export function StatusBadgeWithTooltip({
  status,
  tooltipTitle,
  tooltipContent,
  className,
}: StatusBadgeWithTooltipProps) {
  return (
    <Tooltip
      title={
        <div className="text-xs">
          <div className="font-semibold">{tooltipTitle}</div>
          {tooltipContent && <div className="mt-1">{tooltipContent}</div>}
        </div>
      }
    >
      <div className="inline-block">
        <StatusBadge status={status} className={className} />
      </div>
    </Tooltip>
  );
}
