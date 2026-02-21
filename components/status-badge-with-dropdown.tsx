"use client";

import { Dropdown, Space } from "antd";
import { ChevronDown } from "lucide-react";
import { StatusBadge } from "./status-badge";
import type { Status } from "@/types/chamado";
import type { MenuProps } from "antd";

interface StatusBadgeWithDropdownProps {
  status: Status;
  actions: MenuProps["items"];
  className?: string;
  placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
}

/**
 * StatusBadge wrapped with Dropdown menu capability.
 * Demonstrates composition pattern for adding interactive features.
 *
 * @example
 * <StatusBadgeWithDropdown
 *   status="Em andamento"
 *   actions={[
 *     { key: "update", label: "Atualizar" },
 *     { key: "resolve", label: "Resolver", danger: true }
 *   ]}
 * />
 */
export function StatusBadgeWithDropdown({
  status,
  actions,
  className,
  placement = "bottomLeft",
}: StatusBadgeWithDropdownProps) {
  return (
    <Dropdown menu={{ items: actions }} placement={placement} trigger={["click"]}>
      <div className="inline-block cursor-pointer hover:opacity-80 transition-opacity">
        <Space size={2} className="inline-flex items-center">
          <StatusBadge status={status} className={className} />
          <ChevronDown size={14} />
        </Space>
      </div>
    </Dropdown>
  );
}
