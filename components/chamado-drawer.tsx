"use client";

import { Drawer, Descriptions, Timeline, Skeleton, Typography, Divider, Space } from "antd";
import {
  ClockCircleOutlined,
  UserOutlined,
  CheckCircleOutlined,
  MessageOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";
import { StatusBadge } from "./status-badge";
import { PriorityTag } from "./priority-tag";
import { TimelineEvent } from "@/types/chamado";
import { useTranslation } from "@/i18n/context";
import { useChamadoDetail } from "@/hooks/use-chamados";

const { Text } = Typography;

interface ChamadoDrawerProps {
  chamadoId: number | null;
  open: boolean;
  onClose: () => void;
}

const TIMELINE_ICONS: Record<TimelineEvent["tipo"], React.ReactNode> = {
  criacao: <PlusCircleOutlined />,
  atualizacao_status: <CheckCircleOutlined />,
  comentario: <MessageOutlined />,
  atribuicao: <UserOutlined />,
};

const TIMELINE_COLORS: Record<TimelineEvent["tipo"], string> = {
  criacao: "green",
  atualizacao_status: "blue",
  comentario: "gray",
  atribuicao: "orange",
};

export function ChamadoDrawer({ chamadoId, open, onClose }: ChamadoDrawerProps) {
  const { data: chamado, isLoading } = useChamadoDetail(chamadoId);
  const { t, dateFnsLocale } = useTranslation();

  const dateAtFormat = t("dateFormatAt");

  return (
    <Drawer
      title={
        chamado ? (
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-gray-500">#{chamado.id}</span>
            <span className="truncate">{chamado.titulo}</span>
          </div>
        ) : (
          t("drawer.title")
        )
      }
      open={open}
      onClose={onClose}
      width={560}
      styles={{ body: { paddingTop: 16 } }}
    >
      {isLoading && (
        <Skeleton active paragraph={{ rows: 8 }} />
      )}

      {chamado && (
        <>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label={t("drawer.status")}>
              <StatusBadge status={chamado.status} />
            </Descriptions.Item>
            <Descriptions.Item label={t("drawer.priority")}>
              <PriorityTag prioridade={chamado.prioridade} />
            </Descriptions.Item>
            <Descriptions.Item label={t("drawer.area")}>
              {t(`common.area.${chamado.area}`)}
            </Descriptions.Item>
            <Descriptions.Item label={t("drawer.equipment")}>
              {chamado.equipamento}
            </Descriptions.Item>
            <Descriptions.Item label={t("drawer.location")}>
              {chamado.instalacao}
            </Descriptions.Item>
            <Descriptions.Item label={t("drawer.assignee")}>
              {chamado.responsavel ? (
                <Space>
                  <UserOutlined />
                  {chamado.responsavel}
                </Space>
              ) : (
                <Text type="secondary" italic>
                  {t("drawer.unassigned")}
                </Text>
              )}
            </Descriptions.Item>
            <Descriptions.Item label={t("drawer.opened")}>
              <Space>
                <ClockCircleOutlined />
                {format(new Date(chamado.abertura), dateAtFormat, {
                  locale: dateFnsLocale,
                })}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label={t("drawer.lastUpdated")}>
              {format(
                new Date(chamado.ultimaAtualizacao),
                dateAtFormat,
                { locale: dateFnsLocale }
              )}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left" orientationMargin={0}>
            <Text strong>{t("drawer.description")}</Text>
          </Divider>
          <Text>{chamado.descricao}</Text>

          {chamado.timeline && chamado.timeline.length > 0 && (
            <>
              <Divider orientation="left" orientationMargin={0}>
                <Text strong>{t("drawer.timeline")}</Text>
              </Divider>
              <Timeline
                items={chamado.timeline.map((event) => ({
                  dot: TIMELINE_ICONS[event.tipo],
                  color: TIMELINE_COLORS[event.tipo],
                  children: (
                    <div>
                      <Text strong className="text-sm">
                        {event.descricao}
                      </Text>
                      <br />
                      <Text type="secondary" className="text-xs">
                        {format(
                          new Date(event.data),
                          dateAtFormat,
                          { locale: dateFnsLocale }
                        )}{" "}
                        {event.autor && `- ${event.autor}`}
                      </Text>
                    </div>
                  ),
                }))}
              />
            </>
          )}
        </>
      )}
    </Drawer>
  );
}
