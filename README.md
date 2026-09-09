# Final_User_Guide_Ap

Model/ViewModel layer for the **Access Point Setup Guide** — a plain-language,
trilingual (EN/RU/HE) instructional guide for retail staff setting up Wi-Fi
access points.

**This repo intentionally contains no UI.** No HTML, no CSS, no components.
It's the data and behavior a UI is built on top of — the UI itself is being
built separately in Google AI Studio. Wire that UI to the exports of this
package (or copy `src/` straight into the AI Studio project) rather than
re-deriving the copy, the 19-step walkthrough, or the theme/language/PWA
install logic from scratch.

## Where this came from

Ported from a single-file static app (`MANUAL/index.html` in the
`AP-Setup-Guide` repo) that had its content (an inline `DICT` object), state
logic, and markup/CSS all mixed into one HTML file. This repo pulls out only
the content and state logic — verbatim, not rewritten — as framework-agnostic
TypeScript.

## Layout

```
src/
  model/
    types.ts       Shared TypeScript types (Lang, SetupStep, ApModel, ...)
    content.ts      Structural content: nav/hero/overview/power copy, the
                     5-phase/19-step walkthrough, the 8 model reference
                     sheets, glossary, FAQ — as translation-key references,
                     not inlined strings
    i18n/
      en.json        }
      ru.json        } The full translation dictionaries, one file per
      he.json         } language, 201 keys each (extracted verbatim from
                        the original app; parity-checked key-for-key)
  viewmodel/
    Store.ts                    Tiny dependency-free observable (subscribe/
                                 getState/setState) — not tied to any UI
                                 framework
    i18nViewModel.ts             translate(lang, key) with English fallback,
                                  getDirection(lang) for RTL
    languageViewModel.ts         Current language + direction state
    themeViewModel.ts            Light/dark theme state, persisted to
                                  localStorage (key 'ap-guide-theme')
    navigationViewModel.ts       Current page (overview/guide/reference) +
                                  anchor-to-page routing
    installPromptViewModel.ts    PWA "Install this guide" banner state
                                  machine (iOS note / native prompt / browser
                                  fallback / dismissed), decoupled from the
                                  DOM
    contentViewModel.ts          Resolves model/content.ts + a chosen
                                  language into plain, ready-to-render
                                  strings (getLocalizedSetupGuide(lang),
                                  getLocalizedModels(lang), etc.) — the UI
                                  never needs to look up a translation key
                                  itself
  index.ts           Barrel export of everything above
```

## Using it from the AI Studio UI

Everything is exported from `src/index.ts`. Typical usage:

```ts
import {
  ThemeViewModel,
  LanguageViewModel,
  NavigationViewModel,
  InstallPromptViewModel,
  getLocalizedSetupGuide,
  getLocalizedModels,
  getLocalizedNav,
} from 'final-user-guide-ap';

const theme = new ThemeViewModel();
const language = new LanguageViewModel();

// Subscribe from a React effect / Vue watcher / whatever:
const unsubscribe = theme.subscribe((t) => applyThemeToUi(t));

// Get fully-localized, ready-to-render content:
const phases = getLocalizedSetupGuide(language.getState().lang);
```

Each view-model is a small class with `getState()` + `subscribe(listener)` +
mutator methods (`setTheme`, `toggle`, `setLanguage`, `showPage`,
`navigateToAnchor`, `dismiss`, ...) — call `subscribe` from whatever the UI
framework's reactivity hook is (e.g. wrap in `useSyncExternalStore` for
React) rather than polling `getState()`.

`contentViewModel.ts`'s `getLocalized*` functions are pure functions of
`(lang)` — no subscription needed; call them again whenever `language`
changes.

## Behavior preserved from the original app

- **Language does not persist** across reloads — it always starts at `'en'`.
  This matches the original; add persistence in the UI layer if the redesign
  wants it.
- **Theme persists** to `localStorage['ap-guide-theme']`, default `'light'`.
- **Install-prompt dismissal persists** to
  `localStorage['ap-guide-install-dismissed']`.
- Two install-prompt fallback messages (`installFallbackMessages` in
  `model/content.ts`) were hardcoded English text in the original app, never
  part of the translated dictionary — preserved as-is rather than silently
  "fixing" that gap. Everything else routes through `translate()`.
- Translation lookup falls back to English, then to `null`, exactly like the
  original `T(lang, key)`.

## Development

```
npm install
npm run typecheck   # tsc --noEmit
npm run build        # emits dist/ (.js + .d.ts)
```

This package imports the i18n JSON files directly (`resolveJsonModule` +
`moduleResolution: "Bundler"`), so it's meant to be consumed by a
bundler-based project (Vite, webpack, esbuild — including what Google AI
Studio's "Build" apps scaffold) rather than run directly under plain Node
ESM.

## Source of truth

The canonical, still-UI-attached version of this app lives in the
`AP-Setup-Guide` repo (`MANUAL/index.html`). If that file's copy or behavior
changes, re-sync `src/model/i18n/*.json` and `src/model/content.ts` from it
rather than editing translations by hand here.
