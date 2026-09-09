import type { Direction, Lang } from '../model/types';
import { DEFAULT_LANGUAGE, getDirection, isSupportedLanguage } from './i18nViewModel';
import { Store, type Unsubscribe } from './Store';

export interface LanguageState {
  lang: Lang;
  dir: Direction;
}

/**
 * Current UI language + text direction. The original app never persisted
 * the chosen language (it always reset to English on load) — preserved
 * here rather than inventing new behavior; add persistence in the UI layer
 * if the redesign wants it.
 */
export class LanguageViewModel {
  private store: Store<LanguageState>;

  constructor(initialLang: Lang = DEFAULT_LANGUAGE) {
    this.store = new Store<LanguageState>({ lang: initialLang, dir: getDirection(initialLang) });
  }

  getState(): LanguageState {
    return this.store.getState();
  }

  subscribe(listener: (state: LanguageState) => void): Unsubscribe {
    return this.store.subscribe(listener);
  }

  setLanguage(lang: string): void {
    if (!isSupportedLanguage(lang)) return;
    this.store.setState({ lang, dir: getDirection(lang) });
  }
}
