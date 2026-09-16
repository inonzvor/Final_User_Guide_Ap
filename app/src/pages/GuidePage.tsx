import { useViewModel } from '../useViewModel';
import { languageViewModel, installPromptViewModel } from '../viewmodels';
import { getLocalizedPower, getLocalizedSetupIntro, getLocalizedChecklist, getLocalizedSetupGuide, getLocalizedInstallCopy, getLocalizedNav } from '../../../src';
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
  const navStrings = getLocalizedNav(lang);
  
  const [openPhase, setOpenPhase] = useState<number | null>(null);
  const [openPoe, setOpenPoe] = useState<boolean>(false);
  const [openAdapter, setOpenAdapter] = useState<boolean>(false);
  const [openChecklist, setOpenChecklist] = useState<boolean>(false);
  
  const installState = useViewModel(installPromptViewModel);
  const installCopy = getLocalizedInstallCopy(lang);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Power Section */}
      <section className="py-8 md:py-24 border-b border-line" id="power">
        <div className="grid gap-4 md:gap-8 lg:grid-cols-12 lg:items-end mb-6 md:mb-14">
          <div className="lg:col-span-8">
            <span className="hidden md:block font-mono text-[10px] font-bold text-accent uppercase tracking-widest">{power.eyebrow}</span>
            <h2 className="font-display mt-2 md:mt-4 max-w-[16ch] text-3xl sm:text-5xl md:text-6xl font-semibold leading-snug md:leading-tight text-ink uppercase">
              <Html value={power.h2} />
            </h2>
          </div>
          <p className="max-w-[34ch] text-sm leading-6 text-ink-soft lg:col-span-4">
            <Html value={power.intro} />
          </p>
        </div>

        {power.warnCallout && (
          <div className="bg-warn/10 border-s-4 md:border border-warn/30 p-4 md:p-6 flex gap-3 md:gap-4 text-warn-dark mb-8 md:mb-12 rounded-e-2xl md:rounded-2xl">
            <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-warn mt-0.5" />
            <div className="text-ink-soft text-sm leading-relaxed">
              <Html value={power.warnCallout} />
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {/* PoE Card */}
          <div className="border border-line p-5 md:p-8 flex flex-col hover:border-accent/50 hover:bg-surface/30 transition-all duration-300 rounded-2xl">
            <button
              type="button"
              onClick={() => setOpenPoe(prev => !prev)}
              className="w-full flex items-center justify-between text-start md:pointer-events-none focus-visible:outline-none"
            >
              <div className="flex items-center gap-3.5 md:block">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/10 flex items-center justify-center text-accent md:mb-6 border-0 md:border border-accent/20 rounded-xl shrink-0">
                  <Cable className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg md:text-xl font-bold text-ink md:mb-2 uppercase tracking-tight"><Html value={power.poe.title} /></h3>
                  <p className="hidden md:block font-mono text-accent font-medium text-[10px] uppercase tracking-wider mb-4"><Html value={power.poe.kicker} /></p>
                </div>
              </div>
              <div className={cn(
                "md:hidden w-7 h-7 flex items-center justify-center shrink-0 transition-colors border rounded-lg",
                openPoe ? "border-accent text-accent bg-accent/10" : "border-line text-ink-soft bg-surface/50"
              )}>
                {openPoe ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </div>
            </button>
            <div className={cn(
              "flex-col flex-1 transition-all duration-300",
              openPoe ? "flex mt-4 md:mt-0" : "hidden md:flex md:mt-0"
            )}>
              <div className="space-y-2.5 md:space-y-3 text-ink-soft text-sm mb-5 md:mb-6 flex-1 leading-relaxed">
                <p><Html value={power.poe.p1} /></p>
                <p><Html value={power.poe.p2} /></p>
              </div>
              <div className="bg-surface/50 p-3 md:p-4 text-xs text-ink-soft italic border-s-2 border-accent rounded-e-lg">
                <Html value={power.poe.tip} />
              </div>
            </div>
          </div>

          {/* Adapter Card */}
          <div className="border border-line p-5 md:p-8 flex flex-col hover:border-secondary/50 hover:bg-surface/30 transition-all duration-300 rounded-2xl">
            <button
              type="button"
              onClick={() => setOpenAdapter(prev => !prev)}
              className="w-full flex items-center justify-between text-start md:pointer-events-none focus-visible:outline-none"
            >
              <div className="flex items-center gap-3.5 md:block">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/10 flex items-center justify-center text-secondary md:mb-6 border-0 md:border border-secondary/20 rounded-xl shrink-0">
                  <Plug className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg md:text-xl font-bold text-ink md:mb-2 uppercase tracking-tight"><Html value={power.adapter.title} /></h3>
                  <p className="hidden md:block font-mono text-secondary font-medium text-[10px] uppercase tracking-wider mb-4"><Html value={power.adapter.kicker} /></p>
                </div>
              </div>
              <div className={cn(
                "md:hidden w-7 h-7 flex items-center justify-center shrink-0 transition-colors border rounded-lg",
                openAdapter ? "border-secondary text-secondary bg-secondary/10" : "border-line text-ink-soft bg-surface/50"
              )}>
                {openAdapter ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </div>
            </button>
            <div className={cn(
              "flex-col flex-1 transition-all duration-300",
              openAdapter ? "flex mt-4 md:mt-0" : "hidden md:flex md:mt-0"
            )}>
              <div className="space-y-2.5 md:space-y-3 text-ink-soft text-sm mb-5 md:mb-6 flex-1 leading-relaxed">
                <p><Html value={power.adapter.p1} /></p>
                <p><Html value={power.adapter.p2} /></p>
              </div>
              <div className="bg-surface/50 p-3 md:p-4 text-xs text-ink-soft italic border-s-2 border-secondary mt-auto rounded-e-lg">
                <Html value={power.adapter.tip} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Intro & Checklist */}
      <section className="py-8 md:py-24 border-b border-line" id="guide">
        <div className="grid gap-4 md:gap-8 lg:grid-cols-12 lg:items-end mb-6 md:mb-14">
          <div className="lg:col-span-8">
            <span className="hidden md:block font-mono text-[10px] font-bold text-secondary uppercase tracking-widest">{intro.eyebrow}</span>
            <h2 className="font-display mt-2 md:mt-4 max-w-[16ch] text-3xl sm:text-5xl md:text-6xl font-semibold leading-snug md:leading-tight text-ink uppercase">
              <Html value={intro.h2} />
            </h2>
          </div>
          <p className="max-w-[34ch] text-sm leading-6 text-ink-soft lg:col-span-4">
            <Html value={intro.intro} />
          </p>
        </div>

        <div className="bg-surface/40 border border-line p-5 md:p-12 relative overflow-hidden rounded-2xl">
          <div className="hidden md:block absolute start-0 top-0 border-b border-e border-line px-4 py-3 font-mono text-[9px] text-ink-soft rounded-ee-2xl">CHECKLIST</div>
          <button
            type="button"
            onClick={() => setOpenChecklist(prev => !prev)}
            className="w-full flex items-center justify-between text-start md:pointer-events-none focus-visible:outline-none md:mt-4 md:mb-8"
          >
            <h3 className="font-display text-xl md:text-2xl font-bold text-ink uppercase"><Html value={checklist.title} /></h3>
            <div className={cn(
              "md:hidden w-7 h-7 flex items-center justify-center shrink-0 transition-colors border rounded-lg",
              openChecklist ? "border-secondary text-secondary bg-secondary/10" : "border-line text-ink-soft bg-surface/50"
            )}>
              {openChecklist ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            </div>
          </button>
          <ul className={cn(
            "grid sm:grid-cols-2 gap-y-3 md:gap-y-4 gap-x-8 mt-4 md:mt-0",
            openChecklist ? "grid" : "hidden md:grid"
          )}>
            {checklist.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-ink-soft text-sm leading-relaxed"><Html value={item} /></span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Phases / Steps */}
      <section className="py-8 md:py-24" id="phases">
        <div className="grid gap-4 md:gap-8 lg:grid-cols-12 lg:items-end mb-6 md:mb-14">
          <div className="lg:col-span-8">
            <span className="hidden md:block font-mono text-[10px] font-bold text-accent uppercase tracking-widest">{navStrings.setup}</span>
            <h2 className="font-display mt-2 md:mt-4 max-w-[16ch] text-3xl sm:text-5xl md:text-6xl font-semibold leading-snug md:leading-tight text-ink uppercase">
              <Html value={navStrings.groupGuide} />
            </h2>
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          {phases.map((phase, i) => {
            const isOpen = openPhase === i;
            return (
              <div 
                key={i} 
                className={cn(
                  "border-2 rounded-2xl transition-all duration-300 overflow-hidden",
                  isOpen ? "bg-surface-raised shadow-md border-accent" : "bg-surface border-line hover:border-ink/40"
                )}
              >
                <button
                  onClick={() => setOpenPhase(isOpen ? null : i)}
                  className="w-full text-start px-4 py-5 md:px-6 md:py-8 flex items-center justify-between gap-4 focus-visible:outline-none"
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <span className="hidden sm:inline font-mono text-sm font-bold text-accent">0{i + 1}</span>
                    <div>
                      <h3 className="font-display text-lg sm:text-2xl font-bold text-ink uppercase tracking-tight"><Html value={phase.title} /></h3>
                    </div>
                  </div>
                  <div className={cn(
                    "w-7 h-7 md:w-8 md:h-8 flex items-center justify-center shrink-0 transition-colors border rounded-lg",
                    isOpen ? "border-accent text-accent bg-accent/10" : "border-ink-soft text-ink-soft bg-surface/50"
                  )}>
                    {isOpen ? <Minus className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                  </div>
                </button>
                <div className={cn(
                  "px-4 md:px-6 transition-all duration-300 ease-in-out origin-top",
                  isOpen ? "pb-6 md:pb-8 opacity-100 h-auto" : "h-0 opacity-0 py-0 overflow-hidden"
                )}>
                  <div className="md:ms-11 md:border-s border-line md:ps-6 py-2 space-y-6 md:space-y-12">
                    {phase.steps.map((step, k) => (
                      <div key={k} className="relative">
                        <div className="hidden md:block absolute -start-[30px] top-1 w-2 h-2 rounded-full bg-accent ring-4 ring-surface" />
                        <h4 className="hidden md:block font-mono text-[10px] font-bold text-accent uppercase tracking-widest mb-3">STEP {step.number}</h4>
                        <div className="prose prose-sm dark:prose-invert max-w-2xl prose-a:text-accent prose-a:no-underline hover:prose-a:underline text-ink-soft leading-relaxed">
                          <p><strong className="font-display text-base md:text-lg text-ink font-semibold uppercase"><Html value={step.title} /></strong></p>
                          {step.body.map((p, pIdx) => <p key={pIdx}><Html value={p} /></p>)}
                        </div>
                        <div className="mt-4 md:mt-6">
                          <StepIllustration stepId={step.id} />
                        </div>
                        {step.detail && (
                          <div className={cn(
                            "mt-4 md:mt-6 bg-surface/50 p-3 md:p-4 text-sm italic border-s-2 rounded-e-lg",
                            step.detailVariant === 'caution' ? "border-warn text-warn-dark bg-warn/10" : "border-line text-ink-soft"
                          )}>
                            <Html value={step.detail} />
                          </div>
                        )}
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
