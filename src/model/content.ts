import type {
  ApModel,
  FaqItem,
  GlossaryTerm,
  SetupChecklist,
  SetupPhase,
} from './types';

/**
 * Structural content model for the guide.
 *
 * Every user-facing string is referenced by translation key, not inlined —
 * look values up per language via viewmodel/i18nViewModel.ts (or use the
 * ready-resolved getters in viewmodel/contentViewModel.ts). This file only
 * encodes *structure*: page chrome key names, and the order/grouping/shape
 * of the setup walkthrough, model reference sheets, glossary and FAQ.
 *
 * Field names map 1:1 to keys in src/model/i18n/{en,ru,he}.json.
 */

export const nav = {
  brand: 'nav.brand',
  topbarTitle: 'nav.topbarTitle',
  menuBtn: 'nav.menuBtn',
  ariaLabel: 'nav.ariaLabel',
  themeDark: 'nav.themeDark',
  themeLight: 'nav.themeLight',
  groupGuide: 'nav.groupGuide',
  groupReference: 'nav.groupReference',
  overview: 'nav.overview',
  power: 'nav.power',
  setup: 'nav.setup',
  models: 'nav.models',
  glossary: 'nav.glossary',
  help: 'nav.help',
} as const;

export const hero = {
  eyebrow: 'hero.eyebrow',
  h1: 'hero.h1',
  sub: 'hero.sub',
  badgeKeys: ['hero.badge1', 'hero.badge2', 'hero.badge3'],
  metaKeys: ['hero.meta1', 'hero.meta2', 'hero.meta3'],
} as const;

export const overview = {
  eyebrow: 'overview.eyebrow',
  h2: 'overview.h2',
  intro: 'overview.intro',
  p1: 'overview.p1',
  calloutP: 'overview.calloutP',
  p2: 'overview.p2',
  diagram: {
    ariaLabel: 'overview.diagram.ariaLabel',
    internet: 'overview.diagram.internet',
    router: 'overview.diagram.router',
    cable: 'overview.diagram.cable',
    ap: 'overview.diagram.ap',
    thisDevice: 'overview.diagram.thisDevice',
    phone: 'overview.diagram.phone',
    tablet: 'overview.diagram.tablet',
    laptop: 'overview.diagram.laptop',
    caption: 'overview.diagram.caption',
  },
} as const;

export const power = {
  eyebrow: 'power.eyebrow',
  h2: 'power.h2',
  intro: 'power.intro',
  warnCallout: 'power.warnCallout',
  poe: {
    title: 'power.poe.title',
    kicker: 'power.poe.kicker',
    p1: 'power.poe.p1',
    p2: 'power.poe.p2',
    tip: 'power.poe.tip',
  },
  adapter: {
    title: 'power.adapter.title',
    kicker: 'power.adapter.kicker',
    p1: 'power.adapter.p1',
    p2: 'power.adapter.p2',
    tip: 'power.adapter.tip',
  },
} as const;

export const setupIntro = {
  eyebrow: 'setup.eyebrow',
  h2: 'setup.h2',
  intro: 'setup.intro',
} as const;

export const setupChecklist: SetupChecklist = {
  titleKey: 'setup.checklist.title',
  kickerKey: 'setup.checklist.kicker',
  itemKeys: [
    'setup.checklist.item1',
    'setup.checklist.item2',
    'setup.checklist.item3',
    'setup.checklist.item4',
    'setup.checklist.item5',
  ],
};

/**
 * The 5-phase, 19-step walkthrough, in display order. Verified against the
 * `.phase` / `.step` markup in the original MANUAL/index.html: phase
 * boundaries are 1-3, 4-7, 8-9, 10-15, 16-19. `detailVariant: 'caution'`
 * matches steps whose detail box carried the `.step-detail.caution` class
 * (a safety/damage-risk callout); plain asides are 'note'.
 */
