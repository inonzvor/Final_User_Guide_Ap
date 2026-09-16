import { useViewModel } from '../useViewModel';
import { languageViewModel } from '../viewmodels';
import { getLocalizedModels, getLocalizedGlossary, getLocalizedFaq } from '../../../src';
import { Book, HelpCircle, Server, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

function Html({ value }: { value: string }) {
  return <span dangerouslySetInnerHTML={{ __html: value }} />;
}

export function ReferencePage() {
  const { lang } = useViewModel(languageViewModel);
  const models = getLocalizedModels(lang);
  const glossary = getLocalizedGlossary(lang);
  const faq = getLocalizedFaq(lang);

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openGlossary, setOpenGlossary] = useState<number | null>(null);

  const getImageForModel = (modelNumber: string) => {
    if (['DS-3WAP522-SI', 'DS-3WAP622G-SI', 'DS-3WAP622E-SI'].includes(modelNumber)) {
      return '/DS-3WAP522-SI DS-3WAP622G-SI DS-3WAP622E-SI.png';
    }
    return `/${modelNumber}.png`;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Models Compare Section */}
      <section className="border-b border-line py-8 md:py-20" id="models">
        <div className="grid gap-4 md:gap-8 border-b border-line pb-5 md:pb-7 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-8">
            <span className="hidden md:block font-mono text-[10px] font-bold text-accent uppercase tracking-widest">{models.eyebrow}</span>
            <h2 className="font-display mt-2 md:mt-4 max-w-[16ch] text-3xl sm:text-5xl md:text-6xl font-semibold leading-snug md:leading-tight text-ink uppercase">
              <Html value={models.h2} />
            </h2>
          </div>
          <p className="max-w-[34ch] text-sm leading-6 text-ink-soft lg:col-span-4">
            <Html value={models.intro} />
          </p>
        </div>

        <div className="mt-8 md:mt-14 grid gap-4 md:gap-6 sm:grid-cols-2">
          {models.models.map((m, i) => (
            <div key={i} className="flex flex-col border border-line bg-surface/30 hover:bg-surface/50 transition-colors rounded-2xl overflow-hidden">
              {/* Top Image Section */}
              <div className="w-full h-44 sm:h-56 bg-model-bg border-b border-line p-4 md:p-6 relative flex items-center justify-center overflow-hidden">
                {m.unverified && (
                  <span className="absolute top-3 md:top-4 end-3 md:end-4 bg-warn/10 text-warn-dark text-[9px] md:text-[10px] font-bold px-2 py-0.5 md:py-1 uppercase tracking-wider z-10 border border-warn/20 rounded-md">
                    Unverified
                  </span>
                )}
                {m.outdoor && (
                  <span className="absolute top-3 md:top-4 end-3 md:end-4 bg-info/10 text-info text-[9px] md:text-[10px] font-bold px-2 py-0.5 md:py-1 uppercase tracking-wider z-10 border border-info/20 rounded-md">
                    Outdoor
                  </span>
                )}
                
                <img 
                  src={getImageForModel(m.modelNumber)} 
                  alt={m.modelNumber} 
                  className="w-full h-full object-contain drop-shadow-xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden absolute inset-0 flex items-center justify-center text-ink-faint">
                  <Server className="w-10 h-10 opacity-50" />
                </div>
              </div>

              {/* Details Section */}
              <div className="p-5 md:p-6 flex flex-col flex-1">
                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4">
                  {m.tags.map((t, idx) => (
                    <span key={idx} className="bg-surface border border-line/60 text-ink-soft px-2 py-0.5 md:py-1 text-[9px] md:text-[10px] uppercase font-bold tracking-wider rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl md:text-2xl font-display font-semibold text-ink tracking-tight break-words mb-4 md:mb-6 uppercase">{m.modelNumber}</h3>

                {m.specs && (
                  <ul className="space-y-2.5 md:space-y-3 text-sm text-ink-soft mb-6 md:mb-8 flex-1">
                    <li className="flex items-start gap-2.5 md:gap-3">
                      <div className="w-1.5 h-1.5 bg-accent mt-1.5 shrink-0 rounded-sm" />
                      <span className="leading-tight"><Html value={m.specs.wifi} /></span>
                    </li>
                    <li className="flex items-start gap-2.5 md:gap-3">
                      <div className="w-1.5 h-1.5 bg-accent mt-1.5 shrink-0 rounded-sm" />
                      <span className="leading-tight"><Html value={m.specs.speed} /></span>
                    </li>
                    <li className="flex items-start gap-2.5 md:gap-3">
                      <div className="w-1.5 h-1.5 bg-accent mt-1.5 shrink-0 rounded-sm" />
                      <span className="leading-tight"><Html value={m.specs.ports} /></span>
                    </li>
                    <li className="flex items-start gap-2.5 md:gap-3">
                      <div className="w-1.5 h-1.5 bg-accent mt-1.5 shrink-0 rounded-sm" />
                      <span className="leading-tight"><Html value={m.specs.power} /></span>
                    </li>
                  </ul>
                )}
                
                <div className="bg-surface/50 px-3 md:px-4 py-2.5 md:py-3 text-sm font-medium text-ink-soft border-s-2 md:border border-accent/40 md:border-line mt-auto rounded-e-lg md:rounded-lg">
                  <Html value={m.bestFor} />
                </div>

                {m.note && (
                  <div className="text-sm text-warn-dark mt-3 md:mt-4 italic flex gap-2 items-start bg-warn/5 p-3 border-s-2 border-warn rounded-e-lg">
                    <Html value={m.note} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Glossary Section */}
      <section className="border-b border-line py-8 md:py-20" id="glossary">
        <div className="grid gap-4 md:gap-8 border-b border-line pb-5 md:pb-7 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span className="hidden md:block font-mono text-[10px] font-bold text-secondary uppercase tracking-widest">{glossary.eyebrow}</span>
            <h2 className="font-display mt-2 md:mt-4 max-w-[16ch] text-3xl sm:text-5xl md:text-6xl font-semibold leading-snug md:leading-tight text-ink uppercase flex items-center gap-3 md:gap-4">
              <Book className="w-7 h-7 sm:w-12 sm:h-12 text-secondary shrink-0" />
              <Html value={glossary.h2} />
            </h2>
          </div>
          <p className="max-w-[34ch] text-sm leading-6 text-ink-soft lg:col-span-4">
            <Html value={glossary.intro} />
          </p>
        </div>

        <div className="mt-8 md:mt-14 border border-line bg-surface/30 p-5 md:p-10 rounded-2xl">
          <dl className="divide-y divide-line/60 sm:divide-y-0 grid sm:grid-cols-2 sm:gap-x-8 md:gap-x-12 sm:gap-y-8 md:gap-y-12">
            {glossary.terms.map((t, i) => {
              const isOpen = openGlossary === i;
              return (
                <div key={i} className="py-3 sm:py-0 space-y-2 sm:space-y-3 md:space-y-4 first:pt-0 last:pb-0">
                  <dt className="text-lg md:text-xl font-display font-semibold text-ink uppercase tracking-tight">
                    <button
                      type="button"
                      onClick={() => setOpenGlossary(isOpen ? null : i)}
                      className="w-full flex items-center justify-between text-start sm:pointer-events-none focus-visible:outline-none"
                    >
                      <div className="flex items-center gap-2.5 md:gap-3">
                        <div className="w-2 h-2 bg-secondary rounded-sm shrink-0" />
                        <Html value={t.term} />
                      </div>
                      <div className={cn(
                        "sm:hidden w-7 h-7 flex items-center justify-center shrink-0 transition-colors border rounded-lg",
                        isOpen ? "border-secondary text-secondary bg-secondary/10" : "border-line text-ink-soft bg-surface/50"
                      )}>
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  </dt>
                  <dd className={cn(
                    "text-ink-soft text-sm leading-relaxed border-s-2 border-line ps-3 md:ps-4 transition-all duration-300",
                    isOpen ? "block mt-2" : "hidden sm:block"
                  )}>
                    <Html value={t.def} />
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 md:py-20 mb-12 md:mb-16" id="help">
        <div className="grid gap-4 md:gap-8 border-b border-line pb-5 md:pb-7 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span className="hidden md:block font-mono text-[10px] font-bold text-accent uppercase tracking-widest">{faq.eyebrow}</span>
            <h2 className="font-display mt-2 md:mt-4 max-w-[16ch] text-3xl sm:text-5xl md:text-6xl font-semibold leading-snug md:leading-tight text-ink uppercase flex items-center gap-3 md:gap-4">
              <HelpCircle className="w-7 h-7 sm:w-12 sm:h-12 text-accent shrink-0" />
              <Html value={faq.h2} />
            </h2>
          </div>
          <p className="max-w-[34ch] text-sm leading-6 text-ink-soft lg:col-span-4">
            <Html value={faq.intro} />
          </p>
        </div>

        <div className="mt-8 md:mt-14 space-y-3 md:space-y-4">
          {faq.items.map((q, i) => {
            const isOpen = openFaq === i;
            return (
              <div 
                key={i} 
                className={cn(
                  "border-2 rounded-2xl transition-all duration-300 overflow-hidden",
                  isOpen ? "bg-surface-raised shadow-md border-accent" : "bg-surface border-line hover:border-ink/40"
                )}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full text-start px-4 py-4 md:px-6 md:py-6 flex items-center justify-between gap-4 focus-visible:outline-none"
                >
                  <strong className="text-lg md:text-xl font-display font-semibold text-ink uppercase tracking-tight">{q.title}</strong>
                  <div className={cn(
                    "w-7 h-7 md:w-8 md:h-8 flex items-center justify-center shrink-0 transition-colors border rounded-lg",
                    isOpen ? "border-accent text-accent bg-accent/10" : "border-ink-soft text-ink-soft bg-surface/50"
                  )}>
                    {isOpen ? <Minus className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                  </div>
                </button>
                <div className={cn(
                  "px-4 md:px-6 text-ink-soft leading-relaxed transition-all duration-300 ease-in-out origin-top",
                  isOpen ? "pb-6 md:pb-8 opacity-100 h-auto" : "h-0 opacity-0 py-0 overflow-hidden"
                )}>
                  <div className="prose prose-sm dark:prose-invert max-w-2xl prose-a:text-accent prose-a:no-underline hover:prose-a:underline space-y-3 md:space-y-4 border-s-2 border-accent ps-3 md:ps-4 ms-1 md:ms-2">
                    {q.body.map((p, k) => (
                      <p key={k}><Html value={p} /></p>
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
