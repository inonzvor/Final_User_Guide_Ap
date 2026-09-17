import {
  ANCHOR_TO_PAGE,
  InstallPromptViewModel,
  LanguageViewModel,
  NavigationViewModel,
  ThemeViewModel,
} from '../../src';

// Singleton view-model instances for the stub app's lifetime.
export const themeViewModel = new ThemeViewModel();
export const languageViewModel = new LanguageViewModel();
export const navigationViewModel = new NavigationViewModel();
export const installPromptViewModel = new InstallPromptViewModel();

// Deep-link support: land directly on the page/section named by the initial
// URL hash (e.g. "#power") instead of always resetting to the default page.
// Kept here (module init, before React mounts) rather than in an effect so
// there's no flash of the default page before the real one takes over.
const initialAnchor = window.location.hash.slice(1);
if (ANCHOR_TO_PAGE[initialAnchor]) {
  navigationViewModel.navigateToAnchor(initialAnchor);
}
