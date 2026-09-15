import { useViewModel } from '../useViewModel';
import { installPromptViewModel, languageViewModel } from '../viewmodels';
import { getLocalizedInstallCopy } from '../../../src';
import { Download, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function InstallBanner() {
  const { lang } = useViewModel(languageViewModel);
  const state = useViewModel(installPromptViewModel);
  const copy = getLocalizedInstallCopy(lang);
  const [isStandalone, setIsStandalone] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const standaloneMatch = window.matchMedia?.('(display-mode: standalone)').matches ?? false;
    const minimalUiMatch = window.matchMedia?.('(display-mode: minimal-ui)').matches ?? false;
    const overlayMatch = window.matchMedia?.('(display-mode: window-controls-overlay)').matches ?? false;
    const iosStandalone = (window.navigator as unknown as { standalone?: boolean })?.standalone === true;
    return standaloneMatch || minimalUiMatch || overlayMatch || iosStandalone;
  });

  useEffect(() => {
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsStandalone(true);
      }
    };
    const mql = window.matchMedia?.('(display-mode: standalone)');
    mql?.addEventListener('change', handleDisplayModeChange);

    const handleAppInstalled = () => {
      setIsStandalone(true);
      installPromptViewModel.dismiss();
    };
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      mql?.removeEventListener('change', handleDisplayModeChange);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Only visible if PWA is not downloaded / installed
  if (isStandalone || !state.cardVisible) return null;

  const fallbackText =
    state.fallbackMessageKind === 'default'
      ? copy.fallbackNote
      : installPromptViewModel.resolveFallbackMessage(state.fallbackMessageKind) ?? copy.fallbackNote;

  const handleInstallClick = async () => {
    await installPromptViewModel.promptInstall();
  };

  return (
    <div id="pwa-install-banner" className="bg-surface border-b border-line px-4 py-4 md:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-base font-semibold text-ink flex items-center gap-2">
            <Download className="w-4 h-4 text-accent" />
            {copy.title}
          </h2>
          <p className="text-sm text-ink-soft mt-1">{copy.subtitle}</p>

          {state.iosNoteVisible && (
            <p className="text-xs text-info mt-2 bg-info/10 px-3 py-1.5 rounded-lg inline-block">{copy.iosNote}</p>
          )}
          {state.fallbackNoteVisible && (
            <p className="text-xs text-ink-faint mt-2">{fallbackText}</p>
          )}
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
          {state.buttonVisible && (
            <button
              id="pwa-download-btn"
              onClick={handleInstallClick}
              className="bg-accent hover:bg-accent-strong text-on-accent px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:scale-95"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>{copy.button}</span>
            </button>
          )}

          <button
            id="pwa-dismiss-btn"
            onClick={() => installPromptViewModel.dismiss()}
            aria-label={copy.dismissLabel}
            className="p-2 text-ink-soft hover:text-ink hover:bg-surface-raised rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
