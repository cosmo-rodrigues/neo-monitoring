"use client";

import { useEffect, useState } from 'react';
import { Layout, Typography } from "antd";

import { LanguageSwitcher } from '@/components/language-switcher';
import { useTranslation } from '@/i18n/context';
import { ViewMode, ViewToggle } from '@/components/view-toggle';
import { Content } from 'antd/es/layout/layout';
import { TechnicianView } from '@/components/technician-view';
import { ManagerDashboard } from '@/components/manager-dashboard';

const { Header } = Layout;
const { Title } = Typography;

const Home = () => {
  const { t, htmlLang } = useTranslation();
  const [viewMode, setViewMode] = useState<ViewMode>("tecnico");

  useEffect(() => {
    document.documentElement.lang = htmlLang;
  }, [htmlLang]);

  return (

    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Header
        style={{
          background: "#fff",
          borderBottom: "1px solid #f0f0f0",
          padding: "0 24px",
          height: "auto",
          lineHeight: "normal",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "#ec6725",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              NEO
            </div>
            <div>
              <Title level={4} style={{ margin: 0, lineHeight: 1.3 }}>
                {t("header.title")}
              </Title>
              <span className="text-xs" style={{ color: "#8c8c8c" }}>
                {t("header.subtitle")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ViewToggle value={viewMode} onChange={setViewMode} />
            <LanguageSwitcher />
          </div>
        </div>
      </Header>
      <Content style={{ padding: "24px", maxWidth: 1400, width: "100%", margin: "0 auto" }}>
        {viewMode === "tecnico" ? <TechnicianView /> : <ManagerDashboard />}
      </Content>
    </Layout>
  )
};

export default Home;