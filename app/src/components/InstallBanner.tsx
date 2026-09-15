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

  const isIOS =
    typeof navigator !== 'undefined' &&
    /iphone|ipad|ipod/i.test(navigator.userAgent) &&
    !('MSStream' in window);

  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;

  const handleInstallClick = async () => {
    if (installPromptViewModel.hasDeferredPrompt()) {
      const prompted = await installPromptViewModel.promptInstall();
      if (prompted) return;
    }
    setShowGuide(true);
  };

  const modalCopy = {
    ru: {
      title: 'Установка приложения',
      iosTitle: 'Для iPhone и iPad (Safari)',
      iosStep1: 'Нажмите кнопку «Поделиться» в нижней панели Safari (квадрат со стрелкой вверх).',
      iosStep2: 'В появившемся меню прокрутите вниз и выберите «На экран „Домой“».',
      iosStep3: 'Нажмите «Добавить» в правом верхнем углу.',
      desktopTitle: 'Для Chrome, Edge и Android',
      desktopStep1: 'В строке адреса браузера справа нажмите иконку «Установить» (⊕).',
      desktopStep2: 'Либо откройте меню браузера (кнопка ⋮) и выберите «Установить приложение».',
      iframeNote: 'В режиме предпросмотра установка ограничена. Откройте приложение в новой вкладке браузера:',
      openTab: 'Открыть в новой вкладке',
      close: 'Понятно',
    },
    he: {
      title: 'התקנת האפליקציה',
      iosTitle: 'עבור iPhone ו-iPad (Safari)',
      iosStep1: 'לחצו על כפתור השיתוף בספארי (סמל ריבוע עם חץ כלפי מעלה).',
      iosStep2: 'גללו מטה בתפריט ובחרו באפשרות "הוסף למסך הבית".',
      iosStep3: 'לחצו על "הוסף" בפינה העליונה.',
      desktopTitle: 'עבור Chrome, Edge ו-Android',
      desktopStep1: 'בשורת הכתובת של הדפדפן לחצו על סמל ההתקנה (⊕).',
      desktopStep2: 'או פתחו את תפריט הדפדפן (⋮) ובחרו "התקן אפליקציה".',
      iframeNote: 'בתצוגה מקדימה ההתקנה מוגבלת. פתחו בלשונית חדשה:',
      openTab: 'פתח בלשונית חדשה',
      close: 'הבנתי',
    },
    en: {
      title: 'Install Application',
      iosTitle: 'For iPhone & iPad (Safari)',
      iosStep1: 'Tap the Share button in Safari (square with an arrow pointing up).',
      iosStep2: 'Scroll down the share sheet and select "Add to Home Screen".',
      iosStep3: 'Tap "Add" in the top-right corner.',
      desktopTitle: 'For Chrome, Edge & Android',
      desktopStep1: 'Click the Install icon (⊕ or computer icon) in the browser address bar.',
      desktopStep2: 'Or open the browser menu (⋮) and choose "Install app".',
      iframeNote: 'Installation is restricted inside preview iframes. Open directly in a new tab:',
      openTab: 'Open in new tab',
      close: 'Got it',
    },
  }[lang] ?? {
    title: 'Install Application',
    iosTitle: 'For iPhone & iPad (Safari)',
    iosStep1: 'Tap the Share button in Safari (square with an arrow pointing up).',
    iosStep2: 'Scroll down the share sheet and select "Add to Home Screen".',
    iosStep3: 'Tap "Add" in the top-right corner.',
    desktopTitle: 'For Chrome, Edge & Android',
    desktopStep1: 'Click the Install icon (⊕ or computer icon) in the browser address bar.',
    desktopStep2: 'Or open the browser menu (⋮) and choose "Install app".',
    iframeNote: 'Installation is restricted inside preview iframes. Open directly in a new tab:',
    openTab: 'Open in new tab',
    close: 'Got it',
  };

  return (
    <>
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

      {/* Installation Instructions Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface border border-line rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-accent/10 text-accent rounded-xl">
                  <Download className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-lg text-ink">{modalCopy.title}</h3>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="p-1.5 text-ink-soft hover:text-ink hover:bg-surface-raised rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isInIframe && (
              <div className="p-3.5 bg-accent/5 border border-accent/20 rounded-xl space-y-2 text-xs text-ink-soft">
                <p>{modalCopy.iframeNote}</p>
                <button
                  onClick={() => window.open(window.location.href, '_blank')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{modalCopy.openTab}</span>
                </button>
              </div>
            )}

            {isIOS ? (
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 font-medium text-ink">
                  <Smartphone className="w-4 h-4 text-accent" />
                  <span>{modalCopy.iosTitle}</span>
                </div>
                <ol className="space-y-2 text-xs text-ink-soft list-decimal list-inside bg-surface-raised p-3.5 rounded-xl border border-line leading-relaxed">
                  <li>{modalCopy.iosStep1}</li>
                  <li>{modalCopy.iosStep2}</li>
                  <li>{modalCopy.iosStep3}</li>
                </ol>
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 font-medium text-ink">
                  <Monitor className="w-4 h-4 text-accent" />
                  <span>{modalCopy.desktopTitle}</span>
                </div>
                <ol className="space-y-2 text-xs text-ink-soft list-decimal list-inside bg-surface-raised p-3.5 rounded-xl border border-line leading-relaxed">
                  <li>{modalCopy.desktopStep1}</li>
                  <li>{modalCopy.desktopStep2}</li>
                </ol>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowGuide(false)}
                className="bg-accent hover:bg-accent-strong text-on-accent px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                {modalCopy.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
