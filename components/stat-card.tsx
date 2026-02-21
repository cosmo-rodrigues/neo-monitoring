"use client";

import { Card, Statistic, Skeleton } from "antd";
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  prefix?: ReactNode;
  suffix?: string;
  loading?: boolean;
  valueStyle?: React.CSSProperties;
}

export function StatCard({
  title,
  value,
  prefix,
  suffix,
  loading = false,
  valueStyle,
}: StatCardProps) {
  if (loading) {
    return (
      <Card>
        <Skeleton active paragraph={{ rows: 1 }} title={{ width: "60%" }} />
      </Card>
    );
  }

  return (
    <Card>
      <Statistic
        title={title}
        value={value}
        prefix={prefix}
        suffix={suffix}
        valueStyle={valueStyle}
      />
    </Card>
  );
}
