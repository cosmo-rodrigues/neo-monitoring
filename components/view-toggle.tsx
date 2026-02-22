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
            <span className="flex items-center gap-2 px-3 py-1">
              <ToolOutlined />
              <span className="font-medium">{t("views.technician")}</span>
            </span>
          ),
          value: "technical",
        },
        {
          label: (
            <span className="flex items-center gap-2 px-3 py-1">
              <DashboardOutlined />
              <span className="font-medium">{t("views.manager")}</span>
            </span>
          ),
          value: "manager",
        },
      ]}
      size="large"
      block
      className="[&_.ant-segmented-item-selected]:!bg-orange-600 [&_.ant-segmented-item-selected]:text-white [&_.ant-segmented-item]:text-gray-700 [&_.ant-segmented-item-selected]:!text-white shadow-sm [&_.ant-segmented-item-selected]:!transition-all [&_.ant-segmented-item-selected]:!duration-300 [&_.ant-segmented-item-selected]:!ease-in-out"
      style={{
        backgroundColor: "#f5f5f5",
        padding: "4px",
      }}
    />
  );
}
