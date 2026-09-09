import { useViewModel } from '../useViewModel';
import { languageViewModel } from '../viewmodels';
import { getLocalizedHero, getLocalizedOverview } from '../../../src';
import { ShieldCheck, Wifi, ArrowRightLeft, Globe, Router as RouterIcon, Smartphone, Laptop, ArrowRight, ArrowDown } from 'lucide-react';
import { cn } from '../lib/utils';

function Html({ value }: { value: string }) {
  return <span dangerouslySetInnerHTML={{ __html: value }} />;
}

export function OverviewPage() {
  const { lang } = useViewModel(languageViewModel);
  const hero = getLocalizedHero(lang);
  const ov = getLocalizedOverview(lang);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-8 md:py-12">
        <p className="text-sm font-semibold tracking-widest uppercase text-accent">
          {hero.eyebrow}
        </p>
        <h1 className="display text-5xl sm:text-7xl font-semibold leading-[.95] tracking-tighter text-ink mt-8 max-w-[15ch] mx-auto uppercase">
          {hero.h1}
        </h1>
        <p className="text-lg md:text-xl text-ink-soft max-w-2xl mx-auto">
          {hero.sub}
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          {hero.badges.map((badge, i) => (
            <span key={i} className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
              {badge}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm text-ink-soft">
          {hero.meta.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              {i === 0 && <ShieldCheck className="w-4 h-4" />}
              {i === 1 && <Wifi className="w-4 h-4" />}
              <Html value={item} />
            </div>
          ))}
        </div>
      </section>

      {/* Network Diagram Illustration */}
      <section className="w-full glass border border-line rounded-3xl p-6 md:p-12 transition-all duration-500 overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none group-hover:from-accent/10 transition-colors duration-500" />
        <div className="relative max-w-4xl mx-auto flex flex-col items-center">
          
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 md:gap-2 relative py-6">
            
            {/* Desktop Connection Line Background */}
            <div className="hidden md:block absolute top-1/2 left-12 right-12 h-[2px] bg-line -z-0 -translate-y-1/2">
               {/* Active portion from Router to AP */}
               <div className="absolute top-0 left-1/3 right-1/3 h-full bg-accent" />
            </div>

            {/* Internet */}
            <div className="flex flex-col items-center gap-3 glass p-2 z-10">
              <div className="w-20 h-20 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shadow-inner relative">
                <Globe className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <span className="text-xs font-bold text-ink tracking-wide uppercase">Internet</span>
            </div>

            {/* Arrow 1: Internet -> Router */}
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-raised border border-line text-ink-soft shadow-xs z-10 shrink-0">
              <ArrowRight className="w-4 h-4 hidden md:block text-ink-soft" strokeWidth={2.5} />
              <ArrowDown className="w-4 h-4 md:hidden text-ink-soft" strokeWidth={2.5} />
            </div>

            {/* Modem/Router */}
            <div className="flex flex-col items-center gap-3 glass p-2 z-10">
              <div className="w-20 h-20 rounded-2xl bg-surface-raised border-2 border-line text-ink flex items-center justify-center relative">
                <RouterIcon className="w-10 h-10" strokeWidth={1.5} />
                <div className="absolute top-2 right-2 flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-success" />
                  <div className="w-1.5 h-1.5 rounded-full bg-success" />
                </div>
              </div>
              <span className="text-xs font-bold text-ink tracking-wide uppercase">Router</span>
            </div>

            {/* Arrow 2: Router -> Access Point (Ethernet) */}
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-accent/10 border-2 border-accent text-accent shadow-sm z-10 shrink-0">
              <ArrowRight className="w-5 h-5 hidden md:block" strokeWidth={2.5} />
              <ArrowDown className="w-5 h-5 md:hidden" strokeWidth={2.5} />
            </div>

            {/* Access Point */}
            <div className="flex flex-col items-center gap-3 glass p-2 z-10">
              <div className="relative w-24 h-24 rounded-full bg-accent text-on-accent flex items-center justify-center shadow-lg shadow-accent/20">
                <Wifi className="w-12 h-12" strokeWidth={1.5} />
                {/* Ping animation rings */}
                <div className="absolute inset-0 rounded-full border-2 border-accent animate-ping opacity-20 duration-[3000ms]" />
              </div>
              <span className="text-xs font-bold text-accent tracking-wide uppercase">Access Point</span>
            </div>

            {/* Arrow 3: Access Point -> Devices (Wi-Fi) */}
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10 border border-secondary/30 text-secondary shadow-xs z-10 shrink-0">
              <ArrowRight className="w-4 h-4 hidden md:block" strokeWidth={2.5} />
              <ArrowDown className="w-4 h-4 md:hidden" strokeWidth={2.5} />
            </div>

            {/* Devices */}
            <div className="flex flex-col items-center gap-3 glass p-2 z-10">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-surface-raised border-2 border-line text-ink flex items-center justify-center relative shadow-sm">
                  <Laptop className="w-7 h-7" strokeWidth={1.5} />
                  {/* Wireless wave indicator */}
                  <Wifi className="w-4 h-4 text-accent absolute -top-2 -left-2 glass rounded-full" strokeWidth={3} />
                </div>
                <div className="w-16 h-16 rounded-xl bg-surface-raised border-2 border-line text-ink flex items-center justify-center relative shadow-sm">
                  <Smartphone className="w-7 h-7" strokeWidth={1.5} />
                  <Wifi className="w-4 h-4 text-accent absolute -top-2 -right-2 glass rounded-full" strokeWidth={3} />
                </div>
              </div>
              <span className="text-xs font-bold text-ink tracking-wide uppercase">Devices</span>
            </div>

          </div>

          <p className="text-center text-sm text-ink-soft mt-8 md:mt-12">
            <em><Html value={ov.diagram.caption} /></em>
          </p>
        </div>
      </section>

      {/* Overview Content */}
      <section className="space-y-6 max-w-3xl mx-auto">
        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-widest uppercase text-secondary">
            {ov.eyebrow}
          </p>
          <h2 className="text-3xl font-bold text-ink">{ov.h2}</h2>
        </div>
        
        <p className="text-lg text-ink-soft leading-relaxed"><Html value={ov.intro} /></p>
        
        <div className="bg-surface-raised p-6 rounded-2xl text-ink leading-relaxed shadow-sm">
          <Html value={ov.p1} />
        </div>
        
        <blockquote className="border-s-4 border-accent ps-6 py-2 my-8 text-xl font-medium italic text-ink-soft bg-surface-raised/50 rounded-e-2xl">
          <Html value={ov.calloutP} />
        </blockquote>
        
        <p className="text-lg text-ink-soft leading-relaxed"><Html value={ov.p2} /></p>
      </section>
    </div>
  );
}
