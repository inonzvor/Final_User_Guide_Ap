import { useViewModel } from '../useViewModel';
import { installPromptViewModel, languageViewModel } from '../viewmodels';
import { getLocalizedInstallCopy } from '../../../src';
import { Download, X, ExternalLink, Share, Smartphone, Monitor } from 'lucide-react';
import { useState, useEffect } from 'react';

export function InstallBanner() {
  const { lang } = useViewModel(languageViewModel);
  const state = useViewModel(installPromptViewModel);
  const copy = getLocalizedInstallCopy(lang);
  const [showGuide, setShowGuide] = useState(false);
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

  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;

  const downloadOfflineApp = () => {
    const origin = window.location.origin || window.location.href;
    const isRu = lang === 'ru';
    const isHe = lang === 'he';
    const title = isRu ? 'Руководство по настройке точек доступа' : isHe ? 'מדריך הגדרת נקודות גישה' : 'Access Point Setup Guide';
    const desc = isRu
      ? 'Автономное приложение для настройки точек доступа.'
      : isHe
      ? 'אפליקציה להתקנה ועבודה לא מקוונת.'
      : 'Offline access point setup application.';

    const html = `<!DOCTYPE html>
<html lang="${lang}" dir="${isHe ? 'rtl' : 'ltr'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="manifest" href="${origin}/manifest.webmanifest">
  <link rel="icon" href="${origin}/icon.svg">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0b1220; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 24px; box-sizing: border-box; }
    .card { background: #131d31; border: 1px solid #1e293b; border-radius: 20px; padding: 32px; max-width: 440px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    h1 { font-size: 20px; margin: 0 0 12px; }
    p { color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0 0 20px; }
    .btn { display: inline-block; background: #2dd4bf; color: #0b1220; font-weight: 600; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-size: 15px; }
  </style>
  <script>
    if (window.location.protocol.startsWith('http')) {
      window.location.replace('${origin}/?auto_install=true');
    }
  </script>
</head>
<body>
  <div class="card">
    <h1>${title}</h1>
    <p>${desc}</p>
    <a href="${origin}/?auto_install=true" class="btn">${isRu ? 'Открыть приложение' : isHe ? 'פתח יישום' : 'Open Application'}</a>
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AP_Setup_Guide.html';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 500);
  };

  const handleInstallClick = async () => {
    // 1. If native deferred prompt is available, trigger it directly
    if (installPromptViewModel.hasDeferredPrompt()) {
      const success = await installPromptViewModel.promptInstall();
      if (success) return;
    }
    const globalPrompt = (window as unknown as { __deferredPrompt?: { prompt: () => void; userChoice: Promise<unknown> } }).__deferredPrompt;
    if (globalPrompt) {
      try {
        globalPrompt.prompt();
        await globalPrompt.userChoice;
        installPromptViewModel.dismiss();
        return;
      } catch {
        // continue
      }
    }

    // 2. If inside iframe (preview), open top-level window with ?auto_install=true and trigger file download
    if (isInIframe) {
      window.open(window.location.origin + '?auto_install=true', '_blank');
      downloadOfflineApp();
      return;
    }

    // 3. Directly download the standalone offline application file
    downloadOfflineApp();
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
          <button
            id="pwa-download-btn"
            onClick={handleInstallClick}
            className="bg-accent hover:bg-accent-strong text-on-accent px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:scale-95"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>{copy.button}</span>
          </button>

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
