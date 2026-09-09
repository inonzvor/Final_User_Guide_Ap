import { useViewModel } from '../useViewModel';
import { languageViewModel } from '../viewmodels';
import { getLocalizedHero, getLocalizedOverview } from '../../../src';
import { ShieldCheck, Wifi, ArrowRightLeft } from 'lucide-react';
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
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink">
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
      <section className="w-full bg-surface border border-line rounded-3xl p-6 md:p-12 shadow-sm overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <svg viewBox="0 0 800 400" className="w-full h-auto text-ink-soft" aria-hidden="true">
            {/* Simple network diagram: Internet -> Router -> AP -> Devices */}
            <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {/* Internet */}
              <circle cx="100" cy="200" r="40" className="text-secondary fill-secondary/10" />
              <path d="M70 200 A30 30 0 0 1 130 200" />
              <path d="M80 185 A45 45 0 0 1 120 185" />
              
              {/* Lines */}
              <path d="M140 200 L 260 200" className="stroke-accent" strokeDasharray="4 4" />
              
              {/* Router */}
              <rect x="260" y="160" width="80" height="80" rx="12" className="text-ink fill-surface" />
              <path d="M280 140 L280 160 M320 140 L320 160" />
              <circle cx="300" cy="200" r="12" className="text-accent" />
              
              {/* Lines */}
              <path d="M340 200 L 460 200" className="stroke-accent stroke-[3px]" />
              
              {/* AP */}
              <circle cx="500" cy="200" r="40" className="text-accent fill-surface" strokeWidth="3" />
              <path d="M500 160 A40 40 0 0 1 500 240" />
              
              {/* Wireless Signals */}
              <path d="M560 170 A100 100 0 0 1 560 230" className="text-secondary opacity-40" />
              <path d="M580 150 A130 130 0 0 1 580 250" className="text-secondary opacity-20" />
              
              {/* Devices */}
              <rect x="660" y="100" width="60" height="40" rx="4" className="fill-surface" />
              <path d="M670 140 L710 140 L720 150 L660 150 Z" className="fill-ink text-ink" />
              
              <rect x="670" y="220" width="30" height="50" rx="6" className="fill-surface" />
            </g>
          </svg>
          <p className="text-center text-sm text-ink-soft mt-6">
            <em>{ov.diagram.caption}</em>
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
        
        <p className="text-lg text-ink-soft leading-relaxed">{ov.intro}</p>
        
        <div className="bg-surface-raised p-6 rounded-2xl text-ink leading-relaxed shadow-sm">
          <Html value={ov.p1} />
        </div>
        
        <blockquote className="border-s-4 border-accent ps-6 py-2 my-8 text-xl font-medium italic text-ink-soft bg-surface-raised/50 rounded-e-2xl">
          {ov.calloutP}
        </blockquote>
        
        <p className="text-lg text-ink-soft leading-relaxed">{ov.p2}</p>
      </section>
    </div>
  );
}
