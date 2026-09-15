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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Section */}
      <section className="py-8 md:py-24 border-b border-line">
        <div className="grid gap-6 md:gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="hidden md:block font-mono text-[10px] font-bold text-accent uppercase tracking-widest mb-4">
              {hero.eyebrow}
            </p>
            <h1 className="font-display text-4xl sm:text-7xl lg:text-8xl font-semibold leading-[.9] md:leading-[.85] tracking-tight text-ink max-w-[15ch] uppercase">
              <Html value={hero.h1} />
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-base md:text-xl text-ink-soft mb-4 md:mb-6 leading-relaxed">
              <Html value={hero.sub} />
            </p>
            <div className="flex flex-col gap-4">
              {/* Badges hidden on mobile to avoid duplicate marketing layer */}
              <div className="hidden md:flex flex-wrap gap-3">
                {hero.badges.map((badge, i) => (
                  <span key={i} className="inline-flex items-center bg-accent text-on-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
                    {badge}
                  </span>
                ))}
              </div>
              {/* Meta row hidden on mobile, visible on desktop */}
              <div className="hidden md:flex flex-wrap gap-6 pt-4 text-xs font-mono uppercase text-ink-soft border-t border-line">
                {hero.meta.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {i === 0 && <ShieldCheck className="w-4 h-4 text-accent" />}
                    {i === 1 && <Wifi className="w-4 h-4 text-accent" />}
                    <Html value={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network Diagram Illustration */}
      <section className="py-8 md:py-24 border-b border-line group">
        <div className="grid gap-4 md:gap-8 border-b border-line pb-5 md:pb-7 lg:grid-cols-12 lg:items-end mb-6 md:mb-14">
          <div className="lg:col-span-8">
            <span className="hidden md:block font-mono text-[10px] font-bold text-accent uppercase tracking-widest">
              {ov.diagram.ariaLabel}
            </span>
            <h2 className="font-display mt-2 md:mt-4 max-w-[16ch] text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight md:leading-none text-ink uppercase">
              <Html value={ov.h2} />
            </h2>
          </div>
          <p className="max-w-[34ch] text-sm leading-6 text-ink-soft lg:col-span-4">
            <Html value={ov.intro} />
          </p>
        </div>

        <div className="w-full bg-surface/40 border-y md:border border-line py-6 px-4 md:p-12 transition-all duration-500 overflow-hidden relative md:rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none group-hover:from-accent/10 transition-colors duration-500" />
          <div className="hidden md:block absolute start-0 top-0 border-b border-e border-line px-4 py-3 font-mono text-[9px] text-ink-soft">SHEET 01 / DIAGRAM</div>
          
          <div className="relative max-w-4xl mx-auto flex flex-col items-center mt-2 md:mt-8 w-full">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full gap-2 md:gap-2 relative py-2 md:py-6">
              
              {/* Internet */}
              <div className="flex flex-col items-center text-center z-10 relative w-full md:w-32">
                <div className="grid size-14 md:size-24 place-items-center border border-accent/40 bg-accent/5 mb-1.5 md:mb-5 rounded-xl">
                  <Globe className="w-6 h-6 md:w-8 md:h-8 text-ink" strokeWidth={1.5} />
                </div>
                <span className="hidden md:block font-mono text-[9px] text-accent">NODE / 01</span>
                <b className="font-display mt-0.5 md:mt-2 text-sm md:text-lg text-ink uppercase tracking-tight"><Html value={ov.diagram.internet} /></b>
              </div>

              {/* Arrow 1 */}
              <div className="flex items-center justify-center py-1 md:py-0 md:h-24 text-ink-soft z-10 shrink-0 relative">
                <ArrowDown className="w-4 h-4 md:hidden text-ink-soft/60" strokeWidth={1.5} />
                <div className="hidden md:flex items-center justify-center w-10 h-10 bg-bg rounded-full border border-line">
                  <ArrowRight className="w-5 h-5 rtl:rotate-180" strokeWidth={1.5} />
                </div>
              </div>

              {/* Modem/Router */}
              <div className="flex flex-col items-center text-center z-10 relative w-full md:w-32">
                <div className="grid size-14 md:size-24 place-items-center border border-accent/40 bg-accent/5 mb-1.5 md:mb-5 rounded-xl">
                  <RouterIcon className="w-6 h-6 md:w-8 md:h-8 text-ink" strokeWidth={1.5} />
                </div>
                <span className="hidden md:block font-mono text-[9px] text-accent">NODE / 02</span>
                <b className="font-display mt-0.5 md:mt-2 text-sm md:text-lg text-ink uppercase tracking-tight"><Html value={ov.diagram.router} /></b>
              </div>

              {/* Arrow 2 */}
              <div className="flex items-center justify-center py-1 md:py-0 md:h-24 text-accent z-10 shrink-0 relative">
                <ArrowDown className="w-4 h-4 md:hidden text-accent" strokeWidth={2} />
                <div className="hidden md:flex items-center justify-center w-10 h-10 bg-bg rounded-full border border-accent/40 shadow-sm">
                  <ArrowRight className="w-5 h-5 rtl:rotate-180" strokeWidth={2} />
                </div>
              </div>

              {/* Access Point */}
              <div className="flex flex-col items-center text-center z-10 relative w-full md:w-32">
                <div className="grid size-14 md:size-24 place-items-center border border-accent bg-accent mb-1.5 md:mb-5 relative rounded-xl">
                  <Wifi className="w-6 h-6 md:w-8 md:h-8 text-on-accent" strokeWidth={1.5} />
                  <div className="hidden md:block absolute inset-0 border border-accent animate-ping opacity-20 duration-[3000ms] rounded-xl" />
                </div>
                <span className="hidden md:block font-mono text-[9px] text-accent">NODE / 03</span>
                <b className="font-display mt-0.5 md:mt-2 text-sm md:text-lg text-accent uppercase tracking-tight"><Html value={ov.diagram.ap} /></b>
              </div>

              {/* Arrow 3 */}
              <div className="flex items-center justify-center py-1 md:py-0 md:h-24 text-ink-soft z-10 shrink-0 relative">
                <ArrowDown className="w-4 h-4 md:hidden text-ink-soft/60" strokeWidth={1.5} />
                <div className="hidden md:flex items-center justify-center w-10 h-10 bg-bg rounded-full border border-line">
                  <ArrowRight className="w-5 h-5 rtl:rotate-180" strokeWidth={1.5} />
                </div>
              </div>

              {/* Devices */}
              <div className="flex flex-col items-center text-center z-10 relative w-full md:w-32">
                <div className="grid size-14 md:size-24 place-items-center border border-accent/40 bg-accent/5 mb-1.5 md:mb-5 relative rounded-xl">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Laptop className="w-4 h-4 md:w-5 md:h-5 text-ink" strokeWidth={1.5} />
                    <Smartphone className="w-3.5 h-3.5 md:w-4 md:h-4 text-ink" strokeWidth={1.5} />
                  </div>
                </div>
                <span className="hidden md:block font-mono text-[9px] text-accent">NODE / 04</span>
                <b className="font-display mt-0.5 md:mt-2 text-sm md:text-lg text-ink uppercase tracking-tight">Devices</b>
              </div>

            </div>
            
            <p className="text-center text-xs md:text-sm font-mono text-ink-soft mt-4 md:mt-8 border-t border-line pt-3 md:pt-4 w-full">
              <Html value={ov.diagram.caption} />
            </p>
          </div>
        </div>
      </section>

      {/* Overview Content */}
      <section className="py-8 md:py-24">
        <div className="grid gap-4 md:gap-8 border-b border-line pb-5 md:pb-7 lg:grid-cols-12 lg:items-end mb-6 md:mb-14">
          <div className="lg:col-span-8">
            <span className="hidden md:block font-mono text-[10px] font-bold text-secondary uppercase tracking-widest">{ov.eyebrow}</span>
            <h2 className="font-display mt-2 md:mt-4 max-w-[16ch] text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight md:leading-none text-ink uppercase">
              <Html value={ov.h2} />
            </h2>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          <div className="space-y-6 md:space-y-8">
            <div className="bg-surface/50 p-5 md:p-8 border border-line text-ink leading-relaxed rounded-2xl">
              <Html value={ov.p1} />
            </div>
          </div>
          <div className="space-y-6 md:space-y-8">
            <blockquote className="border-s-4 border-accent ps-4 md:ps-6 py-2 text-lg md:text-2xl font-display font-medium text-ink bg-surface/30 pe-4 md:pe-6 rounded-e-2xl">
              <Html value={ov.calloutP} />
            </blockquote>
            <p className="text-base md:text-lg text-ink-soft leading-relaxed"><Html value={ov.p2} /></p>
          </div>
        </div>
      </section>
      
    </div>
  );
}
