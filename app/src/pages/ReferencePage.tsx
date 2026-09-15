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

  const getImageForModel = (modelNumber: string) => {
    if (['DS-3WAP522-SI', 'DS-3WAP622G-SI', 'DS-3WAP622E-SI'].includes(modelNumber)) {
      return '/DS-3WAP522-SI DS-3WAP622G-SI DS-3WAP622E-SI.png';
    }
    return `/${modelNumber}.png`;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Models Compare Section */}
      <section className="border-b border-line py-12 md:py-20" id="models">
        <div className="grid gap-8 border-b border-line pb-7 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span className="font-mono text-[10px] font-bold text-accent uppercase tracking-widest">{models.eyebrow}</span>
            <h2 className="font-display mt-4 max-w-[16ch] text-4xl font-semibold leading-none sm:text-5xl md:text-6xl text-ink uppercase">
              <Html value={models.h2} />
            </h2>
          </div>
          <p className="max-w-[34ch] text-sm leading-6 text-ink-soft lg:col-span-4">
            <Html value={models.intro} />
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {models.models.map((m, i) => (
            <div key={i} className="flex flex-col border border-line bg-surface/30 hover:bg-surface/50 transition-colors">
              {/* Top Image Section */}
              <div className="w-full h-56 bg-model-bg border-b border-line p-6 relative flex items-center justify-center overflow-hidden">
                {m.unverified && (
                  <span className="absolute top-4 right-4 bg-warn/10 text-warn-dark text-[10px] font-bold px-2 py-1 uppercase tracking-wider z-10 border border-warn/20 rounded-md">
                    Unverified
                  </span>
                )}
                {m.outdoor && (
                  <span className="absolute top-4 right-4 bg-info/10 text-info text-[10px] font-bold px-2 py-1 uppercase tracking-wider z-10 border border-info/20 rounded-md">
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
              <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  {m.tags.map((t, idx) => (
                    <span key={idx} className="bg-surface border border-line text-ink-soft px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-2xl font-display font-semibold text-ink tracking-tight break-words mb-6 uppercase">{m.modelNumber}</h3>

                {m.specs && (
                  <ul className="space-y-3 text-sm text-ink-soft mb-8 flex-1">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-accent mt-1.5 shrink-0 rounded-sm" />
                      <span className="leading-tight"><Html value={m.specs.wifi} /></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-accent mt-1.5 shrink-0 rounded-sm" />
                      <span className="leading-tight"><Html value={m.specs.speed} /></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-accent mt-1.5 shrink-0 rounded-sm" />
                      <span className="leading-tight"><Html value={m.specs.ports} /></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-accent mt-1.5 shrink-0 rounded-sm" />
                      <span className="leading-tight"><Html value={m.specs.power} /></span>
                    </li>
                  </ul>
                )}
                
                <div className="bg-surface/50 px-4 py-3 text-sm font-medium text-ink-soft border border-line mt-auto rounded-lg">
                  <Html value={m.bestFor} />
                </div>

                {m.note && (
                  <div className="text-sm text-warn-dark mt-4 italic flex gap-2 items-start bg-warn/5 p-3 border-l-2 border-warn rounded-r-lg">
                    <Html value={m.note} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Glossary Section */}
      <section className="border-b border-line py-12 md:py-20" id="glossary">
        <div className="grid gap-8 border-b border-line pb-7 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span className="font-mono text-[10px] font-bold text-secondary uppercase tracking-widest">{glossary.eyebrow}</span>
            <h2 className="font-display mt-4 max-w-[16ch] text-4xl font-semibold leading-none sm:text-5xl md:text-6xl text-ink uppercase flex items-center gap-4">
              <Book className="w-8 h-8 sm:w-12 sm:h-12 text-secondary" />
              <Html value={glossary.h2} />
            </h2>
          </div>
          <p className="max-w-[34ch] text-sm leading-6 text-ink-soft lg:col-span-4">
            <Html value={glossary.intro} />
          </p>
        </div>

        <div className="mt-14 border border-line bg-surface/30 p-6 md:p-10 rounded-2xl">
          <dl className="grid sm:grid-cols-2 gap-x-12 gap-y-12">
            {glossary.terms.map((t, i) => (
              <div key={i} className="space-y-4">
                <dt className="text-xl font-display font-semibold text-ink flex items-center gap-3 uppercase tracking-tight">
                  <div className="w-2 h-2 bg-secondary rounded-sm" />
                  <Html value={t.term} />
                </dt>
                <dd className="text-ink-soft text-sm leading-relaxed border-l-2 border-line pl-4">
                  <Html value={t.def} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 mb-16" id="help">
        <div className="grid gap-8 border-b border-line pb-7 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span className="font-mono text-[10px] font-bold text-accent uppercase tracking-widest">{faq.eyebrow}</span>
            <h2 className="font-display mt-4 max-w-[16ch] text-4xl font-semibold leading-none sm:text-5xl md:text-6xl text-ink uppercase flex items-center gap-4">
              <HelpCircle className="w-8 h-8 sm:w-12 sm:h-12 text-accent" />
              <Html value={faq.h2} />
            </h2>
          </div>
          <p className="max-w-[34ch] text-sm leading-6 text-ink-soft lg:col-span-4">
            <Html value={faq.intro} />
          </p>
        </div>

        <div className="mt-14 space-y-4">
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
                  className="w-full text-start px-6 py-6 flex items-center justify-between gap-4 focus-visible:outline-none"
                >
                  <strong className="text-xl font-display font-semibold text-ink uppercase tracking-tight">{q.title}</strong>
                  <div className={cn(
                    "w-8 h-8 flex items-center justify-center shrink-0 transition-colors border rounded-lg",
                    isOpen ? "border-accent text-accent bg-accent/10" : "border-ink-soft text-ink-soft bg-surface/50"
                  )}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <div className={cn(
                  "px-6 text-ink-soft leading-relaxed transition-all duration-300 ease-in-out origin-top",
                  isOpen ? "pb-8 opacity-100 h-auto" : "h-0 opacity-0 py-0 overflow-hidden"
                )}>
                  <div className="prose prose-sm dark:prose-invert max-w-2xl prose-a:text-accent prose-a:no-underline hover:prose-a:underline space-y-4 border-l-2 border-accent pl-4 ml-2">
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
