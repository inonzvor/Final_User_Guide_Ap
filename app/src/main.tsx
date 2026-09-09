import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Registering a controlling service worker is a hard requirement for Chromium
// to ever fire 'beforeinstallprompt' — without this, the install buttons in
// InstallBanner/GuidePage stay permanently inert. See public/sw.js.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Install prompt just won't be available this session (e.g. dev over
      // a proxy without HTTPS) — the existing fallback copy covers it.
    });
  });
}
