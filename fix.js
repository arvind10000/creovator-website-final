const fs = require('fs');
const path = require('path');

const replacements = {
    'â†’': '→',
    'âœ¦': '✦',
    'â€“': '—',
    'â€”': '—',
    'â€œ': '“',
    'â€': '”',
    'â€"': '”',
    'â€™': '’',
    'Â·': '·',
    'â€¢': '•',
    'â•‘': '║',
    'â•”': '╔',
    'â•—': '╗',
    'â••': '╚',
    'â•': '╝',
    'â•': '═',
    'â˜…': '★',
    'â€': '”'
};

const dirs = ['.', './creovator'];
dirs.forEach(dir => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        if (file.endsWith('.html')) {
            const p = path.join(dir, file);
            let content = fs.readFileSync(p, 'utf8');
            let changed = false;
            for (const [mangled, correct] of Object.entries(replacements)) {
                if (content.includes(mangled)) {
                    content = content.split(mangled).join(correct);
                    changed = true;
                }
            }
            if (changed) {
                fs.writeFileSync(p, content, 'utf8');
                console.log('Fixed:', p);
            }
        }
    });
});
