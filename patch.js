const fs = require('fs');
let content = fs.readFileSync('app/src/pages/OverviewPage.tsx', 'utf8');

// Fix Arrow 1 and 3 (ink-soft)
content = content.replace(
  /<div className="flex items-center justify-center w-8 h-8 md:h-24 text-ink-soft z-10 shrink-0">\s*<ArrowRight className="w-4 h-4 hidden md:block rtl:rotate-180" strokeWidth=\{2\} \/>\s*<ArrowDown className="w-4 h-4 md:hidden" strokeWidth=\{2\} \/>\s*<\/div>/g,
  `<div className="flex items-center justify-center w-8 h-8 md:h-24 text-ink-soft z-10 shrink-0 relative">
                <div className="flex items-center justify-center w-10 h-10 bg-surface rounded-full border border-line">
                  <ArrowRight className="w-5 h-5 hidden md:block rtl:rotate-180" strokeWidth={1.5} />
                  <ArrowDown className="w-5 h-5 md:hidden" strokeWidth={1.5} />
                </div>
              </div>`
);

// Fix Arrow 2 (accent)
content = content.replace(
  /<div className="flex items-center justify-center w-8 h-8 md:h-24 text-accent z-10 shrink-0">\s*<ArrowRight className="w-4 h-4 hidden md:block rtl:rotate-180" strokeWidth=\{2\} \/>\s*<ArrowDown className="w-4 h-4 md:hidden" strokeWidth=\{2\} \/>\s*<\/div>/g,
  `<div className="flex items-center justify-center w-8 h-8 md:h-24 text-accent z-10 shrink-0 relative">
                <div className="flex items-center justify-center w-10 h-10 bg-surface rounded-full border border-accent/30 shadow-[0_0_15px_rgba(var(--color-accent),0.2)]">
                  <ArrowRight className="w-5 h-5 hidden md:block rtl:rotate-180" strokeWidth={2} />
                  <ArrowDown className="w-5 h-5 md:hidden" strokeWidth={2} />
                </div>
              </div>`
);

fs.writeFileSync('app/src/pages/OverviewPage.tsx', content);
