import type { Dictionary, Direction, Lang, TranslationKey } from '../model/types';
import en from '../model/i18n/en.json';
import ru from '../model/i18n/ru.json';
import he from '../model/i18n/he.json';

export const SUPPORTED_LANGUAGES: Lang[] = ['en', 'ru', 'he'];
export const DEFAULT_LANGUAGE: Lang = 'en';

const DICTIONARIES: Record<Lang, Dictionary> = {
  en: en as Dictionary,
  ru: ru as Dictionary,
  he: he as Dictionary,
};

/**
 * Resolve one translation key for a language, falling back to English, then
 * to `null` if the key exists nowhere. Mirrors the original app's `T()`.
 */
export function translate(lang: Lang, key: TranslationKey): string | null {
  const dict = DICTIONARIES[lang] ?? DICTIONARIES[DEFAULT_LANGUAGE];
  if (key in dict) return dict[key];
  if (key in DICTIONARIES[DEFAULT_LANGUAGE]) return DICTIONARIES[DEFAULT_LANGUAGE][key];
  return null;
}

/** Resolve several keys at once, preserving order. */
export function translateAll(lang: Lang, keys: TranslationKey[]): string[] {
  return keys.map((key) => translate(lang, key) ?? '');
}

export function getDirection(lang: Lang): Direction {
  return lang === 'he' ? 'rtl' : 'ltr';
}

export function isSupportedLanguage(value: string): value is Lang {
  return (SUPPORTED_LANGUAGES as string[]).includes(value);
}
