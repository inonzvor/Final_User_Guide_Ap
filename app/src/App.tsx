import { useEffect, type MouseEvent } from 'react';
import {
  SUPPORTED_LANGUAGES,
  getLocalizedChecklist,
  getLocalizedFaq,
  getLocalizedFooter,
  getLocalizedGlossary,
  getLocalizedHero,
  getLocalizedInstallCopy,
  getLocalizedModels,
  getLocalizedNav,
  getLocalizedOverview,
  getLocalizedPower,
  getLocalizedSetupGuide,
  getLocalizedSetupIntro,
  type DeferredInstallPrompt,
  type InstallPromptState,
  type Lang,
} from '../../src';
import { useViewModel } from './useViewModel';
import {
  installPromptViewModel,
  languageViewModel,
  navigationViewModel,
  themeViewModel,
} from './viewmodels';

/**
 * Deliberately unstyled: no CSS anywhere in this stub. It exists to prove
 * the ../src Model/ViewModel layer is wired correctly end-to-end, and to
 * give the real (designed) UI — built separately in Google AI Studio —
 * a working reference for which state maps to which content.
 */
export function App() {
  const theme = useViewModel(themeViewModel);
  const { lang, dir } = useViewModel(languageViewModel);
  const { page, scrollTargetId } = useViewModel(navigationViewModel);
  const install = useViewModel(installPromptViewModel);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
    document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [page, scrollTargetId]);

  const nav = getLocalizedNav(lang);

  // Original app intercepted in-page hash links (e.g. href="#help") to
  // switch pages instead of doing a real navigation; do the same here.
  function handleContentClick(event: MouseEvent<HTMLElement>) {
    const anchor = (event.target as HTMLElement).closest('a[href^="#"]');
    const href = anchor?.getAttribute('href');
    if (!href) return;
    event.preventDefault();
    navigationViewModel.navigateToAnchor(href.slice(1));
  }

  return (
    <div onClick={handleContentClick}>
      <header>
        <strong>{nav.brand}</strong>{' '}
        <nav aria-label={nav.ariaLabel}>
          <button type="button" onClick={() => navigationViewModel.showPage('overview')} disabled={page === 'overview'}>
            {nav.overview}
          </button>{' '}
          <button type="button" onClick={() => navigationViewModel.showPage('guide')} disabled={page === 'guide'}>
            {nav.setup}
          </button>{' '}
          <button type="button" onClick={() => navigationViewModel.showPage('reference')} disabled={page === 'reference'}>
            {nav.models}
          </button>
        </nav>
        {' | '}
        {SUPPORTED_LANGUAGES.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => languageViewModel.setLanguage(code)}
            disabled={lang === code}
          >
            {code.toUpperCase()}
          </button>
        ))}
        {' | '}
        <button type="button" onClick={() => themeViewModel.toggle()}>
          {theme === 'dark' ? nav.themeLight : nav.themeDark}
        </button>
      </header>

      <hr />

      <InstallBanner lang={lang} state={install} />

      <main>
        {page === 'overview' && <OverviewPage lang={lang} />}
        {page === 'guide' && <GuidePage lang={lang} />}
        {page === 'reference' && <ReferencePage lang={lang} />}
      </main>

      <hr />

      <Footer lang={lang} />
    </div>
  );
}

function Html({ value }: { value: string }) {
  return <span dangerouslySetInnerHTML={{ __html: value }} />;
}

function InstallBanner({ lang, state }: { lang: Lang; state: InstallPromptState }) {
  const copy = getLocalizedInstallCopy(lang);
  if (!state.cardVisible) return null;

  const fallbackText =
    state.fallbackMessageKind === 'default'
      ? copy.fallbackNote
      : installPromptViewModel.resolveFallbackMessage(state.fallbackMessageKind) ?? copy.fallbackNote;

  return (
    <section id="installCard" aria-label={copy.title}>
      <h2>{copy.title}</h2>
      <p>{copy.subtitle}</p>
      {state.iosNoteVisible && <p>{copy.iosNote}</p>}
      {state.fallbackNoteVisible && <p>{fallbackText}</p>}
      {state.buttonVisible && (
        <button type="button" onClick={() => installPromptViewModel.promptInstall()}>
          {copy.button}
        </button>
      )}
      <button type="button" aria-label={copy.dismissLabel} onClick={() => installPromptViewModel.dismiss()}>
        {copy.dismissLabel} (x)
      </button>
    </section>
  );
}

function OverviewPage({ lang }: { lang: Lang }) {
  const hero = getLocalizedHero(lang);
  const ov = getLocalizedOverview(lang);

  return (
    <>
      <section id="top">
        <p>{hero.eyebrow}</p>
        <h1>{hero.h1}</h1>
        <p>{hero.sub}</p>
        <ul>
          {hero.badges.map((badge, i) => (
            <li key={i}>{badge}</li>
          ))}
        </ul>
        <ul>
          {hero.meta.map((item, i) => (
            <li key={i}>
              <Html value={item} />
            </li>
          ))}
        </ul>
      </section>

      <section id="overview">
        <p>{ov.eyebrow}</p>
        <h2>{ov.h2}</h2>
        <p>{ov.intro}</p>
        <p>
          <Html value={ov.p1} />
        </p>
        <blockquote>{ov.calloutP}</blockquote>
        <p>
          <em>{ov.diagram.caption}</em>
        </p>
        <p>{ov.p2}</p>
      </section>
    </>
  );
}

