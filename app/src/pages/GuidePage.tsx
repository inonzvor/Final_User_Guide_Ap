import { useViewModel } from '../useViewModel';
import { languageViewModel } from '../viewmodels';
import { getLocalizedPower, getLocalizedSetupIntro, getLocalizedChecklist, getLocalizedSetupGuide } from '../../../src';
import { Zap, AlertTriangle, CheckCircle2, Cable, Plug } from 'lucide-react';
import { cn } from '../lib/utils';

import { StepIllustration } from '../components/Illustrations';

function Html({ value }: { value: string }) {
  return <span dangerouslySetInnerHTML={{ __html: value }} />;
}

export function GuidePage() {
  const { lang } = useViewModel(languageViewModel);
  const power = getLocalizedPower(lang);
  const intro = getLocalizedSetupIntro(lang);
  const checklist = getLocalizedChecklist(lang);
  const phases = getLocalizedSetupGuide(lang);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-16">
      
      {/* Power Section */}
      <section className="space-y-8 max-w-4xl mx-auto" id="power">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent">
            {power.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-ink">{power.h2}</h2>
          <p className="text-lg text-ink-soft max-w-2xl mx-auto">{power.intro}</p>
        </div>

        {power.warnCallout && (
          <div className="bg-warn/10 border border-warn/20 rounded-2xl p-6 flex gap-4 text-warn-dark shadow-sm">
            <AlertTriangle className="w-6 h-6 shrink-0 text-warn" />
            <div className="text-ink-soft text-sm">
              <Html value={power.warnCallout} />
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 pt-4">
          {/* PoE Card */}
          <div className="bg-surface border border-line rounded-3xl p-8 shadow-sm flex flex-col hover:border-accent/50 transition-colors">
            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6">
              <Cable className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-ink mb-2">{power.poe.title}</h3>
            <p className="text-accent font-medium text-sm mb-4">{power.poe.kicker}</p>
            <div className="space-y-3 text-ink-soft text-sm mb-6 flex-1">
              <p>{power.poe.p1}</p>
              <p>{power.poe.p2}</p>
            </div>
            <div className="bg-surface-raised rounded-xl p-4 text-xs text-ink-soft italic border-s-2 border-accent">
              {power.poe.tip}
            </div>
          </div>

          {/* Adapter Card */}
          <div className="bg-surface border border-line rounded-3xl p-8 shadow-sm flex flex-col hover:border-secondary/50 transition-colors">
            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6">
              <Plug className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-ink mb-2">{power.adapter.title}</h3>
            <p className="text-secondary font-medium text-sm mb-4">{power.adapter.kicker}</p>
            <div className="space-y-3 text-ink-soft text-sm mb-6 flex-1">
              <p>{power.adapter.p1}</p>
              <p>{power.adapter.p2}</p>
            </div>
            <div className="bg-surface-raised rounded-xl p-4 text-xs text-ink-soft italic border-s-2 border-secondary">
              {power.adapter.tip}
            </div>
          </div>
        </div>
      </section>

      <hr className="border-line max-w-4xl mx-auto" />

      {/* Setup Guide Section */}
      <section className="space-y-12 max-w-4xl mx-auto" id="setup">
        <div className="space-y-4">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent">
            {intro.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-ink">{intro.h2}</h2>
          <p className="text-lg text-ink-soft leading-relaxed max-w-2xl">{intro.intro}</p>
        </div>

        {/* Checklist */}
        <div className="bg-surface border border-line rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 rtl:left-0 ltr:right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
          <h3 className="text-xl font-bold text-ink mb-6 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-success" />
            {checklist.title}
          </h3>
          <p className="text-sm text-ink-soft mb-4 font-medium">{checklist.kicker}</p>
          <ul className="grid sm:grid-cols-2 gap-4">
            {checklist.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-ink-soft">
                <div className="w-1.5 h-1.5 rounded-full bg-success mt-2 shrink-0" />
                <span className="leading-relaxed"><Html value={item} /></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Phases */}
        <div className="space-y-16 pt-8 relative">
          {/* Connecting line for phases on desktop */}
          <div className="hidden md:block absolute ltr:left-[27px] rtl:right-[27px] top-4 bottom-12 w-0.5 bg-line z-0" />
          
          {phases.map((phase, i) => (
            <div key={i} className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-accent text-on-accent font-bold text-xl flex items-center justify-center shadow-lg shadow-accent/20 shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-ink">{phase.title}</h4>
                  {phase.sub && <p className="text-ink-soft mt-1">{phase.sub}</p>}
                </div>
              </div>

              <div className="space-y-6 md:px-20">
                {phase.steps.map((step, j) => (
                  <div key={j} className="bg-surface border border-line rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-surface-raised text-ink-soft font-semibold text-sm flex items-center justify-center shrink-0 border border-line">
                        {i + 1}.{j + 1}
                      </div>
                      <div className="flex-1 space-y-3">
                        <strong className="block text-lg text-ink">{step.title}</strong>
                        {step.body.map((p, k) => (
                          <p key={k} className="text-ink-soft leading-relaxed">
                            <Html value={p} />
                          </p>
                        ))}
                        
                        {step.detail && (
                          <div className={cn(
                            "rounded-xl p-4 mt-4 text-sm flex gap-3",
                            step.detailVariant === 'caution' 
                              ? "bg-warn/10 text-warn-dark border border-warn/20" 
                              : "bg-info/10 text-info border border-info/20"
                          )}>
                            {step.detailVariant === 'caution' 
                              ? <AlertTriangle className="w-5 h-5 shrink-0 text-warn" />
                              : <Zap className="w-5 h-5 shrink-0 text-info" />
                            }
                            <div className="leading-relaxed opacity-90"><Html value={step.detail} /></div>
                          </div>
                        )}
                        <StepIllustration stepId={step.id} className="mt-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
