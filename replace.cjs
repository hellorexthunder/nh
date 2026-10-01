const fs = require('fs');
const path = require('path');
const dir = 'd:\\New folder (2)\\noman-portfolio-main';

const replacements = [
  // Names
  { regex: /Ahmad Touqeer/gi, replace: 'NOMAN HASSAN' },
  { regex: /Ahmad\s*Touqeer/gi, replace: 'NOMAN HASSAN' },
  { regex: /Ahmad/g, replace: 'Noman' },
  { regex: /Touqeer/g, replace: 'Hassan' },
  
  // Emails
  { regex: /ahmadtouqeer1995@gmail\.com/gi, replace: 'hi.nomanhassan@gmail.com' },
  { regex: /ahmadtouqeer2011@gmail\.com/gi, replace: 'hi.nomanhassan@gmail.com' },
  { regex: /nomanhassan@example\.com/gi, replace: 'hi.nomanhassan@gmail.com' },
  
  // Phones
  { regex: /\+33 6 51 96 47 71/g, replace: '+92 310 4949620' },
  { regex: /\+920000000000/g, replace: '+92 310 4949620' },
  
  // URLs and Usernames
  { regex: /ahmadtouqeer1995-droid\.github\.io\/portfolio/g, replace: 'nomanhassan.github.io/portfolio' },
  { regex: /ahmadtouqeer1995-droid\.github\.io/g, replace: 'nomanhassan.github.io' },
  { regex: /touqeer-ahmad-a788353a2/g, replace: 'noman-hassan' },
  { regex: /https:\/\/example\.com\/portfolio/g, replace: 'https://nomanhassan.github.io/portfolio' },
  
  // Locations
  { regex: /Paris, France/gi, replace: 'Burewala, Pakistan' },
  { regex: /Paris/g, replace: 'Burewala' },
  { regex: /France/g, replace: 'Pakistan' },
  
  // Education placeholders in index.html
  { regex: /University Name/g, replace: 'Virtual University of Pakistan' },
  { regex: /Degree Name/g, replace: 'M.Sc. (Economics)' }
];

function processDir(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    if (['node_modules', '.git', '.github', 'package-lock.json', 'replace.js'].includes(file)) continue;
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (stat.isFile() && /\.(html|md|ts|tsx|js|jsx|json|css)$/.test(file)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content;
      for (const r of replacements) {
        newContent = newContent.replace(r.regex, r.replace);
      }
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log('Updated:', fullPath);
      }
    }
  }
}
processDir(dir);
console.log('Done replacement.');
