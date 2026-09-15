import { useViewModel } from '../useViewModel';
import { navigationViewModel, languageViewModel } from '../viewmodels';
import { getLocalizedNav } from '../../../src';
import { FileText, Book, HelpCircle, Server, Menu, X, Rocket, Zap, List } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LangToggle } from './LangToggle';
import { cn } from '../lib/utils';
import { useState } from 'react';

const ICONS = {
  overview: FileText,
  guide: Rocket,
  reference: Book,
} as const;

export function Sidebar() {
  const { page, scrollTargetId } = useViewModel(navigationViewModel);
  const currentPage = page;
  const { lang } = useViewModel(languageViewModel);
  const nav = getLocalizedNav(lang);

  const navItems = [
    { id: 'overview', icon: FileText, label: nav.overview },
    { id: 'guide', icon: Rocket, label: nav.groupGuide },
    { id: 'reference', icon: Book, label: nav.groupReference }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 border-r border-line bg-surface/30 backdrop-blur-xl shrink-0 py-8 z-50">
      <div className="px-8 mb-12 flex items-center gap-3">
        <div className="p-2 bg-accent/10 rounded-xl">
          <Server className="w-6 h-6 text-accent" />
        </div>
        <span className="font-display font-bold tracking-tight text-ink uppercase">{nav.brand}</span>
      </div>

      <nav className="flex-1 px-4 space-y-4 overflow-y-auto">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); navigationViewModel.navigateToAnchor(item.id); }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-start font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  isActive 
                    ? "bg-surface-raised text-accent shadow-sm border border-line" 
                    : "text-ink-soft hover:bg-surface hover:text-ink border border-transparent"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-accent" : "text-ink-faint")} />
                <span className="uppercase tracking-tight text-sm">{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>

      <div className="px-6 pt-8 mt-auto flex items-center justify-between border-t border-line mx-4">
        <LangToggle />
        <ThemeToggle />
      </div>
    </aside>
  );
}

export function MobileHeader() {
  const { lang } = useViewModel(languageViewModel);
  const nav = getLocalizedNav(lang);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden sticky top-0 z-50 w-full bg-bg/80 backdrop-blur-xl border-b border-line">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-accent/10 rounded-lg">
            <Server className="w-5 h-5 text-accent" />
          </div>
          <span className="font-display font-bold tracking-tight text-ink uppercase text-sm">{nav.topbarTitle}</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LangToggle />
        </div>
      </div>
    </div>
  );
}

export function MobileBottomNav() {
  const { page, scrollTargetId } = useViewModel(navigationViewModel);
  const currentPage = page;
  const { lang } = useViewModel(languageViewModel);
  const nav = getLocalizedNav(lang);

  const navItems = [
    { id: 'overview', icon: FileText, label: nav.overview },
    { id: 'guide', icon: Rocket, label: nav.groupGuide },
    { id: 'reference', icon: Book, label: nav.groupReference }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-xl border-t border-line z-50 pb-safe">
      <div className="flex items-center justify-around p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); navigationViewModel.navigateToAnchor(item.id); }}
              className={cn(
                "flex flex-col items-center gap-1 p-2 min-w-[64px] rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                isActive ? "text-accent" : "text-ink-soft hover:text-ink"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-accent" : "text-ink-faint")} />
              <span className="text-[10px] font-medium uppercase tracking-tight">{item.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
