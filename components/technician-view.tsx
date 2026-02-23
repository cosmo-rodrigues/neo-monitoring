"use client";

import { useState, useCallback } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "@/i18n/context";
import { ChamadosFilters } from "./chamados-filters";
import { ChamadosTable } from "./chamados-table";
import { ChamadoDrawer } from "./chamado-drawer";
import { ChamadoFormModal } from "./chamado-form-modal";
import { useChamadosList } from "@/hooks/use-chamados";
import type { PaginatedParams, Status, Prioridade, Area, Chamado } from "@/types/chamado";

export function TechnicianView() {
  const { t } = useTranslation();
  const [params, setParams] = useState<PaginatedParams>({
    page: 1,
    pageSize: 10,
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useChamadosList(params);

  const updateParams = useCallback((updates: Partial<PaginatedParams>) => {
    setParams((prev) => ({
      ...prev,
      ...updates,
      page: updates.page ?? 1,
    }));
  }, []);

  const handleRowClick = useCallback((chamado: Chamado) => {
    setSelectedId(chamado.id);
    setDrawerOpen(true);
  }, []);

  const handleClearFilters = useCallback(() => {
    setParams({
      page: 1,
      pageSize: params.pageSize,
    });
  }, [params.pageSize]);

  return (
    <div className="flex flex-col gap-4 h-full justify-between w-full">
      <div className="flex flex-col items-center justify-between gap-3 shrink-0 w-full">
        <ChamadosFilters
          status={params.status}
          prioridade={params.prioridade}
          area={params.area}
          search={params.search}
          onStatusChange={(value: Status | undefined) =>
            updateParams({ status: value })
          }
          onPrioridadeChange={(value: Prioridade | undefined) =>
            updateParams({ prioridade: value })
          }
          onAreaChange={(value: Area | undefined) =>
            updateParams({ area: value })
          }
          onSearchChange={(value: string) =>
            updateParams({ search: value || undefined })
          }
          onClear={handleClearFilters}
        />
        <Button
          type="default"
          icon={<PlusOutlined />}
          onClick={() => setFormOpen(true)}
          size="large"
          data-testid="btn-novo-chamado"
          className="w-full md:w-fit self-start"
        >
          {t("newTicket")}
        </Button>
      </div>

      <div className="flex flex-col h-full min-h-[75vh] w-full">
        <ChamadosTable
          data={data?.data ?? []}
          total={data?.total ?? 0}
          loading={isLoading}
          isError={isError}
          params={params}
          onParamsChange={(updates) =>
            setParams((prev) => ({ ...prev, ...updates }))
          }
          onRowClick={handleRowClick}
          onRetry={() => refetch()}
        />
      </div>

      <ChamadoDrawer
        chamadoId={selectedId}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedId(null);
        }}
      />

      <ChamadoFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
      />
    </div>
  );
}
