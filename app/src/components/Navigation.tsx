import { useViewModel } from '../useViewModel';
import { navigationViewModel, languageViewModel } from '../viewmodels';
import { getLocalizedNav } from '../../../src';
import { ThemeToggle } from './ThemeToggle';
import { LangToggle } from './LangToggle';
import { BookOpen, ListChecks, Server, Wifi } from 'lucide-react';
import { cn } from '../lib/utils';

export function Sidebar() {
  const { lang } = useViewModel(languageViewModel);
  const { page } = useViewModel(navigationViewModel);
  const nav = getLocalizedNav(lang);

  const links = [
    { id: 'overview', label: nav.overview, icon: BookOpen },
    { id: 'guide', label: nav.setup, icon: ListChecks },
    { id: 'reference', label: nav.models, icon: Server },
  ] as const;

  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 glass border-e border-line p-6 z-40">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 border border-line flex items-center justify-center text-ink shrink-0">
          <Wifi className="w-5 h-5" />
        </div>
        <span className="font-bold text-lg text-ink tracking-tight uppercase">{nav.brand}</span>
      </div>

      <nav className="flex-1 space-y-1" aria-label={nav.ariaLabel}>
        {links.map(({ id, label, icon: Icon }, i) => (
          <button
            key={id}
            onClick={() => navigationViewModel.showPage(id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 border text-start font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              page === id
                ? "bg-accent text-on-accent border-accent"
                : "border-transparent text-ink-soft hover:border-line hover:text-ink"
            )}
            aria-current={page === id ? 'page' : undefined}
          >
            <Icon className="w-5 h-5 opacity-90 shrink-0" />
            <span className="flex-1">{label}</span>
            <span className={cn("label-tag", page === id ? "text-on-accent/60" : "")}>
              {String(i + 1).padStart(2, '0')}
            </span>
          </button>
        ))}
      </nav>

      <div className="pt-6 border-t border-line flex items-center justify-between mt-auto">
        <LangToggle />
        <ThemeToggle />
      </div>
    </aside>
  );
}

export function MobileHeader() {
  const { lang } = useViewModel(languageViewModel);
  const nav = getLocalizedNav(lang);

  return (
    <header className="lg:hidden sticky top-0 z-40 glass border-b border-line px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 border border-line flex items-center justify-center text-ink shrink-0">
          <Wifi className="w-4 h-4" />
        </div>
        <span className="font-bold text-base text-ink tracking-tight uppercase">{nav.brand}</span>
      </div>
      <div className="flex items-center gap-1">
        <LangToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}

export function MobileBottomNav() {
  const { lang } = useViewModel(languageViewModel);
  const { page } = useViewModel(navigationViewModel);
  const nav = getLocalizedNav(lang);

  const links = [
    { id: 'overview', label: nav.overview, icon: BookOpen },
    { id: 'guide', label: nav.setup, icon: ListChecks },
    { id: 'reference', label: nav.models, icon: Server },
  ] as const;

  return (
    <nav className="lg:hidden fixed bottom-0 start-0 w-full glass border-t border-line pb-[env(safe-area-inset-bottom)] pt-1 px-2 flex items-center justify-around z-40">
      {links.map(({ id, label, icon: Icon }) => {
        const isActive = page === id;
        return (
          <button
            key={id}
            onClick={() => navigationViewModel.showPage(id)}
            className={cn(
              "flex flex-col items-center gap-1 p-2 min-w-[64px] border-t-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              isActive ? "text-ink border-ink" : "text-ink-soft border-transparent hover:text-ink"
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className={cn("w-6 h-6", isActive ? "stroke-[2.5px]" : "stroke-2")} />
            <span className="text-[10px] font-medium leading-none">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
