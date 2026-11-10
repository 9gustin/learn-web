import { cp, readFile, writeFile } from 'node:fs/promises';
await cp('brote', 'dist/brote', { recursive:true });
const paths = ['index.html','pages/plantas.html','pages/cuidados.html','pages/faq.html','pages/contacto.html','styles.css'];
const files = Object.fromEntries(await Promise.all(paths.map(async path => [path, await readFile('brote/' + path,'utf8')])));
await writeFile('dist/project.json', JSON.stringify({ files, html:files['index.html'].replace('<link rel="stylesheet" href="styles.css">',''), css:files['styles.css'] }));
console.log('Brote y las referencias de la guía actualizados.');
