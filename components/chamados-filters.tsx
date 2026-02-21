"use client";

import { Select, Input, Button } from "antd";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { useTranslation } from "@/i18n/context";
import {
  STATUS_OPTIONS,
  PRIORIDADE_OPTIONS,
  AREA_OPTIONS,
  type Status,
  type Prioridade,
  type Area,
} from "@/types/chamado";

interface ChamadosFiltersProps {
  status?: Status;
  prioridade?: Prioridade;
  area?: Area;
  search?: string;
  onStatusChange: (value: Status | undefined) => void;
  onPrioridadeChange: (value: Prioridade | undefined) => void;
  onAreaChange: (value: Area | undefined) => void;
  onSearchChange: (value: string) => void;
  onClear: () => void;
}

export function ChamadosFilters({
  status,
  prioridade,
  area,
  search,
  onStatusChange,
  onPrioridadeChange,
  onAreaChange,
  onSearchChange,
  onClear,
}: ChamadosFiltersProps) {
  const { t } = useTranslation();
  const hasFilters = status || prioridade || area || search;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Input.Search
        placeholder={t("filters.searchPlaceholder")}
        prefix={<SearchOutlined />}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        allowClear
        style={{ width: 260 }}
        data-testid="input-search"
      />
      <Select
        placeholder={t("filters.statusPlaceholder")}
        value={status}
        onChange={onStatusChange}
        allowClear
        style={{ width: 160 }}
        data-testid="select-status-filter"
        options={STATUS_OPTIONS.map((s) => ({
          label: t(`common.status.${s}`),
          value: s,
        }))}
      />
      <Select
        placeholder={t("filters.priorityPlaceholder")}
        value={prioridade}
        onChange={onPrioridadeChange}
        allowClear
        style={{ width: 140 }}
        data-testid="select-priority-filter"
        options={PRIORIDADE_OPTIONS.map((p) => ({
          label: t(`common.priority.${p}`),
          value: p,
        }))}
      />
      <Select
        placeholder={t("filters.areaPlaceholder")}
        value={area}
        onChange={onAreaChange}
        allowClear
        style={{ width: 170 }}
        data-testid="select-area-filter"
        options={AREA_OPTIONS.map((a) => ({
          label: t(`common.area.${a}`),
          value: a,
        }))}
      />
      {hasFilters && (
        <Button icon={<ClearOutlined />} onClick={onClear} data-testid="btn-clear-filters">
          {t("filters.clear")}
        </Button>
      )}
    </div>
  );
}
