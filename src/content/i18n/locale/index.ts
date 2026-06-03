export type LocaleType = (typeof SUPPORTED_LOCALES)[keyof typeof SUPPORTED_LOCALES];

export const SUPPORTED_LOCALES = {
  EN: "en",
  FR: "fr"
} as const;

//export const DEFAULT_LOCALE = SUPPORTED_LOCALES.EN;

