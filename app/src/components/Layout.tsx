import { useViewModel } from '../useViewModel';
import { themeViewModel, languageViewModel, navigationViewModel } from '../viewmodels';
import { Sidebar, MobileHeader, MobileBottomNav } from './Navigation';
import { InstallBanner } from './InstallBanner';
import { getLocalizedFooter } from '../../../src';
import { useEffect, type MouseEvent } from 'react';

function Html({ value }: { value: string }) {
  return <span dangerouslySetInnerHTML={{ __html: value }} />;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const theme = useViewModel(themeViewModel);
  const { lang, dir } = useViewModel(languageViewModel);
  const footer = getLocalizedFooter(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Intercept hash links for smooth in-page navigation
  function handleContentClick(event: MouseEvent<HTMLElement>) {
    const anchor = (event.target as HTMLElement).closest('a[href^="#"]');
    const href = anchor?.getAttribute('href');
    if (!href) return;
    event.preventDefault();
    navigationViewModel.navigateToAnchor(href.slice(1));
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative" onClick={handleContentClick}>
      {/* Background Effect */}
      <div className="aurora-bg" aria-hidden="true" />
      
      {/* Mobile Top Header */}
      <MobileHeader />

      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <InstallBanner />
        
        <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 lg:p-12">
          {children}
        </main>

        <footer className="w-full max-w-5xl mx-auto p-4 md:p-8 border-t border-line mt-12 mb-20 lg:mb-8 text-center text-sm text-ink-soft">
          <p className="mb-2">
            <Html value={footer.safety} />
          </p>
          <p>
            <Html value={footer.contact} />
          </p>
        </footer>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
