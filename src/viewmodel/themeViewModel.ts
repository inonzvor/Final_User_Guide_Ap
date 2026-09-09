import { Store, type Unsubscribe } from './Store';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'ap-guide-theme';
const DEFAULT_THEME: Theme = 'light';

function readStoredTheme(): Theme {
  try {
    return globalThis.localStorage?.getItem(STORAGE_KEY) === 'dark' ? 'dark' : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

function writeStoredTheme(theme: Theme): void {
  try {
    globalThis.localStorage?.setItem(STORAGE_KEY, theme);
  } catch {
    // storage unavailable (private browsing, SSR, etc.) — theme just won't persist
  }
}

/**
 * Light/dark theme state, persisted to localStorage under the same key the
 * original app used ('ap-guide-theme'), defaulting to 'light'.
 */
export class ThemeViewModel {
  private store: Store<Theme>;

  constructor(initialTheme: Theme = readStoredTheme()) {
    this.store = new Store<Theme>(initialTheme);
  }

  getTheme(): Theme {
    return this.store.getState();
  }

  /** Alias for getTheme(), so ThemeViewModel matches the getState() shape every other view-model uses. */
  getState(): Theme {
    return this.getTheme();
  }

  subscribe(listener: (theme: Theme) => void): Unsubscribe {
    return this.store.subscribe(listener);
  }

  setTheme(theme: Theme): void {
    this.store.setState(theme);
    writeStoredTheme(theme);
  }

  toggle(): void {
    this.setTheme(this.getTheme() === 'dark' ? 'light' : 'dark');
  }
}
