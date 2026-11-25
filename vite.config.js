import { defineConfig } from 'vite';
import { resolve, relative } from 'path';
import { readdirSync, statSync } from 'fs';

function collectHtmlInputs(dir, baseDir = dir, inputs = {}) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    if (['node_modules', 'dist', '.git', 'public', 'scripts', 'src'].includes(entry)) continue;
    const fullPath = resolve(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      collectHtmlInputs(fullPath, baseDir, inputs);
    } else if (entry.endsWith('.html')) {
      const rel = relative(baseDir, fullPath).replace(/\\/g, '/').replace(/\.html$/, '');
      const key = rel === 'index' ? 'main' : rel.replace(/\//g, '_');
      inputs[key] = fullPath;
    }
  }
  return inputs;
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: collectHtmlInputs(__dirname),
    },
  },
});
