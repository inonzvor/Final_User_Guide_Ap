const fs = require('fs');

const files = ['app/src/pages/GuidePage.tsx', 'app/src/pages/OverviewPage.tsx', 'app/src/pages/ReferencePage.tsx'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/mb-14/g, 'mb-8 md:mb-14');
  fs.writeFileSync(file, content);
});