export const setupPhases: SetupPhase[] = [
  {
    id: 'phase1',
    number: 1,
    titleKey: 'setup.phase1.title',
    subKey: 'setup.phase1.sub',
    steps: [
      {
        id: 'step1',
        number: 1,
        titleKey: 'setup.step1.title',
        bodyKeys: ['setup.step1.p'],
        detailKey: 'setup.step1.detail',
        detailVariant: 'note',
      },
      {
        id: 'step2',
        number: 2,
        titleKey: 'setup.step2.title',
        bodyKeys: ['setup.step2.p'],
        detailKey: 'setup.step2.detail',
        detailVariant: 'note',
      },
      {
        id: 'step3',
        number: 3,
        titleKey: 'setup.step3.title',
        bodyKeys: ['setup.step3.p'],
      },
    ],
  },
  {
    id: 'phase2',
    number: 2,
    titleKey: 'setup.phase2.title',
    subKey: 'setup.phase2.sub',
    steps: [
      {
        id: 'step4',
        number: 4,
        titleKey: 'setup.step4.title',
        bodyKeys: ['setup.step4.p'],
        detailKey: 'setup.step4.detail',
        detailVariant: 'note',
      },
      {
        id: 'step5',
        number: 5,
        titleKey: 'setup.step5.title',
        bodyKeys: ['setup.step5.p'],
        detailKey: 'setup.step5.detail',
        detailVariant: 'note',
      },
      {
        id: 'step6',
        number: 6,
        titleKey: 'setup.step6.title',
        bodyKeys: ['setup.step6.p'],
        detailKey: 'setup.step6.detail',
        detailVariant: 'caution',
      },
      {
        id: 'step7',
        number: 7,
        titleKey: 'setup.step7.title',
        bodyKeys: ['setup.step7.p'],
        detailKey: 'setup.step7.detail',
        detailVariant: 'caution',
      },
    ],
  },
  {
    id: 'phase3',
    number: 3,
    titleKey: 'setup.phase3.title',
    subKey: 'setup.phase3.sub',
    steps: [
      {
        id: 'step8',
        number: 8,
        titleKey: 'setup.step8.title',
        bodyKeys: ['setup.step8.p'],
        detailKey: 'setup.step8.detail',
        detailVariant: 'note',
      },
      {
        id: 'step9',
        number: 9,
        titleKey: 'setup.step9.title',
        bodyKeys: ['setup.step9.p'],
      },
    ],
  },
  {
    id: 'phase4',
    number: 4,
    titleKey: 'setup.phase4.title',
    subKey: 'setup.phase4.sub',
    steps: [
      {
        id: 'step10',
        number: 10,
        titleKey: 'setup.step10.title',
        bodyKeys: ['setup.step10.p'],
      },
      {
        id: 'step11',
        number: 11,
        titleKey: 'setup.step11.title',
        bodyKeys: ['setup.step11.p1', 'setup.step11.p2'],
      },
      {
        id: 'step12',
        number: 12,
        titleKey: 'setup.step12.title',
        bodyKeys: ['setup.step12.p'],
        detailKey: 'setup.step12.detail',
        detailVariant: 'caution',
      },
      {
        id: 'step13',
        number: 13,
        titleKey: 'setup.step13.title',
        bodyKeys: ['setup.step13.p'],
      },
      {
        id: 'step14',
        number: 14,
        titleKey: 'setup.step14.title',
        bodyKeys: ['setup.step14.p'],
      },
      {
        id: 'step15',
        number: 15,
        titleKey: 'setup.step15.title',
        bodyKeys: ['setup.step15.p'],
        detailKey: 'setup.step15.detail',
        detailVariant: 'note',
      },
    ],
  },
  {
    id: 'phase5',
    number: 5,
    titleKey: 'setup.phase5.title',
    subKey: 'setup.phase5.sub',
    steps: [
      {
        id: 'step16',
        number: 16,
        titleKey: 'setup.step16.title',
        bodyKeys: ['setup.step16.p'],
      },
      {
        id: 'step17',
        number: 17,
        titleKey: 'setup.step17.title',
        bodyKeys: ['setup.step17.p'],
      },
      {
        id: 'step18',
        number: 18,
        titleKey: 'setup.step18.title',
        bodyKeys: ['setup.step18.p'],
      },
      {
        id: 'step19',
        number: 19,
        titleKey: 'setup.step19.title',
        bodyKeys: ['setup.step19.p'],
      },
    ],
  },
];

export const modelsIntro = {
  eyebrow: 'models.eyebrow',
  h2: 'models.h2',
  intro: 'models.intro',
  note: 'models.note',
} as const;

/**
 * The 8 supported Access Point model reference sheets, in display order.
 * Spec fields are shared/reused translation keys (e.g. several models point
 * `wifiKey` at the same "spec.wifi6dual" string) — this mirrors the
 * original markup exactly rather than duplicating copy.
 */
