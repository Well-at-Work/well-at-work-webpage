import { parse, serialize, type DefaultTreeAdapterMap } from 'parse5';
import english from './en.json';
import { localiseHref } from './routes';

type Node = DefaultTreeAdapterMap['node'];
const dictionary: Record<string, string> = english;
const normalise = (text: string) => text.replace(/\s+/g, ' ').trim();

// Translate only rendered text and human-readable attributes. Never touch scripts, styles,
// asset URLs, element IDs or data attributes. The result is static English HTML, with no
// client-side translation request or flash of Danish content.
export function translateHtml(html: string, path: string): string {
  const document = parse(html);
  const missing = new Set<string>();
  const translate = (text: string) => {
    const key = normalise(text);
    if (!key || !/[A-Za-zÀ-ž]/.test(key)) return text;
    const value = dictionary[key];
    if (value === undefined) {
      missing.add(key);
      return text;
    }
    return (text.match(/^\s*/)?.[0] ?? '') + value + (text.match(/\s*$/)?.[0] ?? '');
  };
  const walk = (node: Node) => {
    if ('tagName' in node) {
      if (['script', 'style'].includes(node.tagName) || node.attrs.some(a => a.name === 'data-i18n-skip')) return;
      const metaKey = node.attrs.find(a => a.name === 'name' || a.name === 'property')?.value;
      for (const attr of node.attrs) {
        if (['alt', 'aria-label', 'title', 'placeholder'].includes(attr.name) ||
          (node.tagName === 'meta' && attr.name === 'content' && ['description', 'og:title', 'og:description', 'og:image:alt'].includes(metaKey ?? ''))) {
          attr.value = translate(attr.value);
        }
        if (node.tagName === 'html' && attr.name === 'lang') attr.value = 'en';
        if (node.tagName === 'meta' && metaKey === 'og:locale' && attr.name === 'content') attr.value = 'en_GB';
        if (node.tagName === 'a' && attr.name === 'href') {
          attr.value = localiseHref(attr.value, 'en');
          if (attr.value.startsWith('mailto:') && attr.value.includes('?')) {
            const [address, query] = attr.value.split('?');
            const params = new URLSearchParams(query);
            if (params.has('subject')) params.set('subject', 'Well at Work demo');
            attr.value = `${address}?${params}`;
          }
        }
      }
    }
    if (node.nodeName === '#text' && 'value' in node) node.value = translate(node.value);
    if ('childNodes' in node) node.childNodes.forEach(walk);
  };
  walk(document);
  if (missing.size) throw new Error(`Missing English translations on ${path}:\n${[...missing].join('\n')}`);
  return serialize(document);
}
