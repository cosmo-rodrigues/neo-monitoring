import { type Locale as DateFnsLocale } from "date-fns";
import type { Locale as AntLocale } from "antd/es/locale";
import ptBR from "@/i18n/locales/pt-BR.json";

export type SupportedLocale = "pt-BR" | "en-US" | "es-ES";

export type NestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType & string]:
    ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & string];

export type TranslationKeys = NestedKeyOf<typeof ptBR>;

// Tipos para keys dinâmicas (template literals)
export type DynamicTranslationKey = 
    | `common.area.${string}`
    | `common.status.${string}`
    | `common.priority.${string}`;

// Union type que aceita chaves estáticas e dinâmicas
export type TranslationKey = TranslationKeys | DynamicTranslationKey;

export interface I18nContextValue {
    locale: SupportedLocale;
    setLocale: (locale: SupportedLocale) => void;
    t: (key: TranslationKey, params?: Record<string, string | number>) => string;
    dateFnsLocale: DateFnsLocale;
    antLocale: AntLocale;
    htmlLang: string;
}