function GuidePage({ lang }: { lang: Lang }) {
  const pw = getLocalizedPower(lang);
  const setupIntro = getLocalizedSetupIntro(lang);
  const checklist = getLocalizedChecklist(lang);
  const phases = getLocalizedSetupGuide(lang);

  return (
    <>
      <section id="power">
        <p>{pw.eyebrow}</p>
        <h2>{pw.h2}</h2>
        <p>{pw.intro}</p>

        <article>
          <h3>{pw.poe.title}</h3>
          <p>
            <strong>{pw.poe.kicker}</strong>
          </p>
          <p>
            <Html value={pw.poe.p1} />
          </p>
          <p>{pw.poe.p2}</p>
          <p>
            <Html value={pw.poe.tip} />
          </p>
        </article>

        <article>
          <h3>{pw.adapter.title}</h3>
          <p>
            <strong>{pw.adapter.kicker}</strong>
          </p>
          <p>
            <Html value={pw.adapter.p1} />
          </p>
          <p>{pw.adapter.p2}</p>
          <p>{pw.adapter.tip}</p>
        </article>

        <p>
          <Html value={pw.warnCallout} />
        </p>
      </section>

      <section id="setup">
        <p>{setupIntro.eyebrow}</p>
        <h2>{setupIntro.h2}</h2>
        <p>{setupIntro.intro}</p>

        <aside>
          <h3>{checklist.title}</h3>
          <p>{checklist.kicker}</p>
          <ul>
            {checklist.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </aside>

        {phases.map((phase) => (
          <div key={phase.id}>
            <h3>{phase.title}</h3>
            <p>{phase.sub}</p>
            <ol start={phase.steps[0]?.number}>
              {phase.steps.map((step) => (
                <li key={step.id} id={step.id}>
                  <h4>{step.title}</h4>
                  {step.body.map((paragraph, i) => (
                    <p key={i}>
                      <Html value={paragraph} />
                    </p>
                  ))}
                  {step.detail && (
                    <p>
                      [{step.detailVariant === 'caution' ? 'CAUTION' : 'note'}] <Html value={step.detail} />
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>
    </>
  );
}

function ReferencePage({ lang }: { lang: Lang }) {
  const models = getLocalizedModels(lang);
  const glossary = getLocalizedGlossary(lang);
  const faq = getLocalizedFaq(lang);

  return (
    <>
      <section id="models">
        <p>{models.eyebrow}</p>
        <h2>{models.h2}</h2>
        <p>{models.intro}</p>

        {models.models.map((model) => (
          <article key={model.id}>
            <h3>
              {model.modelNumber}
              {model.outdoor ? ' (outdoor)' : ''}
            </h3>
            <p>{model.tags.join(' · ')}</p>
            {model.specs && (
              <dl>
                <dt>Wi-Fi</dt>
                <dd>{model.specs.wifi}</dd>
                <dt>Speed</dt>
                <dd>{model.specs.speed}</dd>
                <dt>Power</dt>
                <dd>
                  <Html value={model.specs.power} />
                </dd>
                <dt>Ports</dt>
                <dd>{model.specs.ports}</dd>
                <dt>Rating</dt>
                <dd>{model.specs.rating}</dd>
              </dl>
            )}
            {model.note && (
              <p>
                <em>{model.note}</em>
              </p>
            )}
            <p>
              <Html value={model.bestFor} />
            </p>
          </article>
        ))}

        <p>
          <small>{models.note}</small>
        </p>
      </section>

      <section id="glossary">
        <p>{glossary.eyebrow}</p>
        <h2>{glossary.h2}</h2>
        <p>{glossary.intro}</p>
        <dl>
          {glossary.terms.map((term) => (
            <div key={term.id}>
              <dt>{term.term}</dt>
              <dd>{term.def}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="help">
        <p>{faq.eyebrow}</p>
        <h2>{faq.h2}</h2>
        <p>{faq.intro}</p>
        {faq.items.map((item) => (
          <details key={item.id}>
            <summary>{item.title}</summary>
            {item.body.map((paragraph, i) => (
              <p key={i}>
                <Html value={paragraph} />
              </p>
            ))}
          </details>
        ))}
      </section>
    </>
  );
}

function Footer({ lang }: { lang: Lang }) {
  const footer = getLocalizedFooter(lang);
  return (
    <footer>
      <p>
        <Html value={footer.safety} />
      </p>
      <p>{footer.contact}</p>
    </footer>
  );
}
