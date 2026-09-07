const fs = require('fs');
const file = 'src/data/patentsData.ts';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/inventors:\s*\[(.*?)\]/gs, (match, p1) => {
    const joined = p1.split(',').map(s => s.trim().replace(/"/g, '')).join(', ');
    return `inventors: "${joined}"`;
});
fs.writeFileSync(file, content);
