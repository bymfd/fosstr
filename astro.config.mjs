// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://fosstr.com',
	output: 'static',
	i18n: {
		defaultLocale: 'tr',
		locales: ['tr', 'en'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	integrations: [
		mdx(),
		sitemap({
			i18n: {
				defaultLocale: 'tr',
				locales: {
					tr: 'tr-TR',
					en: 'en-US',
				},
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
