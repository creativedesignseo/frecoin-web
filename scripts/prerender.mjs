/**
 * Prerender de build para la SPA de FRECOIN.
 *
 * PROBLEMA QUE RESUELVE
 * ---------------------
 * Vite servía `<div id="root"></div>` byte a byte idéntico en las 11 rutas del
 * sitio: sin H1, sin párrafos, sin enlaces, sin FAQs y con el canonical de la
 * home. Google acaba renderizando el JS, pero GPTBot / ClaudeBot /
 * PerplexityBot no: para ellos frecoin.es no tenía contenido citable.
 *
 * CÓMO FUNCIONA
 * -------------
 * 1. Levanta `vite preview` sobre `dist/`.
 * 2. Abre cada ruta pública en el Chrome del sistema (puppeteer-core, sin
 *    descargar Chromium) y espera a que React haya pintado el H1.
 * 3. Neutraliza los estados iniciales de las animaciones GSAP (`opacity: 0`,
 *    `transform`) para que el HTML guardado tenga el contenido visible.
 * 4. Guarda el DOM resultante en `dist/<ruta>/index.html`.
 *
 * El `<head>` se guarda tal y como lo dejó `usePageMeta`, así que cada fichero
 * lleva su propio title, description, canonical absoluto y OG/Twitter.
 *
 * Se excluye a propósito `/rediseno` (prototipo interno, noindex + Disallow).
 * Se genera además `dist/404.html` desde una URL inexistente, que Apache sirve
 * con `ErrorDocument 404 /404.html`.
 */
import { spawn } from 'node:child_process';
import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PORT = 4183;
const ORIGIN = `http://localhost:${PORT}`;

/** Rutas públicas indexables. Debe coincidir con public/sitemap.xml. */
const ROUTES = [
  '/',
  '/servicios/redes-informaticas',
  '/servicios/instalaciones-electricas',
  '/servicios/camaras-videovigilancia',
  '/servicios/antenas-wifi',
  '/servicios/sai',
  '/servicios/controles-de-acceso',
  '/sobre-nosotros',
  '/aviso-legal',
  '/politica-privacidad',
  '/politica-cookies',
];

/** Ruta inexistente usada solo para capturar la página 404 → dist/404.html */
const NOT_FOUND_PROBE = '/__404__';

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

async function findChrome() {
  for (const candidate of CHROME_CANDIDATES) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      /* siguiente candidato */
    }
  }
  throw new Error(
    'No se ha encontrado Chrome/Chromium para el prerender.\n' +
      'Instala Google Chrome o exporta CHROME_PATH=/ruta/al/binario.'
  );
}

function startPreview() {
  const child = spawn(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['vite', 'preview', '--port', String(PORT), '--strictPort'],
    { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] }
  );
  child.stderr.on('data', (d) => process.stderr.write(`[preview] ${d}`));
  return child;
}

async function waitForServer(timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(ORIGIN, { redirect: 'manual' });
      if (res.status < 500) return;
    } catch {
      /* aún no escucha */
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`vite preview no respondió en ${ORIGIN} tras ${timeoutMs} ms`);
}

/** Ruta → fichero de salida dentro de dist/. */
function outputFileFor(route) {
  if (route === '/') return path.join(DIST, 'index.html');
  return path.join(DIST, route.replace(/^\//, ''), 'index.html');
}

/**
 * Se ejecuta DENTRO de la página, justo antes de serializar.
 * GSAP deja `opacity: 0` y `transform` inline en todo lo que aún no ha
 * animado (secciones bajo el pliegue con ScrollTrigger). Sin esto, el HTML
 * estático llevaría medio contenido invisible para un bot sin JS.
 */
function stripAnimationState() {
  document.querySelectorAll('[style]').forEach((el) => {
    const style = el.getAttribute('style') || '';
    if (/opacity\s*:\s*0(\.|;|\s|$)/.test(style) || /transform\s*:/.test(style)) {
      el.style.removeProperty('opacity');
      el.style.removeProperty('transform');
      el.style.removeProperty('visibility');
      if (!el.getAttribute('style')) el.removeAttribute('style');
    }
  });
}

async function renderRoute(browser, route, outFile) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200 });
  try {
    await page.goto(`${ORIGIN}${route}`, { waitUntil: 'networkidle0', timeout: 45000 });
    // React ya pintó cuando existe el H1 de la página.
    await page.waitForSelector('#root h1', { timeout: 20000 });
    // Deja terminar las animaciones de entrada del hero.
    await new Promise((r) => setTimeout(r, 600));
    await page.evaluate(stripAnimationState);

    const html = await page.content();
    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, html, 'utf8');

    const title = await page.title();
    const canonical = await page.$eval('link[rel="canonical"]', (el) => el.href).catch(() => '(sin canonical)');
    console.log(
      `  ✓ ${route.padEnd(38)} → ${path.relative(ROOT, outFile).padEnd(42)} ${(html.length / 1024).toFixed(0)} KB`
    );
    console.log(`      title: ${title}`);
    console.log(`      canonical: ${canonical}`);
  } finally {
    await page.close();
  }
}

async function main() {
  const chromePath = await findChrome();
  console.log(`\nPrerender — Chrome: ${chromePath}`);

  const preview = startPreview();
  let browser;
  try {
    await waitForServer();
    browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: true,
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
    });

    // La home se deja para el final: mientras no se sobrescriba,
    // dist/index.html sigue siendo la plantilla limpia que `vite preview`
    // usa como fallback para las rutas que aún no existen en disco.
    const inner = ROUTES.filter((r) => r !== '/');

    console.log(`\nRutas públicas (${ROUTES.length}):`);
    for (const route of inner) {
      await renderRoute(browser, route, outputFileFor(route));
    }

    console.log('\nPágina 404:');
    await renderRoute(browser, NOT_FOUND_PROBE, path.join(DIST, '404.html'));

    console.log('\nHome:');
    await renderRoute(browser, '/', outputFileFor('/'));

    console.log('\nPrerender completado.\n');
  } finally {
    if (browser) await browser.close().catch(() => {});
    preview.kill('SIGTERM');
  }
}

main().catch((err) => {
  console.error('\nPrerender FALLIDO:', err.message);
  process.exit(1);
});
