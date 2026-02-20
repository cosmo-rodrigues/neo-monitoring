"use client";

import { Select } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { LOCALE_LABELS, useTranslation } from "@/i18n/context";
import { SupportedLocale } from "@/types/i18n-types";

const LOCALE_OPTIONS = (Object.keys(LOCALE_LABELS) as SupportedLocale[]).map(
  (key) => ({
    label: LOCALE_LABELS[key],
    value: key,
  })
);

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  return (
    <Select
      value={locale}
      onChange={(value: SupportedLocale) => setLocale(value)}
      options={LOCALE_OPTIONS}
      suffixIcon={<GlobalOutlined />}
      variant="borderless"
      style={{ minWidth: 160 }}
      popupMatchSelectWidth={false}
    />
  );
}
