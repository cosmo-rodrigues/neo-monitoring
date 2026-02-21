import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from '@ant-design/nextjs-registry';

import { AntdProvider } from "@/providers/antd-provider";
import { I18nProvider } from "@/i18n/context";
import { QueryProvider } from "@/providers/query-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "NEO - Chamados",
  description: "Plataforma de monitoramento e gestao operacional - Modulo de Chamados",
};

export const viewport: Viewport = {
  themeColor: "#ec6725",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <I18nProvider>
          <QueryProvider>
            <AntdProvider>
              <AntdRegistry>{children}</AntdRegistry>
            </AntdProvider>
          </QueryProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
