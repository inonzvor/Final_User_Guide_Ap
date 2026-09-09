import { Moon, Sun } from 'lucide-react';
import { useViewModel } from '../useViewModel';
import { themeViewModel } from '../viewmodels';
import { cn } from '../lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useViewModel(themeViewModel);
  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => themeViewModel.toggle()}
      className={cn(
        "p-2 rounded-xl transition-colors text-ink-soft hover:text-accent hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
}
