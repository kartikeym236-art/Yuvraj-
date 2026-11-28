// Headless capture for a project folder (three.js in Chromium, software WebGL if there is no GPU).
//
//   node tools/capture.mjs check  <project>                      shots, caption cards (with times), problems
//   node tools/capture.mjs cues   <project>                      -> data/cues.json (for tools/mix.py)
//   node tools/capture.mjs frames <project> --times 1,2.5,8      -> review/f_<t>.jpg
//   node tools/capture.mjs sheet  <project> [--every 1.5]        -> review/sheet.jpg (each shot + every N s)
//   node tools/capture.mjs video  <project> [--fps 30] [--jobs 2] [--res 1.5] [--from 0 --to 5]
//                                                                -> renders/<name>.mp4 (+ _share.mp4, cover.jpg); runs cues + mix.py
//   node tools/capture.mjs eval   <project> "<js>"               run JS in the page (OP, A, E, TL are on window.OP)
// Env: QS='&cam=x,y,z,lx,ly,lz' extra query string (debug camera etc.); CHROME=/path/to/chrome.
import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn, execSync } from 'child_process';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const require_ = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require_('playwright')); } catch { ({ chromium } = createRequire(execSync('npm root -g').toString().trim() + '/')('playwright')); }

const [cmd, projArg, ...rest] = process.argv.slice(2);
if (!cmd || !projArg) { console.log(fs.readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(0, 13).join('\n')); process.exit(1); }
const P = path.resolve(projArg), NAME = path.basename(P);
const opt = (k, d) => { const i = rest.indexOf('--' + k); return i >= 0 ? rest[i + 1] : d; };
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.glb': 'model/gltf-binary',
  '.obj': 'text/plain', '.hdr': 'application/octet-stream', '.jpg': 'image/jpeg', '.png': 'image/png', '.otf': 'font/otf', '.wav': 'audio/wav', '.mp3': 'audio/mpeg', '.svg': 'image/svg+xml', '.geojson': 'application/json' };

function serve() {
  return new Promise((res) => {
    const srv = http.createServer((q, r) => {
      const f = path.join(P, decodeURIComponent(q.url.split('?')[0]));
      if (!f.startsWith(P)) { r.writeHead(403); return r.end(); }
      fs.readFile(f.endsWith('/') ? f + 'index.html' : f, (e, b) => {
        if (e) { r.writeHead(404); return r.end(); }
        r.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); r.end(b);
      });
    }).listen(0, '127.0.0.1', () => res(srv));
  });
}

