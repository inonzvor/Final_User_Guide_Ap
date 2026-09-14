import { useViewModel } from '../useViewModel';
import { languageViewModel } from '../viewmodels';
import { Globe2 } from 'lucide-react';

export function LangToggle() {
  const { lang } = useViewModel(languageViewModel);
  
  const cycleLang = () => {
    const nextMap: Record<string, 'en'|'ru'|'he'> = {
      en: 'ru',
      ru: 'he',
      he: 'en'
    };
    languageViewModel.setLanguage(nextMap[lang]);
  };

  return (
    <button
      onClick={cycleLang}
      className={
        "flex items-center gap-2 p-2 rounded-full transition-colors font-medium text-sm text-ink-soft hover:text-accent hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent uppercase tracking-wider"
      }
      aria-label="Change language"
    >
      <Globe2 className="w-5 h-5" />
      <span>{lang}</span>
    </button>
  );
}