export const apModels: ApModel[] = [
  {
    id: 'model1',
    modelNumber: 'DS-3WAP621E-SI',
    tagKeys: ['tag.wifi6', 'tag.inwall'],
    specs: {
      wifiKey: 'spec.wifi6dual',
      speedKey: 'spec.speed2975',
      powerKey: 'model1.power',
      portsKey: 'spec.ports2gigPassthrough',
      ratingKey: 'spec.indoorOnly',
    },
    bestForKey: 'model1.bestFor',
    unverified: false,
  },
  {
    id: 'model2',
    modelNumber: 'DS-3WAP521-SI',
    tagKeys: ['tag.wifi5', 'tag.inwall'],
    specs: {
      wifiKey: 'spec.wifi5dual',
      speedKey: 'spec.speed1167',
      powerKey: 'model2.power',
      portsKey: 'spec.ports2gigPassthrough',
      ratingKey: 'spec.indoorOnly',
    },
    bestForKey: 'model2.bestFor',
    unverified: false,
  },
  {
    id: 'model3',
    modelNumber: 'DS-3WAP522-SI',
    tagKeys: ['tag.wifi5', 'tag.ceilingdesk'],
    specs: {
      wifiKey: 'spec.wifi5dual',
      speedKey: 'spec.speed1167',
      powerKey: 'spec.poeOrAdapter12v',
      portsKey: 'spec.ports1gig',
      ratingKey: 'spec.indoorOnly',
    },
    bestForKey: 'model3.bestFor',
    unverified: false,
  },
  {
    id: 'model4',
    modelNumber: 'DS-3WAP622E-SI',
    tagKeys: ['tag.wifi6', 'tag.ceilingdesk'],
    specs: {
      wifiKey: 'spec.wifi6dual',
      speedKey: 'spec.speed2975',
      powerKey: 'spec.poeOrAdapter12v',
      portsKey: 'model4.ports',
      ratingKey: 'spec.indoorOnly',
    },
    bestForKey: 'model4.bestFor',
    unverified: false,
  },
  {
    id: 'model5',
    modelNumber: 'DS-3WAP622G-SI',
    tagKeys: ['tag.wifi6', 'tag.ceilingdesk'],
    specs: {
      wifiKey: 'spec.wifi6dual',
      speedKey: 'spec.speed1775',
      powerKey: 'spec.poeOrAdapter12v',
      portsKey: 'spec.ports1gig',
      ratingKey: 'spec.indoorOnly',
    },
    bestForKey: 'model5.bestFor',
    unverified: false,
  },
  {
    id: 'model6',
    modelNumber: 'DS-3WAP623E-SI',
    tagKeys: ['tag.wifi6', 'tag.outdoorip68'],
    specs: {
      wifiKey: 'spec.wifi6dual',
      speedKey: 'spec.speed2975',
      powerKey: 'model6.power',
      portsKey: 'spec.ports1gig',
      ratingKey: 'model6.rating',
    },
    bestForKey: 'model6.bestFor',
    unverified: false,
    outdoor: true,
  },
  {
    id: 'modelUnconfirmed1',
    modelNumber: 'DS-3WAP6218-EI',
    tagKeys: ['tag.unconfirmed'],
    bestForKey: 'modelUnconfirmed.bestFor',
    noteKey: 'modelUnconfirmed.note',
    unverified: true,
  },
  {
    id: 'modelUnconfirmed2',
    modelNumber: 'DS-3WAP5312-EI',
    tagKeys: ['tag.unconfirmed'],
    bestForKey: 'modelUnconfirmed.bestFor',
    noteKey: 'modelUnconfirmed.note',
    unverified: true,
  },
];

export const glossaryIntro = {
  eyebrow: 'glossary.eyebrow',
  h2: 'glossary.h2',
  intro: 'glossary.intro',
} as const;

export const glossaryTerms: GlossaryTerm[] = [
  { id: 'ap', termKey: 'gl.ap.term', defKey: 'gl.ap.def' },
  { id: 'poe', termKey: 'gl.poe.term', defKey: 'gl.poe.def' },
  { id: 'ssid', termKey: 'gl.ssid.term', defKey: 'gl.ssid.def' },
  { id: 'ip', termKey: 'gl.ip.term', defKey: 'gl.ip.def' },
  { id: 'router', termKey: 'gl.router.term', defKey: 'gl.router.def' },
  { id: 'ethernet', termKey: 'gl.ethernet.term', defKey: 'gl.ethernet.def' },
  { id: 'firmware', termKey: 'gl.firmware.term', defKey: 'gl.firmware.def' },
  { id: 'activation', termKey: 'gl.activation.term', defKey: 'gl.activation.def' },
];

export const helpIntro = {
  eyebrow: 'help.eyebrow',
  h2: 'help.h2',
  intro: 'help.intro',
} as const;

export const faqItems: FaqItem[] = [
  { id: 'q1', titleKey: 'help.q1.title', bodyKeys: ['help.q1.p1', 'help.q1.p2'] },
  { id: 'q2', titleKey: 'help.q2.title', bodyKeys: ['help.q2.p1', 'help.q2.p2'] },
  { id: 'q3', titleKey: 'help.q3.title', bodyKeys: ['help.q3.p1', 'help.q3.p2'] },
  { id: 'q4', titleKey: 'help.q4.title', bodyKeys: ['help.q4.p1'] },
  { id: 'q5', titleKey: 'help.q5.title', bodyKeys: ['help.q5.p1'] },
];

export const footer = {
  safety: 'footer.safety',
  contact: 'footer.contact',
} as const;

export const install = {
  title: 'install.title',
  subtitle: 'install.subtitle',
  iosNote: 'install.iosNote',
  fallbackNote: 'install.fallbackNote',
  button: 'install.button',
  dismissLabel: 'install.dismissLabel',
} as const;

/**
 * The install-prompt button can show two dynamic fallback messages that
 * were never part of the translated DICT in the original app — they were
 * hardcoded English strings written directly into the install-prompt JS.
 * Preserved as-is (untranslated) rather than silently "fixing" scope creep;
 * see viewmodel/installPromptViewModel.ts for where they're used.
 */
export const installFallbackMessages = {
  fileProtocol:
    'Open this page from a web server (for example, http://localhost:8000) to enable installation on mobile.',
  unsupportedBrowser:
    'Install is not available in this browser yet. Open the browser menu and choose "Add to Home Screen" or "Install app".',
} as const;
