import { defineMiddleware } from 'astro:middleware';
import { localeFor } from './i18n/routes';
import { translateHtml } from './i18n/translate';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (localeFor(context.url.pathname) !== 'en' || !response.ok || !response.headers.get('content-type')?.includes('text/html')) return response;
  const html = translateHtml(await response.text(), context.url.pathname);
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  headers.set('content-language', 'en');
  return new Response(html, { status: response.status, headers });
});
