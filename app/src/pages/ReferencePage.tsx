import { useViewModel } from '../useViewModel';
import { languageViewModel } from '../viewmodels';
import { getLocalizedModels, getLocalizedGlossary, getLocalizedFaq } from '../../../src';
import { Server, HelpCircle, Book, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { SectionHead } from '../components/SectionHead';

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
      <section className="space-y-8" id="models">
        <SectionHead eyebrow={<Html value={models.eyebrow} />} title={<Html value={models.h2} />} description={models.intro} />

        <div className="flex flex-col gap-px bg-line border border-line">
          {models.models.map((m, i) => (
            <div key={i} className="bg-bg p-6 hover:bg-surface transition-colors duration-300 flex flex-col md:flex-row gap-6 md:gap-8 relative">
              {(m.unverified || m.outdoor) && (
                <span className={cn(
                  "absolute top-4 end-4 text-[10px] font-mono px-2 py-1 uppercase tracking-wider z-10 border",
                  m.unverified ? "text-warn-dark border-warn/40" : "text-info border-info/40"
                )}>
                  {m.unverified ? 'Unverified' : 'Outdoor'}
                </span>
              )}

              {/* Product Image */}
              <div className="w-full md:w-64 h-48 md:h-auto shrink-0 border border-line bg-surface flex items-center justify-center p-6 relative overflow-hidden">
                <img
                  src={getImageForModel(m.modelNumber)}
                  alt={m.modelNumber}
                  className="w-full h-full object-contain"
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
              <div className="flex-1 flex flex-col py-2 min-w-0">
                <h3 className="text-2xl font-bold text-ink font-mono tracking-tight break-words mb-3">{m.modelNumber}</h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {m.tags.map((t, idx) => (
                    <span key={idx} className="label-chip">
                      {t}
                    </span>
                  ))}
                </div>

                {m.specs && (
                  <ul className="grid sm:grid-cols-2 gap-y-2 gap-x-6 mb-6 text-sm text-ink-soft">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-ink-faint mt-2 shrink-0" />
                      <span className="leading-tight"><Html value={m.specs.wifi} /></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-ink-faint mt-2 shrink-0" />
                      <span className="leading-tight"><Html value={m.specs.speed} /></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-ink-faint mt-2 shrink-0" />
                      <span className="leading-tight"><Html value={m.specs.ports} /></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-ink-faint mt-2 shrink-0" />
                      <span className="leading-tight"><Html value={m.specs.power} /></span>
                    </li>
                  </ul>
                )}

                <div className="border border-line px-4 py-3 text-sm font-medium text-ink-soft mt-auto">
                  <Html value={m.bestFor} />
                </div>

                {m.note && (
                  <div className="text-sm text-warn-dark mt-4 italic flex gap-2 items-start border-s-2 border-warn/40 ps-3">
                    <Html value={m.note} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Glossary Section */}
      <section className="space-y-8" id="glossary">
        <SectionHead
          eyebrow={glossary.eyebrow}
          title={
            <span className="inline-flex items-center gap-3">
              <Book className="w-7 h-7 md:w-9 md:h-9" />
              <Html value={glossary.h2} />
            </span>
          }
          description={glossary.intro}
        />

        <div className="border border-line p-6 md:p-10">
          <dl className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
            {glossary.terms.map((t, i) => (
              <div key={i} className="space-y-2">
                <dt className="text-lg font-bold text-ink flex items-center gap-3">
                  <div className="w-1.5 h-4 bg-ink-faint shrink-0" />
                  <Html value={t.term} />
                </dt>
                <dd className="text-ink-soft text-sm leading-relaxed ps-[1.125rem]">
                  <Html value={t.def} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-8" id="help">
        <SectionHead
          eyebrow={faq.eyebrow}
          title={
            <span className="inline-flex items-center gap-3">
              <HelpCircle className="w-7 h-7 md:w-9 md:h-9" />
              <Html value={faq.h2} />
            </span>
          }
          description={faq.intro}
        />

        <div className="border border-line divide-y divide-line">
          {faq.items.map((q, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className={cn("transition-colors duration-300", isOpen && "bg-surface")}>
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full text-start px-6 py-5 flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                >
                  <strong className="text-lg text-ink font-medium">{q.title}</strong>
                  <div className={cn(
                    "w-8 h-8 border flex items-center justify-center shrink-0 transition-colors",
                    isOpen ? "bg-accent text-on-accent border-accent" : "border-line text-ink-soft"
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
