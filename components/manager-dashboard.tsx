"use client";

import { Row, Col, Card, Typography } from "antd";
import { useTranslation } from "@/i18n/context";

const { Title } = Typography;

const AREA_COLOR = "#ec6725";

export function ManagerDashboard() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6">
      <h1>{t("views.gestor")}</h1>
    </div>
  );
}
