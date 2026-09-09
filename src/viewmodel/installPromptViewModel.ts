import { installFallbackMessages } from '../model/content';
import { Store, type Unsubscribe } from './Store';

const DISMISS_STORAGE_KEY = 'ap-guide-install-dismissed';

/**
 * Which fallback text should be displayed. 'default' resolves through the
 * translated `install.fallbackNote` dictionary key; the other two use the
 * untranslated English strings the original app hardcoded into its JS (see
 * model/content.ts `installFallbackMessages`).
 */
export type FallbackMessageKind = 'default' | 'fileProtocol' | 'unsupportedBrowser';

export interface InstallPromptState {
  /** Whole install card. False once dismissed, already installed, or already running standalone. */
  cardVisible: boolean;
  buttonVisible: boolean;
  iosNoteVisible: boolean;
  fallbackNoteVisible: boolean;
  fallbackMessageKind: FallbackMessageKind;
}

/** Environment probes, isolated so they can be swapped out in non-browser (e.g. test) environments. */
export interface InstallEnvironment {
  isStandalone(): boolean;
  isIOS(): boolean;
  isFileProtocol(): boolean;
  wasDismissed(): boolean;
  persistDismissed(): void;
}

function safeLocalStorageGet(key: string): string | null {
  try {
    return globalThis.localStorage?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

function safeLocalStorageSet(key: string, value: string): void {
  try {
    globalThis.localStorage?.setItem(key, value);
  } catch {
    // storage unavailable — dismissal just won't persist across reloads
  }
}

export const defaultInstallEnvironment: InstallEnvironment = {
  isStandalone(): boolean {
    if (typeof window === 'undefined') return false;
    const displayModeStandalone = window.matchMedia?.('(display-mode: standalone)').matches ?? false;
    const iosStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    return displayModeStandalone || iosStandalone;
  },
  isIOS(): boolean {
    if (typeof navigator === 'undefined') return false;
    const hasMSStream = typeof window !== 'undefined' && 'MSStream' in window;
    return /iphone|ipad|ipod/i.test(navigator.userAgent) && !hasMSStream;
  },
  isFileProtocol(): boolean {
    if (typeof location === 'undefined') return false;
    return location.protocol === 'file:';
  },
  wasDismissed(): boolean {
    return safeLocalStorageGet(DISMISS_STORAGE_KEY) === '1';
  },
  persistDismissed(): void {
    safeLocalStorageSet(DISMISS_STORAGE_KEY, '1');
  },
};

/** Minimal shape of the browser's BeforeInstallPromptEvent, without depending on lib.dom's non-standard bits. */
export interface DeferredInstallPrompt {
  prompt(): void;
  userChoice: Promise<unknown>;
}

/**
 * Drives the "install this guide as an app" banner: PWA install-prompt
 * capture, iOS/file-protocol/unsupported-browser fallbacks, and dismissal —
 * decoupled from the DOM. Ports the exact state machine from the original
 * app's inline install-prompt script.
 */
export class InstallPromptViewModel {
  private store: Store<InstallPromptState>;
  private deferredPrompt: DeferredInstallPrompt | null = null;
  private env: InstallEnvironment;

  constructor(env: InstallEnvironment = defaultInstallEnvironment) {
    this.env = env;
    this.store = new Store<InstallPromptState>(this.computeInitialState());
  }

  private computeInitialState(): InstallPromptState {
    if (this.env.isStandalone() || this.env.wasDismissed()) {
      return {
        cardVisible: false,
        buttonVisible: false,
        iosNoteVisible: false,
        fallbackNoteVisible: false,
        fallbackMessageKind: 'default',
      };
    }
    if (this.env.isIOS()) {
      return {
        cardVisible: true,
        buttonVisible: false,
        iosNoteVisible: true,
        fallbackNoteVisible: false,
        fallbackMessageKind: 'default',
      };
    }
    if (this.env.isFileProtocol()) {
      return {
        cardVisible: true,
        buttonVisible: false,
        iosNoteVisible: false,
        fallbackNoteVisible: true,
        fallbackMessageKind: 'fileProtocol',
      };
    }
    return {
      cardVisible: true,
      buttonVisible: false,
      iosNoteVisible: false,
      fallbackNoteVisible: true,
      fallbackMessageKind: 'default',
    };
  }

  getState(): InstallPromptState {
    return this.store.getState();
  }

  subscribe(listener: (state: InstallPromptState) => void): Unsubscribe {
    return this.store.subscribe(listener);
  }

  /** Call from a 'beforeinstallprompt' listener. Caller is responsible for `event.preventDefault()`. */
  captureInstallPrompt(event: DeferredInstallPrompt): void {
    this.deferredPrompt = event;
    this.store.update({ buttonVisible: true, iosNoteVisible: false, fallbackNoteVisible: false });
  }

  /** Call when the install button is clicked. */
  async promptInstall(): Promise<void> {
    if (!this.deferredPrompt) {
      this.store.update({
        buttonVisible: false,
        fallbackNoteVisible: true,
        fallbackMessageKind: 'unsupportedBrowser',
      });
      return;
    }
    this.deferredPrompt.prompt();
    await this.deferredPrompt.userChoice;
    this.deferredPrompt = null;
    this.store.update({ buttonVisible: false });
  }

  /** Call on the dismiss button, or the 'appinstalled' event — both dismiss and persist in the original app. */
  dismiss(): void {
    this.env.persistDismissed();
    this.store.update({ cardVisible: false });
  }

  resolveFallbackMessage(kind: FallbackMessageKind): string | null {
    switch (kind) {
      case 'fileProtocol':
        return installFallbackMessages.fileProtocol;
      case 'unsupportedBrowser':
        return installFallbackMessages.unsupportedBrowser;
      case 'default':
      default:
        return null; // resolve 'install.fallbackNote' via the i18n view-model instead
    }
  }
}
