"use client";

import { Row, Col, Result, Button, Skeleton, Card, Typography } from "antd";
import {
  AlertOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  FieldTimeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { useTranslation } from "@/i18n/context";
import { StatCard } from "./stat-card";
import { useChamadosStats } from "@/hooks/use-chamados-stats";

const { Title } = Typography;

const STATUS_COLORS: Record<string, string> = {
  Aberto: "#1677ff",
  "Em andamento": "#fa8c16",
  Resolvido: "#52c41a",
  Cancelado: "#8c8c8c",
};

const AREA_COLOR = "#ec6725";

export function ManagerDashboard() {
  const { data: stats, isLoading, isError, refetch } = useChamadosStats();
  const { t } = useTranslation();

  if (isError) {
    return (
      <Result
        status="error"
        title={t("dashboard.errorTitle")}
        subTitle={t("dashboard.errorSubtitle")}
        extra={
          <Button type="primary" icon={<ReloadOutlined />} onClick={() => refetch()}>
            {t("dashboard.retry")}
          </Button>
        }
      />
    );
  }

  const translatedAreaData = stats?.porArea.map((item) => ({
    ...item,
    areaLabel: t(`common.area.${item.area}`),
  }));

  const translatedStatusData = stats?.porStatus.map((item) => ({
    ...item,
    statusLabel: t(`common.status.${item.status}`),
  }));

  return (
    <div className="flex flex-col gap-6 px-2 overflow-x-hidden w-full">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title={t("dashboard.totalTickets")}
            value={stats?.total ?? 0}
            prefix={<AlertOutlined />}
            loading={isLoading}
            valueStyle={{ color: "#262626" }}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title={t("dashboard.open")}
            value={stats?.abertos ?? 0}
            prefix={<ClockCircleOutlined />}
            loading={isLoading}
            valueStyle={{ color: "#1677ff" }}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title={t("dashboard.inProgress")}
            value={stats?.emAndamento ?? 0}
            prefix={<FieldTimeOutlined />}
            loading={isLoading}
            valueStyle={{ color: "#fa8c16" }}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title={t("dashboard.averageTime")}
            value={stats?.tempoMedioAbertoDias ?? 0}
            suffix={t("dashboard.daysSuffix")}
            prefix={<CheckCircleOutlined />}
            loading={isLoading}
            valueStyle={{ color: "#52c41a" }}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card>
            <Title level={5} style={{ marginBottom: 24 }}>
              {t("dashboard.ticketsByArea")}
            </Title>
            {isLoading ? (
              <Skeleton active paragraph={{ rows: 6 }} />
            ) : (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={translatedAreaData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="areaLabel"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                  />
                  <YAxis tick={{ fontSize: 12 }} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 6,
                      border: "1px solid #f0f0f0",
                    }}
                  />
                  <Bar
                    dataKey="count"
                    name={t("dashboard.tickets")}
                    fill={AREA_COLOR}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={60}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card>
            <Title level={5} style={{ marginBottom: 24 }}>
              {t("dashboard.ticketsByStatus")}
            </Title>
            {isLoading ? (
              <Skeleton active paragraph={{ rows: 6 }} />
            ) : (
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={translatedStatusData}
                    dataKey="count"
                    nameKey="statusLabel"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    label={({ statusLabel, count }: { statusLabel: string; count: number }) =>
                      `${statusLabel}: ${count}`
                    }
                  >
                    {translatedStatusData?.map((entry) => (
                      <Cell
                        key={entry.status}
                        fill={STATUS_COLORS[entry.status] ?? "#8c8c8c"}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 6,
                      border: "1px solid #f0f0f0",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card>
            <Title level={5} style={{ marginBottom: 24 }}>
              {t("dashboard.ticketsByMonth")}
            </Title>
            {isLoading ? (
              <Skeleton active paragraph={{ rows: 4 }} />
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart
                  data={stats?.porMes}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="mes"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                  />
                  <YAxis tick={{ fontSize: 12 }} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 6,
                      border: "1px solid #f0f0f0",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    name={t("dashboard.tickets")}
                    stroke={AREA_COLOR}
                    strokeWidth={2}
                    dot={{ fill: AREA_COLOR, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
