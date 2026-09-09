import { useViewModel } from '../useViewModel';
import { installPromptViewModel, languageViewModel } from '../viewmodels';
import { getLocalizedInstallCopy } from '../../../src';
import { Download, X } from 'lucide-react';
import { cn } from '../lib/utils';

export function InstallBanner() {
  const { lang } = useViewModel(languageViewModel);
  const state = useViewModel(installPromptViewModel);
  const copy = getLocalizedInstallCopy(lang);

  if (!state.cardVisible) return null;

  const fallbackText =
    state.fallbackMessageKind === 'default'
      ? copy.fallbackNote
      : installPromptViewModel.resolveFallbackMessage(state.fallbackMessageKind) ?? copy.fallbackNote;

  return (
    <div className="bg-surface border-b border-line px-4 py-4 md:px-8 shadow-sm">
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
              onClick={() => installPromptViewModel.promptInstall()}
              className="bg-accent hover:bg-accent-strong text-on-accent px-4 py-2 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              {copy.button}
            </button>
          )}
          <button
            onClick={() => installPromptViewModel.dismiss()}
            aria-label={copy.dismissLabel}
            className="p-2 text-ink-soft hover:text-ink hover:bg-surface-raised rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
