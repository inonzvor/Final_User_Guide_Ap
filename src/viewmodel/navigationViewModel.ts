import { Store, type Unsubscribe } from './Store';

export type PageName = 'overview' | 'guide' | 'reference';

/**
 * Maps every in-page anchor id to the top-level page that contains it.
 * Mirrors the original `pageMap`: sidebar links to 'overview' / 'guide' /
 * 'reference' switch pages directly; anchors like '#power' or '#glossary'
 * resolve to the page that section lives on.
 */
export const ANCHOR_TO_PAGE: Record<string, PageName> = {
  overview: 'overview',
  guide: 'guide',
  reference: 'reference',
  power: 'guide',
  setup: 'guide',
  models: 'reference',
  glossary: 'reference',
  help: 'reference',
};

export const DEFAULT_PAGE: PageName = 'overview';

export interface NavigationState {
  page: PageName;
  /** Anchor id the view should scroll to after switching pages, if any. */
  scrollTargetId: string | null;
}

/**
 * Which page is active, and (for anchor navigation) which element within it
 * to scroll to. The actual `scrollIntoView` call is a DOM/View concern —
 * this only decides *what* should happen, not how to render it.
 */
export class NavigationViewModel {
  private store: Store<NavigationState>;

  constructor(initialPage: PageName = DEFAULT_PAGE) {
    this.store = new Store<NavigationState>({ page: initialPage, scrollTargetId: null });
  }

  getState(): NavigationState {
    return this.store.getState();
  }

  subscribe(listener: (state: NavigationState) => void): Unsubscribe {
    return this.store.subscribe(listener);
  }

  showPage(page: PageName): void {
    this.store.setState({ page, scrollTargetId: null });
  }

  /** Resolve an anchor id (e.g. from a nav link's href="#power") to a page + scroll target. */
  navigateToAnchor(anchorId: string): void {
    const page = ANCHOR_TO_PAGE[anchorId] ?? DEFAULT_PAGE;
    this.store.setState({ page, scrollTargetId: anchorId });
  }
}
