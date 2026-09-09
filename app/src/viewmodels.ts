import {
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
