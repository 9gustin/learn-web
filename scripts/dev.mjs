import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { openWorkspace } from './open-workspace.mjs';
const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const portIndex = process.argv.indexOf('--port');
const port = Number(portIndex >= 0 ? process.argv[portIndex + 1] : process.env.PORT || 3000);
const hostIndex = process.argv.indexOf('--host');
const host = hostIndex >= 0 ? process.argv[hostIndex + 1] : '127.0.0.1';
if (!Number.isInteger(port) || port < 0 || port > 65535) {
  console.error('El puerto debe ser un número entre 0 y 65535.');
  process.exit(1);
}
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.json':'application/json' };
const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const relative = pathname.endsWith('/') ? pathname + 'index.html' : pathname;
    const directory = pathname.startsWith('/brote/') ? root : resolve(root, 'dist');
    const file = resolve(directory, '.' + relative);
    if (!file.startsWith(directory + sep)) { response.writeHead(403).end(); return; }
    const content = await readFile(file);
    response.writeHead(200, { 'Content-Type':types[extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store' });
    response.end(content);
  } catch { response.writeHead(404).end('Archivo no encontrado'); }
});
server.on('error', error => {
  if (error.code === 'EADDRINUSE' && !process.argv.includes('--strictPort')) {
    console.warn(`El puerto ${port} está ocupado. Buscando uno disponible…`);
    server.listen(0, host);
    return;
  }
  console.error(`No se pudo iniciar el servidor: ${error.message}`);
  process.exitCode = 1;
});
server.on('listening', () => {
  const actualPort = server.address().port;
  const origin = `http://localhost:${actualPort}`;
  console.log(`Guía: ${origin}`);
  console.log(`Tu proyecto: ${origin}/brote/`);
  console.log('Guardá en VS Code y recargá Brote para ver los cambios. Ctrl+C para detener.');
  if (process.argv.includes('--open')) openWorkspace(root, origin);
});
server.listen(port, host);
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
