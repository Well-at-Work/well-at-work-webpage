export type Locale = 'da' | 'en';

// Both languages render the same Astro pages, so content structure and anchors stay in sync.
export const routes = [
  { da: '/', en: '/en', page: 'index' },
  { da: '/platform', en: '/en/platform', page: 'platform' },
  { da: '/for-hr', en: '/en/for-hr', page: 'for-hr' },
  { da: '/for-ledelsen', en: '/en/for-leaders', page: 'for-ledelsen' },
  { da: '/for-medarbejdere', en: '/en/for-employees', page: 'for-medarbejdere' },
  { da: '/forskning', en: '/en/research', page: 'forskning' },
  { da: '/om-os', en: '/en/about', page: 'om-os' },
  { da: '/resultater', en: '/en/customers', page: 'resultater' },
  { da: '/film', en: '/en/videos', page: 'film' },
  { da: '/cinematic', en: '/en/cinematic', page: 'cinematic' },
] as const;

const normalise = (path: string) => path.replace(/\/+$/, '') || '/';
export const localeFor = (path: string): Locale => /^\/en(?:\/|$)/.test(path) ? 'en' : 'da';
export function routeFor(path: string) {
  return routes.find(route => normalise(route.da) === normalise(path) || normalise(route.en) === normalise(path));
}
export function localiseHref(href: string, locale: Locale): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const [, path, suffix] = href.match(/^([^?#]*)(.*)$/)!;
  const route = routeFor(path);
  return route ? route[locale] + suffix : href;
}
