import { useEffect } from 'react';
import { useViewModel } from './useViewModel';
import { navigationViewModel, installPromptViewModel } from './viewmodels';
import { Layout } from './components/Layout';
import { OverviewPage } from './pages/OverviewPage';
import { GuidePage } from './pages/GuidePage';
import { ReferencePage } from './pages/ReferencePage';
import type { DeferredInstallPrompt } from '../../src';

export function App() {
  const { page, scrollTargetId } = useViewModel(navigationViewModel);

  useEffect(() => {
    function capture(event: Event) {
      event.preventDefault();
      installPromptViewModel.captureInstallPrompt(event as unknown as DeferredInstallPrompt);
      if (window.location.search.includes('auto_install=true')) {
        setTimeout(() => {
          installPromptViewModel.promptInstall();
        }, 100);
      }
    }

    if ((window as unknown as { __deferredPrompt?: Event }).__deferredPrompt) {
      capture((window as unknown as { __deferredPrompt: Event }).__deferredPrompt);
    }

    function onBeforeInstallPrompt(event: Event) {
      capture(event);
    }
    function onDeferredReady() {
      if ((window as unknown as { __deferredPrompt?: Event }).__deferredPrompt) {
        capture((window as unknown as { __deferredPrompt: Event }).__deferredPrompt);
      }
    }
    function onAppInstalled() {
      installPromptViewModel.dismiss();
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('pwa-deferred-ready', onDeferredReady);
    window.addEventListener('appinstalled', onAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('pwa-deferred-ready', onDeferredReady);
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

  return (
    <Layout>
      {page === 'overview' && <OverviewPage />}
      {page === 'guide' && <GuidePage />}
      {page === 'reference' && <ReferencePage />}
    </Layout>
  );
}
