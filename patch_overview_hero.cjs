const fs = require('fs');
let content = fs.readFileSync('app/src/pages/OverviewPage.tsx', 'utf8');

// Hide decorative metadata string on mobile
content = content.replace(
  /<div className="flex flex-wrap gap-6 pt-4 text-xs font-mono uppercase text-ink-soft border-t border-line">/g,
  '<div className="hidden md:flex flex-wrap gap-6 pt-4 text-xs font-mono uppercase text-ink-soft border-t border-line">'
);

fs.writeFileSync('app/src/pages/OverviewPage.tsx', content);
