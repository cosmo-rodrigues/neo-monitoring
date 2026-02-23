"use client";

import '@ant-design/v5-patch-for-react-19';
import { useEffect, useState } from 'react';
import { Layout, Typography } from "antd";
import theme from '@/components/theme/theme-config';
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
  const [viewMode, setViewMode] = useState<ViewMode>("technical");

  useEffect(() => {
    document.documentElement.lang = htmlLang;
  }, [htmlLang]);

  const PRIMARY_COLOR = theme.token?.colorPrimary || "#ec6725";

  return (
    <Layout className='h-full w-full'>
      <div className='h-fit w-full bg-[#ec6725]'>
        <Header
          className='w-full mx-auto'
          style={{
            background: PRIMARY_COLOR,
            borderBottom: `1px solid ${PRIMARY_COLOR}`,
            padding: "0 24px",
            height: "auto",
            lineHeight: "normal",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 py-4 w-full mx-auto max-w-350">
            <div className="hidden sm:flex items-center md:gap-3">
              <div
                className='hidden sm:flex self-center font-bold text-2xl text-[#ec6725] bg-white dark:bg-white rounded px-2 py-1'
              >
                NEO
              </div>
              <div className='hidden md:flex flex-col items-start justify-center'>
                <Title level={4} style={{ margin: 0, lineHeight: 1.3, color: "#fff" }}>
                  {t("header.title")}
                </Title>
                <span className="text-xs hidden lg:inline-block" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  {t("header.subtitle")}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <ViewToggle value={viewMode} onChange={setViewMode} />
              <div className="hidden md:flex">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </Header>
      </div>
      <Content
        className='px-6 xl:px-0 py-5 mx-auto max-w-350'
        style={{
          maxWidth: 1400,
          width: "100%",
          margin: "0 auto",
          marginTop: "100px",
          height: "calc(100vh - 100px)",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {viewMode === "technical" ? <TechnicianView /> : <ManagerDashboard />}
      </Content>
    </Layout>
  )
};

export default Home;