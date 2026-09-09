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

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-20">
      
      {/* Models Section */}
      <section className="space-y-8 max-w-5xl mx-auto" id="models">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent">
            {models.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-ink">{models.h2}</h2>
          <p className="text-lg text-ink-soft max-w-2xl mx-auto">{models.intro}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {models.models.map((m, i) => (
            <div key={i} className="bg-surface border border-line rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col group relative">
              {m.unverified && (
                <span className="absolute top-4 end-4 bg-warn/10 text-warn-dark text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                  Unverified
                </span>
              )}
              {m.outdoor && (
                <span className="absolute top-4 end-4 bg-info/10 text-info text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                  Outdoor
                </span>
              )}
              <div className="w-10 h-10 rounded-xl bg-surface-raised border border-line text-ink-soft flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-on-accent transition-colors">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-ink font-mono tracking-tight">{m.modelNumber}</h3>
              
              <div className="flex flex-wrap gap-1 my-3">
                {m.tags.map((t, idx) => (
                  <span key={idx} className="bg-surface-raised border border-line text-ink-soft px-2 py-0.5 rounded text-[10px] uppercase font-medium tracking-wide">
                    {t}
                  </span>
                ))}
              </div>

              {m.specs && (
                <ul className="space-y-2 flex-1 mb-4 text-sm text-ink-soft mt-2">
                  <li className="flex items-start gap-2">
                    <span className="opacity-50 mt-0.5 w-4">•</span>
                    <span className="leading-tight"><Html value={m.specs.wifi} /></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="opacity-50 mt-0.5 w-4">•</span>
                    <span className="leading-tight"><Html value={m.specs.speed} /></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="opacity-50 mt-0.5 w-4">•</span>
                    <span className="leading-tight"><Html value={m.specs.ports} /></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="opacity-50 mt-0.5 w-4">•</span>
                    <span className="leading-tight"><Html value={m.specs.power} /></span>
                  </li>
                </ul>
              )}
              
              <div className="bg-surface-raised px-3 py-2 rounded-lg text-xs font-medium text-ink-soft border border-line mt-auto">
                <Html value={m.bestFor} />
              </div>

              {m.note && (
                <div className="text-xs text-warn-dark mt-3 italic">
                  <Html value={m.note} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <hr className="border-line max-w-4xl mx-auto" />

      {/* Glossary Section */}
      <section className="space-y-8 max-w-3xl mx-auto" id="glossary">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-secondary">
            {glossary.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-ink flex items-center justify-center gap-3">
            <Book className="w-8 h-8 text-secondary" />
            {glossary.h2}
          </h2>
          <p className="text-lg text-ink-soft">{glossary.intro}</p>
        </div>

        <div className="bg-surface border border-line rounded-3xl p-6 md:p-10 shadow-sm">
          <dl className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
            {glossary.terms.map((t, i) => (
              <div key={i} className="space-y-2">
                <dt className="text-lg font-bold text-ink flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-secondary rounded-full" />
                  {t.term}
                </dt>
                <dd className="text-ink-soft text-sm leading-relaxed ps-3.5">
                  {t.def}
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
            {faq.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-ink flex items-center justify-center gap-3">
            <HelpCircle className="w-8 h-8 text-accent" />
            {faq.h2}
          </h2>
          <p className="text-lg text-ink-soft">{faq.intro}</p>
        </div>

        <div className="space-y-4">
          {faq.items.map((q, i) => {
            const isOpen = openFaq === i;
            return (
              <div 
                key={i} 
                className={cn(
                  "bg-surface border rounded-2xl overflow-hidden transition-colors",
                  isOpen ? "border-accent shadow-sm" : "border-line hover:border-accent/50"
                )}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:bg-surface-raised"
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
