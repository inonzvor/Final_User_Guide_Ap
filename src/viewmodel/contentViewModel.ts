import {
  apModels,
  faqItems,
  footer,
  glossaryIntro,
  glossaryTerms,
  helpIntro,
  hero,
  install,
  modelsIntro,
  nav,
  overview,
  power,
  setupChecklist,
  setupIntro,
  setupPhases,
} from '../model/content';
import type { Lang, StepDetailVariant } from '../model/types';
import { translate, translateAll } from './i18nViewModel';

/**
 * Bridges model/content.ts (translation-key structure) with a chosen
 * language, producing plain, fully-resolved strings a view can render
 * directly — no key lookups needed on the UI side.
 */

export interface LocalizedNav {
  brand: string;
  topbarTitle: string;
  menuBtn: string;
  ariaLabel: string;
  themeDark: string;
  themeLight: string;
  groupGuide: string;
  groupReference: string;
  overview: string;
  power: string;
  setup: string;
  models: string;
  glossary: string;
  help: string;
}

export function getLocalizedNav(lang: Lang): LocalizedNav {
  return {
    brand: translate(lang, nav.brand) ?? '',
    topbarTitle: translate(lang, nav.topbarTitle) ?? '',
    menuBtn: translate(lang, nav.menuBtn) ?? '',
    ariaLabel: translate(lang, nav.ariaLabel) ?? '',
    themeDark: translate(lang, nav.themeDark) ?? '',
    themeLight: translate(lang, nav.themeLight) ?? '',
    groupGuide: translate(lang, nav.groupGuide) ?? '',
    groupReference: translate(lang, nav.groupReference) ?? '',
    overview: translate(lang, nav.overview) ?? '',
    power: translate(lang, nav.power) ?? '',
    setup: translate(lang, nav.setup) ?? '',
    models: translate(lang, nav.models) ?? '',
    glossary: translate(lang, nav.glossary) ?? '',
    help: translate(lang, nav.help) ?? '',
  };
}

export interface LocalizedHero {
  eyebrow: string;
  h1: string;
  sub: string;
  badges: string[];
  meta: string[];
}

export function getLocalizedHero(lang: Lang): LocalizedHero {
  return {
    eyebrow: translate(lang, hero.eyebrow) ?? '',
    h1: translate(lang, hero.h1) ?? '',
    sub: translate(lang, hero.sub) ?? '',
    badges: translateAll(lang, [...hero.badgeKeys]),
    meta: translateAll(lang, [...hero.metaKeys]),
  };
}

export interface LocalizedOverview {
  eyebrow: string;
  h2: string;
  intro: string;
  p1: string;
  calloutP: string;
  p2: string;
  diagram: Record<keyof typeof overview.diagram, string>;
}

export function getLocalizedOverview(lang: Lang): LocalizedOverview {
  const diagram = Object.fromEntries(
    Object.entries(overview.diagram).map(([field, key]) => [field, translate(lang, key) ?? '']),
  ) as Record<keyof typeof overview.diagram, string>;

  return {
    eyebrow: translate(lang, overview.eyebrow) ?? '',
    h2: translate(lang, overview.h2) ?? '',
    intro: translate(lang, overview.intro) ?? '',
    p1: translate(lang, overview.p1) ?? '',
    calloutP: translate(lang, overview.calloutP) ?? '',
    p2: translate(lang, overview.p2) ?? '',
    diagram,
  };
}

export interface LocalizedPowerMethod {
  title: string;
  kicker: string;
  p1: string;
  p2: string;
  tip: string;
}

export interface LocalizedPower {
  eyebrow: string;
  h2: string;
  intro: string;
  warnCallout: string;
  poe: LocalizedPowerMethod;
  adapter: LocalizedPowerMethod;
}

function localizePowerMethod(lang: Lang, method: typeof power.poe): LocalizedPowerMethod {
  return {
    title: translate(lang, method.title) ?? '',
    kicker: translate(lang, method.kicker) ?? '',
    p1: translate(lang, method.p1) ?? '',
    p2: translate(lang, method.p2) ?? '',
    tip: translate(lang, method.tip) ?? '',
  };
}

export function getLocalizedPower(lang: Lang): LocalizedPower {
  return {
    eyebrow: translate(lang, power.eyebrow) ?? '',
    h2: translate(lang, power.h2) ?? '',
    intro: translate(lang, power.intro) ?? '',
    warnCallout: translate(lang, power.warnCallout) ?? '',
    poe: localizePowerMethod(lang, power.poe),
    adapter: localizePowerMethod(lang, power.adapter),
  };
}

export interface LocalizedSetupIntro {
  eyebrow: string;
  h2: string;
  intro: string;
}

export function getLocalizedSetupIntro(lang: Lang): LocalizedSetupIntro {
  return {
    eyebrow: translate(lang, setupIntro.eyebrow) ?? '',
    h2: translate(lang, setupIntro.h2) ?? '',
    intro: translate(lang, setupIntro.intro) ?? '',
  };
}

export interface LocalizedChecklist {
  title: string;
  kicker: string;
  items: string[];
}

