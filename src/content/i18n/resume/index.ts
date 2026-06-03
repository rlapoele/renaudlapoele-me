import type { ResumeType } from './Types.ts';

import { resumeEN } from './en';
import { resumeFR } from './fr';

import type {LocaleType} from "@content/i18n/locale";
import { SUPPORTED_LOCALES } from "@content/i18n/locale";

export function getResumeData(locale: LocaleType): ResumeType {
  return locale === SUPPORTED_LOCALES.EN ? resumeEN : resumeFR;
}
