/** Supported UI languages. Hebrew renders right-to-left. */
export type Lang = 'en' | 'ru' | 'he';

export type Direction = 'ltr' | 'rtl';

/** A key into the translation dictionaries (see model/i18n/*.json). */
export type TranslationKey = string;

/** A flat "key -> localized string" map, one per language. */
export type Dictionary = Record<TranslationKey, string>;

export type StepDetailVariant = 'note' | 'caution';

export interface SetupStep {
  id: string;
  /** 1-based position within the full 19-step walkthrough. */
  number: number;
  titleKey: TranslationKey;
  /** One or more paragraph keys, rendered in order. */
  bodyKeys: TranslationKey[];
  detailKey?: TranslationKey;
  /** 'caution' steps are safety/damage-risk callouts; 'note' is a plain aside. */
  detailVariant?: StepDetailVariant;
}

export interface SetupPhase {
  id: string;
  /** 1-based position within the 5 phases. */
  number: number;
  titleKey: TranslationKey;
  subKey: TranslationKey;
  steps: SetupStep[];
}

export interface SetupChecklist {
  titleKey: TranslationKey;
  kickerKey: TranslationKey;
  itemKeys: TranslationKey[];
}

export interface ModelSpec {
  wifiKey: TranslationKey;
  speedKey: TranslationKey;
  powerKey: TranslationKey;
  portsKey: TranslationKey;
  ratingKey: TranslationKey;
}

export interface ApModel {
  id: string;
  /** Device model number, e.g. "DS-3WAP621E-SI" — not localized. */
  modelNumber: string;
  tagKeys: TranslationKey[];
  /** Absent for models whose specs could not be confirmed. */
  specs?: ModelSpec;
  bestForKey: TranslationKey;
  /** Present only for unverified models (explains the missing specs). */
  noteKey?: TranslationKey;
  /** True for the two models Hikvision datasheets couldn't confirm. */
  unverified: boolean;
  /** True for outdoor/weatherproof-rated hardware (styling + content hint). */
  outdoor?: boolean;
}

export interface GlossaryTerm {
  id: string;
  termKey: TranslationKey;
  defKey: TranslationKey;
}

export interface FaqItem {
  id: string;
  titleKey: TranslationKey;
  bodyKeys: TranslationKey[];
}
