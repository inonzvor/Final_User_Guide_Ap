const fs = require('fs');
let content = fs.readFileSync('app/src/index.css', 'utf8');

// Add to @theme
content = content.replace(
  /--color-surface-raised: var\(--surface-raised-val\);/g,
  '--color-surface-raised: var(--surface-raised-val);\n  --color-model-bg: var(--model-bg-val);'
);

// Add to :root
content = content.replace(
  /--surface-raised-val: oklch\(15% 0 0\); \/\* Elevated dark gray \*\//g,
  '--surface-raised-val: oklch(15% 0 0); /* Elevated dark gray */\n    --model-bg-val: oklch(22% 0 0); /* Lighter dark gray for image backgrounds */'
);

// Add to :root[data-theme="light"]
content = content.replace(
  /--surface-raised-val: oklch\(96\.8% \.007 247\.896\);/g,
  '--surface-raised-val: oklch(96.8% .007 247.896);\n    --model-bg-val: oklch(100% 0 0);'
);

fs.writeFileSync('app/src/index.css', content);
