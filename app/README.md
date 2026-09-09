# UI stub (no design)

A deliberately unstyled React app that wires up every view-model and
localized content getter exported from `../src` — semantic HTML elements
only (`header`, `nav`, `section`, `dl`, `details`/`summary`, plain
`button`s), **zero CSS**. It exists to prove the Model/ViewModel layer works
end-to-end and to give the real UI (built separately in Google AI Studio)
a working reference for state → content mapping. It is not a design and
isn't meant to be one.

## Run it

```
cd app
npm install
npm run dev
```

Then open the printed local URL. You should be able to:

- switch EN / RU / HE (Hebrew flips to RTL)
- toggle light/dark (persists across reloads via `localStorage`)
- switch between the three pages (Overview / Guide / Reference)
- click an in-copy link like "Common problems" and land on the right page
- open every FAQ item, read all 19 steps across the 5 phases, see all 8
  model reference sheets and the glossary
- see the install banner (only meaningful when served over http(s), not
  `file://`, and only shows the real "Install" button in browsers that fire
  `beforeinstallprompt`)

## What's deliberately missing

- Any CSS at all — no reset, no layout, no color.
- The hero/overview illustration SVGs (only the diagram caption text is
  rendered) — those are visual assets for the real UI to (re)build, not
  logic.
- Persisted language selection — matches the original app, which always
  starts at English on load.

## Files

- `src/viewmodels.ts` — the four view-model singletons (theme, language,
  navigation, install-prompt) for the app's lifetime.
- `src/useViewModel.ts` — a tiny `useSyncExternalStore` bridge so any
  `../src` view-model (anything with `getState()` + `subscribe()`) drops
  into React state.
- `src/App.tsx` — everything else: layout, page switching, and rendering
  each `getLocalized*` content shape from `../src`.
