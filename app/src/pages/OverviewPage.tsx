import { useViewModel } from '../useViewModel';
import { languageViewModel } from '../viewmodels';
import { getLocalizedHero, getLocalizedOverview } from '../../../src';
import { ShieldCheck, Wifi, Globe, Router as RouterIcon, Smartphone, Laptop, ArrowRight, ArrowDown } from 'lucide-react';
import { SectionHead } from '../components/SectionHead';
import { Html } from '../components/Html';

export function OverviewPage() {
  const { lang } = useViewModel(languageViewModel);
  const hero = getLocalizedHero(lang);
  const ov = getLocalizedOverview(lang);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-16">
      {/* Hero Section */}
      <section className="space-y-8 py-6 md:py-10">
        <div className="space-y-6">
          <p className="label-tag">{hero.eyebrow}</p>
          <h1 className="display text-5xl sm:text-7xl md:text-8xl font-bold leading-[0.92] tracking-tighter text-ink uppercase max-w-4xl">
            {hero.h1}
          </h1>
          <p className="text-lg md:text-xl text-ink-soft max-w-2xl">
            {hero.sub}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {hero.badges.map((badge, i) => (
            <span key={i} className="label-chip">
              {badge}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap border-t border-line pt-6">
          {hero.meta.map((item, i) => (
            <div key={i} className="flex items-center gap-2 pe-8 border-e border-line last:border-e-0 last:pe-0 text-sm text-ink-soft">
              {i === 0 && <ShieldCheck className="w-4 h-4 text-ink-faint shrink-0" />}
              {i === 1 && <Wifi className="w-4 h-4 text-ink-faint shrink-0" />}
              <Html value={item} />
            </div>
          ))}
        </div>
      </section>

      {/* Network Diagram Illustration */}
      <section className="w-full border border-line p-6 md:p-12 relative">
        <span className="label-tag absolute top-4 start-4 md:top-6 md:start-6">01 / 01</span>
        <div className="max-w-4xl mx-auto flex flex-col items-center pt-8 md:pt-4">

          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 md:gap-2 relative py-6">

            {/* Desktop Connection Line Background */}
            <div className="hidden md:block absolute top-1/2 left-12 right-12 border-t border-dashed border-line -z-0 -translate-y-1/2" />

            {/* Internet */}
            <div className="flex flex-col items-center gap-3 z-10">
              <div className="w-16 h-16 border border-line text-ink-soft flex items-center justify-center">
                <Globe className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <span className="text-xs font-bold text-ink-soft tracking-wide uppercase">Internet</span>
            </div>

            {/* Arrow 1: Internet -> Router */}
            <div className="flex items-center justify-center w-8 h-8 border border-line text-ink-faint shrink-0">
              <ArrowRight className="w-4 h-4 hidden md:block rtl:-scale-x-100" strokeWidth={2} />
              <ArrowDown className="w-4 h-4 md:hidden" strokeWidth={2} />
            </div>

            {/* Modem/Router */}
            <div className="flex flex-col items-center gap-3 z-10">
              <div className="w-16 h-16 border border-line text-ink-soft flex items-center justify-center">
                <RouterIcon className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <span className="text-xs font-bold text-ink-soft tracking-wide uppercase">Router</span>
            </div>

            {/* Arrow 2: Router -> Access Point (Ethernet) */}
            <div className="flex items-center justify-center w-8 h-8 border border-line text-ink-faint shrink-0">
              <ArrowRight className="w-4 h-4 hidden md:block rtl:-scale-x-100" strokeWidth={2} />
              <ArrowDown className="w-4 h-4 md:hidden" strokeWidth={2} />
            </div>

            {/* Access Point */}
            <div className="flex flex-col items-center gap-3 z-10">
              <div className="relative w-20 h-20 bg-accent text-on-accent flex items-center justify-center">
                <Wifi className="w-9 h-9" strokeWidth={1.5} />
                {/* Ping animation ring */}
                <div className="absolute inset-0 border border-ink animate-ping opacity-20 duration-[3000ms]" />
              </div>
              <span className="text-xs font-bold text-ink tracking-wide uppercase">Access Point</span>
            </div>

            {/* Arrow 3: Access Point -> Devices (Wi-Fi) */}
            <div className="flex items-center justify-center w-8 h-8 border border-line text-ink-faint shrink-0">
              <ArrowRight className="w-4 h-4 hidden md:block rtl:-scale-x-100" strokeWidth={2} />
              <ArrowDown className="w-4 h-4 md:hidden" strokeWidth={2} />
            </div>

            {/* Devices */}
            <div className="flex flex-col items-center gap-3 z-10">
              <div className="flex items-center gap-2">
                <div className="w-14 h-14 border border-line text-ink-soft flex items-center justify-center">
                  <Laptop className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div className="w-14 h-14 border border-line text-ink-soft flex items-center justify-center">
                  <Smartphone className="w-6 h-6" strokeWidth={1.5} />
                </div>
              </div>
              <span className="text-xs font-bold text-ink-soft tracking-wide uppercase">Devices</span>
            </div>

          </div>

          <p className="text-center text-sm text-ink-soft mt-8 md:mt-12 border-t border-line pt-6 w-full max-w-xl">
            <em><Html value={ov.diagram.caption} /></em>
          </p>
        </div>
      </section>

      {/* Overview Content */}
      <section className="space-y-8 max-w-3xl">
        <SectionHead eyebrow={ov.eyebrow} title={ov.h2} />

        <p className="text-lg text-ink-soft leading-relaxed"><Html value={ov.intro} /></p>

        <div className="border border-line p-6 text-ink leading-relaxed">
          <Html value={ov.p1} />
        </div>

        <blockquote className="border-s-2 border-ink ps-6 py-2 my-8 text-xl font-medium italic text-ink">
          <Html value={ov.calloutP} />
        </blockquote>

        <p className="text-lg text-ink-soft leading-relaxed"><Html value={ov.p2} /></p>
      </section>
    </div>
  );
}
