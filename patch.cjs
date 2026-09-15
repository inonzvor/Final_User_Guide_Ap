const fs = require('fs');

let guideContent = fs.readFileSync('app/src/pages/GuidePage.tsx', 'utf8');
guideContent = guideContent.replace(
  /"border border-line rounded-2xl transition-all duration-300 overflow-hidden",\n                  isOpen \? "bg-surface\/40 shadow-sm" : "bg-surface\/10 hover:bg-surface\/30 hover:border-ink-soft\/30"/g,
  '"border border-ink/20 rounded-2xl transition-all duration-300 overflow-hidden",\n                  isOpen ? "bg-surface/40 shadow-sm border-accent/40" : "bg-surface/10 hover:bg-surface/30 hover:border-ink/40"'
);
fs.writeFileSync('app/src/pages/GuidePage.tsx', guideContent);

let refContent = fs.readFileSync('app/src/pages/ReferencePage.tsx', 'utf8');
refContent = refContent.replace(
  /"border border-line rounded-2xl transition-all duration-300 overflow-hidden",\n                  isOpen \? "bg-surface\/40 shadow-sm" : "bg-surface\/10 hover:bg-surface\/30 hover:border-ink-soft\/30"/g,
  '"border border-ink/20 rounded-2xl transition-all duration-300 overflow-hidden",\n                  isOpen ? "bg-surface/40 shadow-sm border-accent/40" : "bg-surface/10 hover:bg-surface/30 hover:border-ink/40"'
);
fs.writeFileSync('app/src/pages/ReferencePage.tsx', refContent);
