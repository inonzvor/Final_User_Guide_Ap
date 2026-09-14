import { useViewModel } from '../useViewModel';
import { themeViewModel } from '../viewmodels';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const theme = useViewModel(themeViewModel);
  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => themeViewModel.toggle()}
      className={
        "p-2 rounded-full transition-colors text-ink-soft hover:text-accent hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      }
      aria-label="Toggle theme"
    >
      {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
}
