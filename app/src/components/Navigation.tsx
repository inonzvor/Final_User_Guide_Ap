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
    <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 bg-surface border-e border-line p-6 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-40">
      <div className="flex items-center gap-3 mb-10 text-accent">
        <div className="p-2 bg-accent/10 rounded-xl">
          <Wifi className="w-6 h-6" />
        </div>
        <span className="font-bold text-lg text-ink tracking-tight">{nav.brand}</span>
      </div>

      <nav className="flex-1 space-y-2" aria-label={nav.ariaLabel}>
        {links.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => navigationViewModel.showPage(id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-start font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              page === id 
                ? "bg-accent text-on-accent shadow-md shadow-accent/20" 
                : "text-ink-soft hover:bg-surface-raised hover:text-ink"
            )}
            aria-current={page === id ? 'page' : undefined}
          >
            <Icon className="w-5 h-5 opacity-90" />
            {label}
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
    <header className="lg:hidden sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-line px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2 text-accent">
        <div className="p-1.5 bg-accent/10 rounded-lg">
          <Wifi className="w-5 h-5" />
        </div>
        <span className="font-bold text-base text-ink tracking-tight">{nav.brand}</span>
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
    <nav className="lg:hidden fixed bottom-0 start-0 w-full bg-surface border-t border-line pb-[env(safe-area-inset-bottom)] pt-1 px-2 flex items-center justify-around z-40 shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
      {links.map(({ id, label, icon: Icon }) => {
        const isActive = page === id;
        return (
          <button
            key={id}
            onClick={() => navigationViewModel.showPage(id)}
            className={cn(
              "flex flex-col items-center gap-1 p-2 min-w-[64px] rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              isActive ? "text-accent" : "text-ink-soft hover:text-ink hover:bg-surface-raised"
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
