import { useViewModel } from '../useViewModel';
import { languageViewModel, installPromptViewModel } from '../viewmodels';
import { getLocalizedPower, getLocalizedSetupIntro, getLocalizedChecklist, getLocalizedSetupGuide, getLocalizedInstallCopy } from '../../../src';
import { Zap, AlertTriangle, CheckCircle2, Cable, Plug, Plus, Minus, Download } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { SectionHead } from '../components/SectionHead';

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
      <section className="space-y-8" id="power">
        <SectionHead
          eyebrow={<Html value={power.eyebrow} />}
          title={<Html value={power.h2} />}
          description={<Html value={power.intro} />}
        />

        {power.warnCallout && (
          <div className="border border-warn/30 border-s-2 border-s-warn p-6 flex gap-4">
            <AlertTriangle className="w-5 h-5 shrink-0 text-warn mt-0.5" />
            <div className="text-ink-soft text-sm">
              <Html value={power.warnCallout} />
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-px bg-line border border-line">
          {/* PoE Card */}
          <div className="bg-bg p-8 flex flex-col hover:bg-surface transition-colors duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className="w-11 h-11 border border-line flex items-center justify-center text-ink">
                <Cable className="w-5 h-5" />
              </div>
              <span className="label-tag">01</span>
            </div>
            <h3 className="text-xl font-bold text-ink mb-1 uppercase tracking-tight"><Html value={power.poe.title} /></h3>
            <p className="label-tag mb-4"><Html value={power.poe.kicker} /></p>
            <div className="space-y-3 text-ink-soft text-sm mb-6 flex-1">
              <p><Html value={power.poe.p1} /></p>
              <p><Html value={power.poe.p2} /></p>
            </div>
            <div className="border-s-2 border-line ps-4 text-xs text-ink-soft italic">
              <Html value={power.poe.tip} />
            </div>
          </div>

          {/* Adapter Card */}
          <div className="bg-bg p-8 flex flex-col hover:bg-surface transition-colors duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className="w-11 h-11 border border-line flex items-center justify-center text-ink">
                <Plug className="w-5 h-5" />
              </div>
              <span className="label-tag">02</span>
            </div>
            <h3 className="text-xl font-bold text-ink mb-1 uppercase tracking-tight"><Html value={power.adapter.title} /></h3>
            <p className="label-tag mb-4"><Html value={power.adapter.kicker} /></p>
            <div className="space-y-3 text-ink-soft text-sm mb-6 flex-1">
              <p><Html value={power.adapter.p1} /></p>
              <p><Html value={power.adapter.p2} /></p>
            </div>
            <div className="border-s-2 border-line ps-4 text-xs text-ink-soft italic">
              <Html value={power.adapter.tip} />
            </div>
          </div>
        </div>
      </section>

      {/* Setup Guide Section */}
      <section className="space-y-12" id="setup">
        <SectionHead
          eyebrow={<Html value={intro.eyebrow} />}
          title={<Html value={intro.h2} />}
          description={<Html value={intro.intro} />}
          action={
            installState.buttonVisible && (
              <button
                onClick={() => installPromptViewModel.promptInstall()}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-strong text-on-accent px-5 py-2.5 text-sm font-medium uppercase tracking-wide transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <Download className="w-4 h-4" />
                {installCopy.button}
              </button>
            )
          }
        />

        {/* Checklist */}
        <div className="border border-line p-6 md:p-10">
          <h3 className="text-xl font-bold text-ink mb-6 flex items-center gap-3 uppercase tracking-tight">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <Html value={checklist.title} />
          </h3>
          <p className="label-tag mb-4"><Html value={checklist.kicker} /></p>
          <ul className="grid sm:grid-cols-2 gap-4">
            {checklist.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-ink-soft min-w-0">
                <div className="w-1.5 h-1.5 bg-success mt-2 shrink-0" />
                <span className="leading-relaxed break-words min-w-0"><Html value={item} /></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Phases */}
        <div className="border border-line divide-y divide-line">
          {phases.map((phase, i) => {
            const isOpen = openPhase === i;
            return (
              <div key={i} className="relative">
                <button
                  onClick={() => setOpenPhase(isOpen ? null : i)}
                  className={cn(
                    "w-full flex items-center justify-between gap-4 p-6 md:p-8 text-start focus-visible:outline-none focus-visible:bg-surface-raised transition-colors",
                    isOpen && "bg-surface"
                  )}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={cn(
                      "w-12 h-12 md:w-14 md:h-14 border font-bold text-lg md:text-xl flex items-center justify-center shrink-0 transition-colors",
                      isOpen ? "bg-accent text-on-accent border-accent" : "border-line text-ink-soft"
                    )}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xl md:text-2xl font-bold text-ink break-words uppercase tracking-tight"><Html value={phase.title} /></h4>
                      {phase.sub && <p className="text-sm md:text-base text-ink-soft mt-1 break-words"><Html value={phase.sub} /></p>}
                    </div>
                  </div>
                  <div className={cn(
                    "w-9 h-9 border flex items-center justify-center shrink-0 transition-colors",
                    isOpen ? "border-ink text-ink" : "border-line text-ink-soft"
                  )}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <div className={cn(
                  "transition-all duration-300 ease-in-out origin-top bg-surface",
                  isOpen ? "opacity-100 h-auto pb-6 md:pb-8" : "h-0 opacity-0 overflow-hidden"
                )}>
                  <div className="space-y-4 px-4 md:px-8">
                    {phase.steps.map((step, j) => (
                      <div key={j} className="border border-line p-5 md:p-6 bg-bg">
                        <div className="flex gap-4">
                          <div className="w-8 h-8 border border-line text-ink-soft font-mono text-xs flex items-center justify-center shrink-0">
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
                                "p-4 mt-4 text-sm flex gap-3 border",
                                step.detailVariant === 'caution'
                                  ? "text-warn-dark border-warn/30"
                                  : "text-info border-info/30"
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