async function openPage(browser, port, res = 1) {
  const page = await browser.newPage({ viewport: { width: 540, height: 960 } });
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type()) && !m.text().includes('GPU stall')) console.log(`[page ${m.type()}] ${m.text()}`); });
  page.on('pageerror', (e) => console.log(`[page error] ${e.message}`));
  await page.goto(`http://127.0.0.1:${port}/index.html?capture&res=${res}${process.env.QS || ''}`);
  await page.waitForFunction(() => window.OP && (window.OP.ready || window.OP.error), null, { timeout: 600000, polling: 500 });
  const err = await page.evaluate(() => window.OP.error);
  if (err) throw new Error('page failed to boot:\n' + err);
  return page;
}
const launch = () => chromium.launch({ executablePath: process.env.CHROME || undefined,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-gpu-rasterization', '--disable-gpu-sandbox', '--js-flags=--max-old-space-size=8192'] });
const b64 = (d) => Buffer.from(d.split(',')[1], 'base64');
const ff = (args, stdin) => new Promise((ok, bad) => { const p = spawn('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: [stdin ? 'pipe' : 'ignore', 'inherit', 'inherit'] });
  p.on('exit', (c) => (c ? bad(new Error('ffmpeg exit ' + c)) : ok())); if (stdin) stdin(p.stdin); });
const fmt = (s) => `${Math.floor(s / 60)}:${(s % 60).toFixed(0).padStart(2, '0')}`;

async function writeCues(page) {
  const c = await page.evaluate(() => ({ duration: OP.duration, cues: OP.cues }));
  fs.mkdirSync(path.join(P, 'data'), { recursive: true });
  fs.writeFileSync(path.join(P, 'data/cues.json'), JSON.stringify(c, null, 1));
  console.log(`data/cues.json: ${c.cues.length} cues`);
}

async function renderRange(browser, port, res, fps, f0, f1, out) {
  const page = await openPage(browser, port, res);
  const t0 = Date.now();
  await ff(['-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '14', '-pix_fmt', 'yuv420p', out], async (stdin) => {
    for (let f = f0; f < f1; f++) {
      const d = await page.evaluate(([t]) => OP.frame(t, 0.95), [f / fps]);
      if (!stdin.write(b64(d))) await new Promise((r) => stdin.once('drain', r));
      if ((f - f0) % 30 === 0) { const el = (Date.now() - t0) / 1000, done = f - f0 + 1; process.stdout.write(`  [${path.basename(out)}] ${done}/${f1 - f0} frames, ${fmt(el)} elapsed, ~${fmt(el / done * (f1 - f - 1))} left\n`); }
    }
    stdin.end();
  });
  await page.close();
}

const srv = await serve(), port = srv.address().port, browser = await launch();
try {
  if (cmd === 'check') {
    const page = await openPage(browser, port);
    const r = await page.evaluate(() => OP.check());
    console.log(`duration ${r.duration.toFixed(2)} s, ${r.shots.length} shots, ${r.cards.length} caption cards, ${r.cues} cues`);
    for (const s of r.shots) console.log(`  shot ${String(s.id).padEnd(6)} ${s.start.toFixed(2).padStart(6)}-${s.end.toFixed(2).padStart(6)}${s.transition ? ' [' + s.transition + ']' : ''}  ${s.note}`);
    for (const c of r.cards) console.log(`  card ${c.s.toFixed(2).padStart(6)}-${c.e.toFixed(2).padStart(6)} (${c.len.toFixed(2)})  ${c.text}`);
    await page.evaluate(() => OP.frame(OP.duration / 2));
    if (r.problems.length) { console.log('PROBLEMS:\n  ' + r.problems.join('\n  ')); process.exitCode = 2; } else console.log('CHECK OK');
  } else if (cmd === 'cues') {
    await writeCues(await openPage(browser, port));
  } else if (cmd === 'frames') {
    const page = await openPage(browser, port, +opt('res', 1)); fs.mkdirSync(path.join(P, 'review'), { recursive: true });
    for (const t of opt('times', '0').split(',').map(Number)) {
      const f = path.join(P, 'review', `f_${t.toFixed(2)}.jpg`); fs.writeFileSync(f, b64(await page.evaluate(([t]) => OP.frame(t), [t]))); console.log(f);
    }
  } else if (cmd === 'sheet') {
    const page = await openPage(browser, port); fs.mkdirSync(path.join(P, 'review'), { recursive: true });
    const every = +opt('every', 0);
    const { ts, labels } = await page.evaluate(([every]) => {
      const pts = []; OP.shots.forEach((s) => { const d = s.end - s.start; pts.push([s.start + Math.min(0.25, d * 0.2), s.id]); if (d > 1.6) pts.push([s.start + d * 0.75, s.id]); });
      if (every) for (let t = 0.3; t < OP.duration; t += every) pts.push([t, '']);
      pts.sort((a, b) => a[0] - b[0]);
      return { ts: pts.map((p) => p[0]), labels: pts.map((p) => `${p[0].toFixed(2)}  ${p[1]}`) };
    }, [every]);
    const f = path.join(P, 'review/sheet.jpg'); const t0 = Date.now();
    fs.writeFileSync(f, b64(await page.evaluate(([ts, l]) => OP.sheet(ts, 6, l), [ts, labels])));
    console.log(`${f} (${ts.length} frames, ${((Date.now() - t0) / 1000).toFixed(0)} s)`);
  } else if (cmd === 'eval') {
    const page = await openPage(browser, port);
    console.log(JSON.stringify(await page.evaluate((js) => { const r = (0, eval)(js); return r; }, rest[0]), null, 1));
  } else if (cmd === 'video') {
    const fps = +opt('fps', 30), jobs = +opt('jobs', Math.max(1, Math.min(8, (await import('os')).cpus().length))), res = +opt('res', 1);
    const page = await openPage(browser, port); await writeCues(page);
    const dur = await page.evaluate(() => OP.duration); await page.close();
    const from = +opt('from', 0), to = +opt('to', dur), F0 = Math.round(from * fps), F1 = Math.round(to * fps), n = F1 - F0;
    const tmp = path.join(P, 'renders', '.parts'); fs.mkdirSync(tmp, { recursive: true });
    console.log(`rendering ${n} frames (${(n / fps).toFixed(1)} s at ${fps} fps, res ${res}) with ${jobs} workers…`);
    const per = Math.ceil(n / jobs), parts = [];
    // one browser per worker: pages inside one browser share a single (software) GPU process and do not run in parallel
    const browsers = [browser, ...(await Promise.all(Array.from({ length: Math.max(0, jobs - 1) }, () => launch())))];
    await Promise.all(Array.from({ length: jobs }, (_, j) => { const a = F0 + j * per, b = Math.min(F1, a + per); if (a >= b) return null;
      const out = path.join(tmp, `p${String(j).padStart(2, '0')}.mp4`); parts.push(out); return renderRange(browsers[j], port, res, fps, a, b, out); }));
    await Promise.all(browsers.slice(1).map((b) => b.close()));
    parts.sort(); fs.writeFileSync(path.join(tmp, 'list.txt'), parts.map((p) => `file '${p}'`).join('\n'));
    const silent = path.join(tmp, 'video.mp4'); await ff(['-f', 'concat', '-safe', '0', '-i', path.join(tmp, 'list.txt'), '-c', 'copy', silent]);
    console.log('mixing soundtrack (tools/mix.py)…');
    execSync(`python3 "${path.join(HERE, 'mix.py')}" "${P}"`, { stdio: 'inherit' });
    const out = path.join(P, 'renders', `${NAME}.mp4`), share = path.join(P, 'renders', `${NAME}_share.mp4`);
    const audioArgs = from > 0 ? ['-ss', String(from), '-t', String(to - from)] : ['-t', String(to)];
    await ff(['-i', silent, ...audioArgs, '-i', path.join(P, 'data/mix.wav'), '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-preset', 'slow', '-crf', '17',
      '-pix_fmt', 'yuv420p', '-r', String(fps), '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', '-shortest', out]);
    await ff(['-i', out, '-c:v', 'libx264', '-preset', 'slow', '-crf', '25', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', share]);
    const coverT = JSON.parse(fs.readFileSync(path.join(P, 'script.json'), 'utf8')).cover ?? 0.6;
    await ff(['-ss', String(coverT), '-i', out, '-frames:v', '1', '-q:v', '2', path.join(P, 'renders', 'cover.jpg')]);
    fs.rmSync(tmp, { recursive: true, force: true });
    console.log(`${out}\n${share}\n${path.join(P, 'renders', 'cover.jpg')}`);
  } else { console.log('unknown command ' + cmd); process.exitCode = 1; }
} finally { await browser.close(); srv.close(); }
