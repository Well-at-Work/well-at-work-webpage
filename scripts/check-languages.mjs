import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'parse5';

const root = resolve('dist');
const dictionary = JSON.parse(readFileSync('src/i18n/en.json', 'utf8'));
const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value;
const normalise = text => text.replace(/\s+/g, ' ').trim();
const documents = new Map();
function load(path) {
  const file = resolve(root, `.${path}`, 'index.html');
  assert.ok(existsSync(file), `Missing page: ${path}`);
  if (documents.has(file)) return documents.get(file);
  const nodes = [];
  function walk(n) { nodes.push(n); n.childNodes?.forEach(walk); }
  walk(parse(readFileSync(file, 'utf8')));
  const page = { file, nodes, ids: new Set(nodes.map(n => attr(n, 'id')).filter(Boolean)) };
  documents.set(file, page);
  return page;
}
const paths = ['/'];
for (const entry of readdirSync(root, { recursive: true })) {
  if (String(entry).endsWith('/index.html')) paths.push('/' + String(entry).replace(/\/index.html$/, ''));
}
assert.equal(paths.length, 20, 'Expected ten Danish and ten English pages');
for (const path of paths) {
  const page = load(path);
  const english = path.startsWith('/en');
  const lang = english ? 'en' : 'da';
  assert.equal(attr(page.nodes.find(n => n.tagName === 'html'), 'lang'), lang, path);
  const title = page.nodes.find(n => n.tagName === 'title');
  assert.ok(title?.childNodes?.some(n => n.value?.trim()), `Missing title: ${path}`);
  const canonical = page.nodes.find(n => attr(n, 'rel') === 'canonical');
  assert.equal(new URL(attr(canonical, 'href')).pathname.replace(/\/$/, '') || '/', path.replace(/\/$/, '') || '/');
  for (const locale of ['da', 'en']) {
    const alternate = page.nodes.find(n => attr(n, 'rel') === 'alternate' && attr(n, 'hreflang') === locale);
    assert.ok(alternate, `Missing ${locale} alternate on ${path}`);
    const counterpart = load(new URL(attr(alternate, 'href')).pathname);
    assert.equal(attr(counterpart.nodes.find(n => n.tagName === 'html'), 'lang'), locale);
    const styles = doc => doc.nodes.filter(n => n.tagName === 'link' && attr(n, 'rel') === 'stylesheet').map(n => attr(n, 'href')).sort();
    assert.deepEqual(styles(counterpart), styles(page), `Language-specific style leakage on ${path}`);
    const self = counterpart.nodes.find(n => attr(n, 'rel') === 'alternate' && attr(n, 'hreflang') === lang);
    assert.equal(attr(self, 'href'), attr(canonical, 'href'), `Non-reciprocal language pair on ${path}`);
  }
  const switcher = page.nodes.find(n => attr(n, 'class') === 'language-switch');
  assert.ok(switcher, `Missing language selector: ${path}`);
  const switches = switcher.childNodes.filter(n => n.tagName === 'a');
  assert.equal(switches.length, 2);
  assert.equal(switches.filter(n => attr(n, 'aria-current')).length, 1);
  assert.equal(attr(switches.find(n => attr(n, 'aria-current')), 'lang'), lang);
  for (const n of page.nodes) {
    if (n.tagName === 'a') {
      const href = attr(n, 'href');
      if (!href || (!href.startsWith('/') && !href.startsWith('#')) || href.startsWith('//')) continue;
      const url = new URL(href, 'https://example.com' + path);
      const target = load(url.pathname);
      if (url.hash) assert.ok(target.ids.has(decodeURIComponent(url.hash.slice(1))), `Broken anchor ${href} on ${path}`);
      if (english && !attr(n, 'hreflang')) assert.ok(url.pathname.startsWith('/en'), `English link leaves language: ${href} on ${path}`);
    }
    if (['img', 'script', 'source'].includes(n.tagName)) {
      const src = attr(n, 'src');
      if (src?.startsWith('/')) assert.ok(existsSync(resolve(root, '.' + src)), `Missing asset: ${src}`);
    }
    if (n.tagName === 'link' && attr(n, 'rel') === 'stylesheet') {
      const href = attr(n, 'href');
      if (href?.startsWith('/')) assert.ok(existsSync(resolve(root, '.' + href)), `Missing stylesheet: ${href}`);
    }
    if (english && n.nodeName === '#text' && !['script', 'style'].includes(n.parentNode?.tagName)) {
      const text = normalise(n.value);
      if (dictionary[text] && normalise(dictionary[text]) !== text) {
        // Some valid English words also occur as Danish keys (e.g. "coach").
        assert.ok(Object.values(dictionary).some(value => normalise(value) === text), `Untranslated copy on ${path}: ${text}`);
      }
    }
  }
}
const home = load('/en/');
const allText = home.nodes.filter(n => n.nodeName === '#text').map(n => n.value).join(' ');
assert.ok(allText.includes('Strengthen wellbeing'));
assert.ok(allText.includes('leading, experienced organisational psychologists'));
assert.ok(allText.includes('BEYOND QUESTIONNAIRES'));
assert.equal(home.nodes.filter(n => attr(n, 'class')?.includes('featured-product')).length, 4);
console.log('Passed: 20 pages, bilingual navigation, reciprocal language links, metadata, local assets and every linked section.');
