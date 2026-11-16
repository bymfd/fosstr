export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'tr';

export function getLocaleFromPath(pathname: string): Locale {
	return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'tr';
}

export function stripLocale(pathname: string): string {
	if (pathname === '/en') return '/';
	if (pathname.startsWith('/en/')) return pathname.slice(3) || '/';
	return pathname || '/';
}

export function localizedPath(pathname: string, locale: Locale): string {
	const base = stripLocale(pathname);
	if (locale === 'en') return base === '/' ? '/en/' : `/en${base}`;
	return base;
}

export function buildAlternates(pathname: string, site: URL | undefined, available: Locale[] = ['tr', 'en']) {
	if (!site) return { alternates: [], xDefault: undefined as string | undefined };
	const base = stripLocale(pathname);
	const toHref = (loc: Locale) => new URL(localizedPath(base, loc), site).href;
	return {
		alternates: available.map((hreflang) => ({ hreflang, href: toHref(hreflang) })),
		xDefault: available.includes('tr') ? toHref('tr') : toHref(available[0]),
	};
}