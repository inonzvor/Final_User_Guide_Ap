import { useViewModel } from '../useViewModel';
import { languageViewModel } from '../viewmodels';
import { getLocalizedModels, getLocalizedGlossary, getLocalizedFaq } from '../../../src';
import { Server, HelpCircle, Book, Plus, Minus, Cpu } from 'lucide-react';
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-20">
      
      {/* Models Section */}
      <section className="space-y-8 max-w-5xl mx-auto" id="models">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent">
            <Html value={models.eyebrow} />
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-ink"><Html value={models.h2} /></h2>
          <p className="text-lg text-ink-soft max-w-2xl mx-auto"><Html value={models.intro} /></p>
        </div>

        <div className="flex flex-col gap-6">
          {models.models.map((m, i) => (
            <div key={i} className="glass border border-line rounded-3xl p-6 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row gap-6 md:gap-8 group relative overflow-hidden">
              {m.unverified && (
                <span className="absolute top-4 end-4 bg-warn/10 text-warn-dark text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider z-10">
                  Unverified
                </span>
              )}
              {m.outdoor && (
                <span className="absolute top-4 end-4 bg-info/10 text-info text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider z-10">
                  Outdoor
                </span>
              )}

              {/* Product Image */}
              <div className="w-full md:w-64 h-48 md:h-auto shrink-0 bg-ink/5 rounded-2xl border border-line/50 flex items-center justify-center p-6 relative overflow-hidden group-hover:bg-ink/10 transition-colors">
                <img 
                  src={getImageForModel(m.modelNumber)} 
                  alt={m.modelNumber} 
                  className="w-full h-full object-contain drop-shadow-2xl filter group-hover:scale-105 transition-transform duration-500"
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

              {/* Product Details */}
              <div className="flex-1 flex flex-col py-2">
                <h3 className="text-2xl font-bold text-ink font-mono tracking-tight break-words mb-3">{m.modelNumber}</h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {m.tags.map((t, idx) => (
                    <span key={idx} className="bg-surface-raised border border-line text-ink-soft px-2.5 py-1 rounded-md text-xs uppercase font-semibold tracking-wide">
                      {t}
                    </span>
                  ))}
                </div>

                {m.specs && (
                  <ul className="grid sm:grid-cols-2 gap-y-2 gap-x-6 mb-6 text-sm text-ink-soft">
                    <li className="flex items-start gap-2">
                      <span className="opacity-50 mt-0.5 w-4 shrink-0">•</span>
                      <span className="leading-tight"><Html value={m.specs.wifi} /></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="opacity-50 mt-0.5 w-4 shrink-0">•</span>
                      <span className="leading-tight"><Html value={m.specs.speed} /></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="opacity-50 mt-0.5 w-4 shrink-0">•</span>
                      <span className="leading-tight"><Html value={m.specs.ports} /></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="opacity-50 mt-0.5 w-4 shrink-0">•</span>
                      <span className="leading-tight"><Html value={m.specs.power} /></span>
                    </li>
                  </ul>
                )}
                
                <div className="bg-surface-raised/50 px-4 py-3 rounded-xl text-sm font-medium text-ink-soft border border-line mt-auto">
                  <Html value={m.bestFor} />
                </div>

                {m.note && (
                  <div className="text-sm text-warn-dark mt-4 italic flex gap-2 items-start bg-warn/5 p-3 rounded-lg border border-warn/10">
                    <Html value={m.note} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-line max-w-4xl mx-auto" />

      {/* Glossary Section */}
      <section className="space-y-8 max-w-3xl mx-auto" id="glossary">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-secondary">
            <Html value={glossary.eyebrow} />
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-ink flex items-center justify-center gap-3">
            <Book className="w-8 h-8 text-secondary" />
            <Html value={glossary.h2} />
          </h2>
          <p className="text-lg text-ink-soft"><Html value={glossary.intro} /></p>
        </div>

        <div className="glass border border-line rounded-3xl p-6 md:p-10 transition-shadow">
          <dl className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
            {glossary.terms.map((t, i) => (
              <div key={i} className="space-y-2">
                <dt className="text-lg font-bold text-ink flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-secondary rounded-full shrink-0" />
                  <Html value={t.term} />
                </dt>
                <dd className="text-ink-soft text-sm leading-relaxed ps-3.5">
                  <Html value={t.def} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <hr className="border-line max-w-4xl mx-auto" />

      {/* FAQ Section */}
      <section className="space-y-8 max-w-3xl mx-auto" id="help">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent">
            <Html value={faq.eyebrow} />
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-ink flex items-center justify-center gap-3">
            <HelpCircle className="w-8 h-8 text-accent" />
            <Html value={faq.h2} />
          </h2>
          <p className="text-lg text-ink-soft"><Html value={faq.intro} /></p>
        </div>

        <div className="space-y-4">
          {faq.items.map((q, i) => {
            const isOpen = openFaq === i;
            return (
              <div 
                key={i} 
                className={cn(
                  "glass border rounded-2xl overflow-hidden transition-all duration-300",
                  isOpen ? "border-accent scale-[1.01]" : "border-line hover:border-accent/50"
                )}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full text-start px-6 py-5 flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                >
                  <strong className="text-lg text-ink font-medium">{q.title}</strong>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors",
                    isOpen ? "bg-accent text-on-accent" : "bg-surface-raised text-ink-soft"
                  )}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <div className={cn(
                  "px-6 text-ink-soft leading-relaxed transition-all duration-300 ease-in-out origin-top",
                  isOpen ? "pb-6 opacity-100 h-auto" : "h-0 opacity-0 py-0 overflow-hidden"
                )}>
                  <div className="prose prose-sm dark:prose-invert max-w-none prose-a:text-accent prose-a:no-underline hover:prose-a:underline space-y-4">
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
