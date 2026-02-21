"use client";

import { Segmented } from "antd";
import { ToolOutlined, DashboardOutlined } from "@ant-design/icons";
import { useTranslation } from "@/i18n/context";

export type ViewMode = "technical" | "manager";

interface ViewToggleProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  const { t } = useTranslation();

  return (
    <Segmented
      value={value}
      onChange={(val) => onChange(val as ViewMode)}
      options={[
        {
          label: (
            <span className="flex items-center gap-2 px-1">
              <ToolOutlined />
              <span>{t("views.technician")}</span>
            </span>
          ),
          value: "technical",
        },
        {
          label: (
            <span className="flex items-center gap-2 px-1">
              <DashboardOutlined />
              <span>{t("views.manager")}</span>
            </span>
          ),
          value: "manager",
        },
      ]}
      size="large"
    />
  );
}