export function getLocalizedChecklist(lang: Lang): LocalizedChecklist {
  return {
    title: translate(lang, setupChecklist.titleKey) ?? '',
    kicker: translate(lang, setupChecklist.kickerKey) ?? '',
    items: translateAll(lang, setupChecklist.itemKeys),
  };
}

export interface LocalizedStep {
  id: string;
  number: number;
  title: string;
  body: string[];
  detail: string | null;
  detailVariant?: StepDetailVariant;
}

export interface LocalizedPhase {
  id: string;
  number: number;
  title: string;
  sub: string;
  steps: LocalizedStep[];
}

export function getLocalizedSetupGuide(lang: Lang): LocalizedPhase[] {
  return setupPhases.map((phase) => ({
    id: phase.id,
    number: phase.number,
    title: translate(lang, phase.titleKey) ?? '',
    sub: translate(lang, phase.subKey) ?? '',
    steps: phase.steps.map((step) => ({
      id: step.id,
      number: step.number,
      title: translate(lang, step.titleKey) ?? '',
      body: translateAll(lang, step.bodyKeys),
      detail: step.detailKey ? translate(lang, step.detailKey) : null,
      detailVariant: step.detailVariant,
    })),
  }));
}

export interface LocalizedModelSpec {
  wifi: string;
  speed: string;
  power: string;
  ports: string;
  rating: string;
}

export interface LocalizedApModel {
  id: string;
  modelNumber: string;
  tags: string[];
  specs: LocalizedModelSpec | null;
  bestFor: string;
  note: string | null;
  unverified: boolean;
  outdoor: boolean;
}

export interface LocalizedModelsSection {
  eyebrow: string;
  h2: string;
  intro: string;
  note: string;
  models: LocalizedApModel[];
}

export function getLocalizedModels(lang: Lang): LocalizedModelsSection {
  return {
    eyebrow: translate(lang, modelsIntro.eyebrow) ?? '',
    h2: translate(lang, modelsIntro.h2) ?? '',
    intro: translate(lang, modelsIntro.intro) ?? '',
    note: translate(lang, modelsIntro.note) ?? '',
    models: apModels.map((model) => ({
      id: model.id,
      modelNumber: model.modelNumber,
      tags: translateAll(lang, model.tagKeys),
      specs: model.specs
        ? {
            wifi: translate(lang, model.specs.wifiKey) ?? '',
            speed: translate(lang, model.specs.speedKey) ?? '',
            power: translate(lang, model.specs.powerKey) ?? '',
            ports: translate(lang, model.specs.portsKey) ?? '',
            rating: translate(lang, model.specs.ratingKey) ?? '',
          }
        : null,
      bestFor: translate(lang, model.bestForKey) ?? '',
      note: model.noteKey ? translate(lang, model.noteKey) : null,
      unverified: model.unverified,
      outdoor: model.outdoor ?? false,
    })),
  };
}

export interface LocalizedGlossaryTerm {
  id: string;
  term: string;
  def: string;
}

export interface LocalizedGlossarySection {
  eyebrow: string;
  h2: string;
  intro: string;
  terms: LocalizedGlossaryTerm[];
}

export function getLocalizedGlossary(lang: Lang): LocalizedGlossarySection {
  return {
    eyebrow: translate(lang, glossaryIntro.eyebrow) ?? '',
    h2: translate(lang, glossaryIntro.h2) ?? '',
    intro: translate(lang, glossaryIntro.intro) ?? '',
    terms: glossaryTerms.map((term) => ({
      id: term.id,
      term: translate(lang, term.termKey) ?? '',
      def: translate(lang, term.defKey) ?? '',
    })),
  };
}

export interface LocalizedFaqItem {
  id: string;
  title: string;
  body: string[];
}

export interface LocalizedFaqSection {
  eyebrow: string;
  h2: string;
  intro: string;
  items: LocalizedFaqItem[];
}

export function getLocalizedFaq(lang: Lang): LocalizedFaqSection {
  return {
    eyebrow: translate(lang, helpIntro.eyebrow) ?? '',
    h2: translate(lang, helpIntro.h2) ?? '',
    intro: translate(lang, helpIntro.intro) ?? '',
    items: faqItems.map((item) => ({
      id: item.id,
      title: translate(lang, item.titleKey) ?? '',
      body: translateAll(lang, item.bodyKeys),
    })),
  };
}

export interface LocalizedFooter {
  safety: string;
  contact: string;
}

export function getLocalizedFooter(lang: Lang): LocalizedFooter {
  return {
    safety: translate(lang, footer.safety) ?? '',
    contact: translate(lang, footer.contact) ?? '',
  };
}

export interface LocalizedInstallCopy {
  title: string;
  subtitle: string;
  iosNote: string;
  fallbackNote: string;
  button: string;
  dismissLabel: string;
}

export function getLocalizedInstallCopy(lang: Lang): LocalizedInstallCopy {
  return {
    title: translate(lang, install.title) ?? '',
    subtitle: translate(lang, install.subtitle) ?? '',
    iosNote: translate(lang, install.iosNote) ?? '',
    fallbackNote: translate(lang, install.fallbackNote) ?? '',
    button: translate(lang, install.button) ?? '',
    dismissLabel: translate(lang, install.dismissLabel) ?? '',
  };
}
