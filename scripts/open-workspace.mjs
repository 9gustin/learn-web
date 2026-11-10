import { spawn } from 'node:child_process';

function launch(command, args, fallback) {
  const child = spawn(command, args, { stdio: 'ignore' });
  child.once('error', () => console.warn(fallback));
  child.once('exit', code => {
    if (code !== null && code !== 0) console.warn(fallback);
  });
  child.unref();
}

function powershell(script, fallback) {
  const encoded = Buffer.from(script, 'utf16le').toString('base64');
  launch('powershell.exe', ['-NoProfile', '-NonInteractive', '-EncodedCommand', encoded], fallback);
}

export function openWorkspace(root, origin) {
  const urls = [origin, `${origin}/brote/`];
  const editorHelp = `Abrí esta carpeta en VS Code: ${root}. Si usás Linux o Windows, verificá que el comando code esté en el PATH.`;
  const browserHelp = `Abrí la guía y Brote en tu navegador: ${urls.join(' y ')}`;
  if (process.platform === 'darwin') {
    launch('open', ['-a', 'Visual Studio Code', root], editorHelp);
    launch('open', urls, browserHelp);
  } else if (process.platform === 'win32') {
    const quotedRoot = root.replaceAll("'", "''");
    powershell(`& code '${quotedRoot}'; if (!$?) { exit 1 }`, editorHelp);
    for (const url of urls) powershell(`Start-Process '${url}' -ErrorAction Stop`, browserHelp);
  } else {
    launch('code', [root], editorHelp);
    for (const url of urls) launch('xdg-open', [url], browserHelp);
  }
}
