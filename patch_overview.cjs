const fs = require('fs');
let content = fs.readFileSync('app/src/pages/OverviewPage.tsx', 'utf8');

// Hide SHEET 01 decor on mobile
content = content.replace(
  /<div className="absolute start-0 top-0 border-b border-e border-line px-4 py-3 font-mono text-\[9px\] text-ink-soft">SHEET 01 \/ DIAGRAM<\/div>/g,
  '<div className="hidden md:block absolute start-0 top-0 border-b border-e border-line px-4 py-3 font-mono text-[9px] text-ink-soft">SHEET 01 / DIAGRAM</div>'
);

// Hide NODE / 01 etc on mobile
content = content.replace(
  /<span className="font-mono text-\[9px\] text-accent">NODE \/ 01<\/span>/g,
  '<span className="hidden md:block font-mono text-[9px] text-accent">NODE / 01</span>'
);
content = content.replace(
  /<span className="font-mono text-\[9px\] text-accent">NODE \/ 02<\/span>/g,
  '<span className="hidden md:block font-mono text-[9px] text-accent">NODE / 02</span>'
);
content = content.replace(
  /<span className="font-mono text-\[9px\] text-accent">NODE \/ 03<\/span>/g,
  '<span className="hidden md:block font-mono text-[9px] text-accent">NODE / 03</span>'
);
content = content.replace(
  /<span className="font-mono text-\[9px\] text-accent">NODE \/ 04<\/span>/g,
  '<span className="hidden md:block font-mono text-[9px] text-accent">NODE / 04</span>'
);

// Optimize diagram container spacing for mobile
content = content.replace(
  /className="w-full bg-surface\/40 border border-line p-6 md:p-12 transition-all duration-500 overflow-hidden relative"/g,
  'className="w-full bg-surface/40 border-y md:border border-line py-8 px-4 md:p-12 transition-all duration-500 overflow-hidden relative"'
);

// Increase gap between diagram items on mobile slightly to prevent them from squishing, or actually make them layout horizontally with horizontal scroll?
// Wait, the user said "make everything more organized and concise". 
// The diagram is currently column on mobile: `flex flex-col md:flex-row items-center md:items-start justify-between w-full gap-6 md:gap-2 relative py-6`

fs.writeFileSync('app/src/pages/OverviewPage.tsx', content);
