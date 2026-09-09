import { Globe } from 'lucide-react';
import { useViewModel } from '../useViewModel';
import { languageViewModel } from '../viewmodels';
import { SUPPORTED_LANGUAGES } from '../../../src';
import { cn } from '../lib/utils';

export function LangToggle({ className }: { className?: string }) {
  const { lang } = useViewModel(languageViewModel);

  // Cycle to the next language
  const handleToggle = () => {
    const currentIndex = SUPPORTED_LANGUAGES.indexOf(lang);
    const nextIndex = (currentIndex + 1) % SUPPORTED_LANGUAGES.length;
    languageViewModel.setLanguage(SUPPORTED_LANGUAGES[nextIndex]);
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "flex items-center gap-2 p-2 rounded-xl transition-colors font-medium text-sm text-ink-soft hover:text-accent hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent uppercase tracking-wider",
        className
      )}
      aria-label="Change language"
    >
      <Globe className="w-5 h-5" />
      <span>{lang}</span>
    </button>
  );
}
