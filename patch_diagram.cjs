const fs = require('fs');
let content = fs.readFileSync('app/src/pages/OverviewPage.tsx', 'utf8');

// The container for the diagram
content = content.replace(
  /<div className="relative max-w-4xl mx-auto flex flex-col items-center mt-8">/g,
  '<div className="relative max-w-4xl mx-auto flex flex-col items-center mt-4 md:mt-8 w-full overflow-x-auto pb-6">'
);

content = content.replace(
  /<div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full gap-6 md:gap-2 relative py-6">/g,
  '<div className="flex flex-row items-center md:items-start justify-between min-w-[600px] md:min-w-0 w-full gap-4 md:gap-2 relative py-6 px-4 md:px-0">'
);

// All ArrowDown should be hidden, ArrowRight should always show
content = content.replace(
  /<ArrowRight className="w-5 h-5 hidden md:block rtl:rotate-180" strokeWidth=\{1\.5\} \/>\s*<ArrowDown className="w-5 h-5 md:hidden" strokeWidth=\{1\.5\} \/>/g,
  '<ArrowRight className="w-5 h-5 rtl:rotate-180" strokeWidth={1.5} />'
);

content = content.replace(
  /<ArrowRight className="w-5 h-5 hidden md:block rtl:rotate-180" strokeWidth=\{2\} \/>\s*<ArrowDown className="w-5 h-5 md:hidden" strokeWidth=\{2\} \/>/g,
  '<ArrowRight className="w-5 h-5 rtl:rotate-180" strokeWidth={2} />'
);

// Make the boxes a bit smaller on mobile
content = content.replace(
  /size-24/g,
  'size-20 md:size-24'
);

// Change text mt-2 to mt-1 or mt-2
// And node margin-bottom mb-5 to mb-3 md:mb-5
content = content.replace(
  /mb-5/g,
  'mb-3 md:mb-5'
);

fs.writeFileSync('app/src/pages/OverviewPage.tsx', content);
