const fs = require('fs');

const oldClasses = /"border border-ink\/20 rounded-2xl transition-all duration-300 overflow-hidden",\n                  isOpen \? "bg-surface\/40 shadow-sm border-accent\/40" : "bg-surface\/10 hover:bg-surface\/30 hover:border-ink\/40"/g;

const newClasses = `"border-2 rounded-2xl transition-all duration-300 overflow-hidden",
                  isOpen ? "bg-surface-raised shadow-md border-accent" : "bg-surface border-line hover:border-ink/40"`;

let guideContent = fs.readFileSync('app/src/pages/GuidePage.tsx', 'utf8');
guideContent = guideContent.replace(oldClasses, newClasses);
fs.writeFileSync('app/src/pages/GuidePage.tsx', guideContent);

let refContent = fs.readFileSync('app/src/pages/ReferencePage.tsx', 'utf8');
refContent = refContent.replace(oldClasses, newClasses);
fs.writeFileSync('app/src/pages/ReferencePage.tsx', refContent);
