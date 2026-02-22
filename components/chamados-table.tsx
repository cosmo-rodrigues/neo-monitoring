"use client";

import { Table, Result, Button, Empty } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { format } from "date-fns";
import { useTranslation } from "@/i18n/context";
import { StatusBadge } from "./status-badge";
import { PriorityTag } from "./priority-tag";
import type { Chamado, PaginatedParams } from "@/types/chamado";

interface ChamadosTableProps {
  data: Chamado[];
  total: number;
  loading: boolean;
  isError: boolean;
  params: PaginatedParams;
  onParamsChange: (params: Partial<PaginatedParams>) => void;
  onRowClick: (chamado: Chamado) => void;
  onRetry: () => void;
}

export function ChamadosTable({
  data,
  total,
  loading,
  isError,
  params,
  onParamsChange,
  onRowClick,
  onRetry,
}: ChamadosTableProps) {
  const { t, dateFnsLocale } = useTranslation();

  if (isError) {
    return (
      <Result
        status="error"
        title={t("table.errorTitle")}
        subTitle={t("table.errorSubtitle")}
        extra={
          <Button type="primary" icon={<ReloadOutlined />} onClick={onRetry}>
            {t("table.retry")}
          </Button>
        }
      />
    );
  }

  const dateFormatStr = t("dateFormat");

  const columns: TableProps<Chamado>["columns"] = [
    {
      title: t("table.id"),
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (id: number) => <span className="font-mono text-xs">#{id}</span>,
    },
    {
      title: t("table.title"),
      dataIndex: "titulo",
      key: "titulo",
      ellipsis: true,
      width: 280,
    },
    {
      title: t("table.area"),
      dataIndex: "area",
      key: "area",
      width: 140,
      render: (area: Chamado["area"]) => t(`common.area.${area}`),
    },
    {
      title: t("table.priority"),
      dataIndex: "prioridade",
      key: "prioridade",
      width: 110,
      sorter: true,
      sortOrder:
        params.sortField === "prioridade" ? params.sortOrder : undefined,
      render: (prioridade: Chamado["prioridade"]) => (
        <PriorityTag prioridade={prioridade} />
      ),
    },
    {
      title: t("table.status"),
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (status: Chamado["status"]) => <StatusBadge status={status} />,
    },
    {
      title: t("table.location"),
      dataIndex: "instalacao",
      key: "instalacao",
      width: 160,
      ellipsis: true,
      responsive: ["lg"],
    },
    {
      title: t("table.opened"),
      dataIndex: "abertura",
      key: "abertura",
      width: 140,
      sorter: true,
      sortOrder:
        params.sortField === "abertura" ? params.sortOrder : undefined,
      render: (date: string) =>
        format(new Date(date), dateFormatStr, { locale: dateFnsLocale }),
    },
    {
      title: t("table.assignee"),
      dataIndex: "responsavel",
      key: "responsavel",
      width: 140,
      ellipsis: true,
      responsive: ["xl"],
      render: (responsavel: string | null) => (
        <span className={responsavel ? "" : "text-gray-400 italic"}>
          {responsavel ?? t("table.unassigned")}
        </span>
      ),
    },
  ];

  const handleTableChange: TableProps<Chamado>["onChange"] = (
    pagination,
    _filters,
    sorter
  ) => {
    const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;
    const updates: Partial<PaginatedParams> = {};

    if (pagination.current) updates.page = pagination.current;
    if (pagination.pageSize) updates.pageSize = pagination.pageSize;

    if (singleSorter?.field && singleSorter.order) {
      updates.sortField = singleSorter.field as PaginatedParams["sortField"];
      updates.sortOrder = singleSorter.order as PaginatedParams["sortOrder"];
    } else {
      updates.sortField = undefined;
      updates.sortOrder = undefined;
    }

    onParamsChange(updates);
  };

  return (
    <Table<Chamado>
      columns={columns}
      dataSource={data}
      rowKey="id"
      loading={loading}
      onChange={handleTableChange}
      scroll={{ x: 900, y: "calc(100vh - 320px)" }}
      data-testid="chamados-table"
      locale={{
        emptyText: (
          <Empty
            description={t("table.empty")}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ),
      }}
      pagination={{
        current: params.page,
        pageSize: params.pageSize,
        total,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50"],
        showTotal: (totalCount, range) =>
          t("table.paginationTotal", {
            start: range[0],
            end: range[1],
            total: totalCount,
          }),
        position: ["bottomCenter"],
      }}
      onRow={(record) => ({
        onClick: () => onRowClick(record),
        style: { cursor: "pointer" },
      })}
      size="middle"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      className="[&_*]:box-border [&_.ant-table]:flex [&_.ant-table]:flex-col [&_.ant-table-wrapper]:h-full [&_.ant-table-body]:flex-grow"
    />
  );
}
