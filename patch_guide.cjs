const fs = require('fs');
let content = fs.readFileSync('app/src/pages/GuidePage.tsx', 'utf8');

// Hide CHECKLIST decor on mobile
content = content.replace(
  /<div className="absolute start-0 top-0 border-b border-e border-line px-4 py-3 font-mono text-\[9px\] text-ink-soft rounded-ee-2xl">CHECKLIST<\/div>/g,
  '<div className="hidden md:block absolute start-0 top-0 border-b border-e border-line px-4 py-3 font-mono text-[9px] text-ink-soft rounded-ee-2xl">CHECKLIST</div>'
);

// Reduce indentation on mobile for steps
content = content.replace(
  /<div className="ms-11 border-l border-line ps-6 py-2 space-y-12">/g,
  '<div className="md:ms-11 md:border-l border-line md:ps-6 py-2 space-y-8 md:space-y-12">'
);

// Hide step dot on mobile
content = content.replace(
  /<div className="absolute -start-\[30px\] top-1 w-2 h-2 rounded-full bg-accent ring-4 ring-surface" \/>/g,
  '<div className="hidden md:block absolute -start-[30px] top-1 w-2 h-2 rounded-full bg-accent ring-4 ring-surface" />'
);

// Hide STEP N decor on mobile
content = content.replace(
  /<h4 className="font-mono text-\[10px\] font-bold text-accent uppercase tracking-widest mb-3">STEP {step.number}<\/h4>/g,
  '<h4 className="hidden md:block font-mono text-[10px] font-bold text-accent uppercase tracking-widest mb-3">STEP {step.number}</h4>'
);

// Hide 01, 02 phase numbers on mobile
content = content.replace(
  /<span className="font-mono text-sm font-bold text-accent">0\{i \+ 1\}<\/span>/g,
  '<span className="hidden sm:inline font-mono text-sm font-bold text-accent">0{i + 1}</span>'
);

fs.writeFileSync('app/src/pages/GuidePage.tsx', content);
