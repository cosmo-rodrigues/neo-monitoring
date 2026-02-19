"use client";

import type { ReactNode } from "react";
import { ConfigProvider, App } from "antd";
import ptBR from "antd/locale/pt_BR";
import theme from "@/components/theme/theme-config";

export function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider theme={theme} locale={ptBR}>
      <App>{children}</App>
    </ConfigProvider>
  );
}
