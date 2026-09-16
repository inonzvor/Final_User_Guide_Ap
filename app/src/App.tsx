import { useEffect } from 'react';
import { useViewModel } from './useViewModel';
import { navigationViewModel, installPromptViewModel, languageViewModel } from './viewmodels';
import { Layout } from './components/Layout';
import { OverviewPage } from './pages/OverviewPage';
import { GuidePage } from './pages/GuidePage';
import { ReferencePage } from './pages/ReferencePage';
import { ANCHOR_TO_PAGE, getLocalizedNav, type DeferredInstallPrompt } from '../../src';

export function App() {
  const { page, scrollTargetId } = useViewModel(navigationViewModel);
  const { lang } = useViewModel(languageViewModel);

  useEffect(() => {
    function onBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      installPromptViewModel.captureInstallPrompt(event as unknown as DeferredInstallPrompt);
    }
    function onAppInstalled() {
      installPromptViewModel.dismiss();
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, []);

  useEffect(() => {
    if (!scrollTargetId) return;
    // Timeout allows DOM to render before scrolling
    setTimeout(() => {
      document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }, [page, scrollTargetId]);

  // Reflect the current page/section into the URL hash so it's bookmarkable,
  // shareable, and survives a refresh. Uses pushState (not `location.hash =`)
  // so it doesn't fight the smooth-scroll above with a native jump-scroll.
  useEffect(() => {
    const nextHash = `#${scrollTargetId ?? page}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }
  }, [page, scrollTargetId]);

  // Pick up browser back/forward and manual hash edits.
  useEffect(() => {
    function onHashChange() {
      const id = window.location.hash.slice(1);
      if (ANCHOR_TO_PAGE[id]) {
        navigationViewModel.navigateToAnchor(id);
      }
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const nav = getLocalizedNav(lang);
    const label = page === 'overview' ? nav.overview : page === 'guide' ? nav.setup : nav.models;
    document.title = `${label} · ${nav.brand}`;
  }, [page, lang]);

  return (
    <Layout>
      {page === 'overview' && <OverviewPage />}
      {page === 'guide' && <GuidePage />}
      {page === 'reference' && <ReferencePage />}
    </Layout>
  );
}
