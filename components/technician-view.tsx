"use client";

import { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "@/i18n/context";

export function TechnicianView() {
  const { t } = useTranslation();

  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <h1>{t("views.tecnico")}</h1>
    </div>
  );
}
