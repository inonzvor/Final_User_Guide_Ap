import { useViewModel } from '../useViewModel';
import { languageViewModel, installPromptViewModel } from '../viewmodels';
import { getLocalizedPower, getLocalizedSetupIntro, getLocalizedChecklist, getLocalizedSetupGuide, getLocalizedInstallCopy } from '../../../src';
import { Zap, AlertTriangle, CheckCircle2, Cable, Plug, Plus, Minus, Download } from 'lucide-react';
import { useState } from 'react';
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
  const [openPhase, setOpenPhase] = useState<number | null>(null);
  const installState = useViewModel(installPromptViewModel);
  const installCopy = getLocalizedInstallCopy(lang);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-16">
      
      {/* Power Section */}
      <section className="space-y-8 max-w-4xl mx-auto" id="power">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent">
            <Html value={power.eyebrow} />
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-ink"><Html value={power.h2} /></h2>
          <p className="text-lg text-ink-soft max-w-2xl mx-auto"><Html value={power.intro} /></p>
        </div>

        {power.warnCallout && (
          <div className="bg-warn/10 border border-warn/20 rounded-2xl p-6 flex gap-4 text-warn-dark">
            <AlertTriangle className="w-6 h-6 shrink-0 text-warn" />
            <div className="text-ink-soft text-sm">
              <Html value={power.warnCallout} />
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 pt-4">
          {/* PoE Card */}
          <div className="glass border border-line rounded-3xl p-8 flex flex-col hover:border-accent/50 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6">
              <Cable className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-ink mb-2"><Html value={power.poe.title} /></h3>
            <p className="text-accent font-medium text-sm mb-4"><Html value={power.poe.kicker} /></p>
            <div className="space-y-3 text-ink-soft text-sm mb-6 flex-1">
              <p><Html value={power.poe.p1} /></p>
              <p><Html value={power.poe.p2} /></p>
            </div>
            <div className="glass rounded-xl p-4 text-xs text-ink-soft italic border-s-2 border-accent">
              <Html value={power.poe.tip} />
            </div>
          </div>

          {/* Adapter Card */}
          <div className="glass border border-line rounded-3xl p-8 flex flex-col hover:border-secondary/50 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6">
              <Plug className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-ink mb-2"><Html value={power.adapter.title} /></h3>
            <p className="text-secondary font-medium text-sm mb-4"><Html value={power.adapter.kicker} /></p>
            <div className="space-y-3 text-ink-soft text-sm mb-6 flex-1">
              <p><Html value={power.adapter.p1} /></p>
              <p><Html value={power.adapter.p2} /></p>
            </div>
            <div className="glass rounded-xl p-4 text-xs text-ink-soft italic border-s-2 border-secondary">
              <Html value={power.adapter.tip} />
            </div>
          </div>
        </div>
      </section>

      <hr className="border-line max-w-4xl mx-auto" />

      {/* Setup Guide Section */}
      <section className="space-y-12 max-w-4xl mx-auto" id="setup">
        <div className="space-y-4">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent">
            <Html value={intro.eyebrow} />
          </p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-ink"><Html value={intro.h2} /></h2>
            {installState.buttonVisible && (
              <button
                onClick={() => installPromptViewModel.promptInstall()}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-strong text-on-accent px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <Download className="w-4 h-4" />
                {installCopy.button}
              </button>
            )}
          </div>
          <p className="text-lg text-ink-soft leading-relaxed max-w-2xl"><Html value={intro.intro} /></p>
        </div>

        {/* Checklist */}
        <div className="glass border border-line rounded-3xl p-6 md:p-10 transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 rtl:left-0 ltr:right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -translate-y-1/2 group-hover:bg-success/10 pointer-events-none transition-colors duration-500" />
          <h3 className="text-xl font-bold text-ink mb-6 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-success" />
            <Html value={checklist.title} />
          </h3>
          <p className="text-sm text-ink-soft mb-4 font-medium"><Html value={checklist.kicker} /></p>
          <ul className="grid sm:grid-cols-2 gap-4">
            {checklist.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-ink-soft min-w-0">
                <div className="w-1.5 h-1.5 rounded-full bg-success mt-2 shrink-0" />
                <span className="leading-relaxed break-words min-w-0"><Html value={item} /></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Phases */}
        <div className="space-y-6 pt-8 relative">
          {phases.map((phase, i) => {
            const isOpen = openPhase === i;
            return (
              <div key={i} className={cn(
                "relative z-10 glass border rounded-3xl transition-all duration-300 overflow-hidden",
                isOpen ? "border-accent scale-[1.01]" : "border-line hover:border-accent/50"
              )}>
                <button
                  onClick={() => setOpenPhase(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 md:p-8 text-start focus-visible:outline-none focus-visible:bg-ink/5 transition-colors rounded-3xl"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={cn(
                      "w-12 h-12 md:w-14 md:h-14 rounded-2xl font-bold text-lg md:text-xl flex items-center justify-center shrink-0 transition-colors",
                      isOpen ? "bg-accent text-on-accent/20" : "glass text-ink-soft"
                    )}>
                      {i + 1}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xl md:text-2xl font-bold text-ink break-words"><Html value={phase.title} /></h4>
                      {phase.sub && <p className="text-sm md:text-base text-ink-soft mt-1 break-words"><Html value={phase.sub} /></p>}
                    </div>
                  </div>
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors",
                    isOpen ? "bg-accent/10 text-accent" : "glass text-ink-soft"
                  )}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>

                <div className={cn(
                  "transition-all duration-300 ease-in-out origin-top",
                  isOpen ? "opacity-100 h-auto pb-6 md:pb-8" : "h-0 opacity-0 overflow-hidden"
                )}>
                  <div className="space-y-6 px-4 md:px-8">
                    {phase.steps.map((step, j) => (
                      <div key={j} className="glass border border-line rounded-2xl p-5 md:p-6">
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full glass text-ink-soft font-semibold text-sm flex items-center justify-center shrink-0 border border-line">
                            {i + 1}.{j + 1}
                          </div>
                          <div className="flex-1 space-y-3 min-w-0">
                            <strong className="block text-lg text-ink break-words"><Html value={step.title} /></strong>
                            {step.body.map((p, k) => (
                              <p key={k} className="text-ink-soft leading-relaxed break-words">
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
                                <div className="leading-relaxed opacity-90 break-words"><Html value={step.detail} /></div>
                              </div>
                            )}
                            <StepIllustration stepId={step.id} className="mt-4" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
