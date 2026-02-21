"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
  useEffect,
} from "react";
import { type Locale as DateFnsLocale } from "date-fns";
import { ptBR as dateFnsPtBR } from "date-fns/locale";
import { enUS as dateFnsEnUS } from "date-fns/locale";
import { es as dateFnsEs } from "date-fns/locale";

import antPtBR from "antd/locale/pt_BR";
import antEnUS from "antd/locale/en_US";
import antEsES from "antd/locale/es_ES";
import type { Locale as AntLocale } from "antd/es/locale";

import ptBR from "./locales/pt-BR.json";
import enUS from "./locales/en-US.json";
import esES from "./locales/es-ES.json";

import { getNestedValue, interpolate } from "@/helpers/get-nested-value";
import { I18nContextValue, SupportedLocale, TranslationKey } from "@/types/i18n-types";

type TranslationMap = typeof ptBR;

const TRANSLATIONS: Record<SupportedLocale, TranslationMap> = {
  "pt-BR": ptBR,
  "en-US": enUS,
  "es-ES": esES,
};

const DATE_FNS_LOCALES: Record<SupportedLocale, DateFnsLocale> = {
  "pt-BR": dateFnsPtBR,
  "en-US": dateFnsEnUS,
  "es-ES": dateFnsEs,
};

const ANT_LOCALES: Record<SupportedLocale, AntLocale> = {
  "pt-BR": antPtBR,
  "en-US": antEnUS,
  "es-ES": antEsES,
};

const HTML_LANGS: Record<SupportedLocale, string> = {
  "pt-BR": "pt-BR",
  "en-US": "en",
  "es-ES": "es",
};

export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  "pt-BR": "Portugues (BR)",
  "en-US": "English (US)",
  "es-ES": "Espanol (ES)",
};

const STORAGE_KEY = "@neo/app-locale";

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>("pt-BR");

  function detectBrowserLocale(): SupportedLocale {
    const browserLang = navigator.language;

    if (browserLang.startsWith("pt")) return "pt-BR";
    if (browserLang.startsWith("es")) return "es-ES";
    return "en-US";
  }


  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(STORAGE_KEY) as SupportedLocale | null;

    if (stored && TRANSLATIONS[stored]) {
      setLocaleState(stored);
    } else {
      const browserLocale = detectBrowserLocale();
      setLocaleState(browserLocale);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = HTML_LANGS[locale];
    }
  }, [locale]);

  const setLocale = useCallback((newLocale: SupportedLocale) => {
    localStorage.setItem(STORAGE_KEY, newLocale);
    setLocaleState(newLocale);
  }, []);

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>): string => {
      const value =
        getNestedValue(TRANSLATIONS[locale] as unknown as Record<string, unknown>, key) ??
        getNestedValue(TRANSLATIONS["pt-BR"] as unknown as Record<string, unknown>, key) ??
        key;
      return params ? interpolate(value, params) : value;
    },
    [locale]
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t,
      dateFnsLocale: DATE_FNS_LOCALES[locale],
      antLocale: ANT_LOCALES[locale],
      htmlLang: HTML_LANGS[locale],
    }),
    [locale, setLocale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}
