import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://fosstr.com';
const CONTENT_DIR = fileURLToPath(new URL('../src/content/blog/', import.meta.url));
const OUT_DIR = fileURLToPath(new URL('../public/', import.meta.url));

function slugify(input) {
	return input
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/ı/g, 'i')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

function unquote(value) {
	const v = value.trim();
	if (
		(v.startsWith("'") && v.endsWith("'")) ||
		(v.startsWith('"') && v.endsWith('"'))
	) {
		return v.slice(1, -1);
	}
	return v;
}

function parseFrontmatter(source) {
	const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
	if (!match) return { data: {}, body: source };

	const data = {};
	for (const line of match[1].split(/\r?\n/)) {
		const kv = line.match(/^(\w+):\s*(.*)$/);
		if (!kv) continue;
		const [, key, raw] = kv;
		if (key === 'tags') {
			data.tags = [...raw.matchAll(/'([^']*)'|"([^"]*)"/g)].map((m) => m[1] ?? m[2]);
		} else {
			data[key] = unquote(raw);
		}
	}
	return { data, body: source.slice(match[0].length).trim() };
}

const entries = fs
	.readdirSync(CONTENT_DIR)
	.filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
	.map((file) => {
		const id = file.replace(/\.mdx?$/, '');
		const { data, body } = parseFrontmatter(
			fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8'),
		);
		const type = data.type === 'project' ? 'project' : 'post';
		return {
			id,
			type,
			title: data.title ?? id,
			description: data.description ?? '',
			pubDate: data.pubDate ?? '',
			updatedDate: data.updatedDate ?? '',
			tags: data.tags ?? [],
			repo: data.repo ?? '',
			url: `${SITE}/${type === 'project' ? 'projects' : 'blog'}/${id}/`,
			body,
		};
	})
	.sort((a, b) => (a.pubDate < b.pubDate ? 1 : a.pubDate > b.pubDate ? -1 : a.id.localeCompare(b.id)));

const posts = entries.filter((e) => e.type === 'post');
const projects = entries.filter((e) => e.type === 'project');

const tagCounts = new Map();
for (const entry of entries) {
	for (const tag of entry.tags) {
		tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
	}
}
const tags = [...tagCounts.entries()].sort(
	(a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
);

const llmsTxt = [
	'# fosstr',
	'',
	'> Yazılım, güvenlik ve daha fazlası',
	'',
	'fosstr; yazılım, siber güvenlik, yapay zeka ve sistem programlama üzerine Türkçe yayın yapan kişisel bir sitedir. Blog yazıları ile açık kaynak projeler ayrı bölümlerde yer alır.',
	'',
	'İçeriklerin tam metni [llms-full.txt](https://fosstr.com/llms-full.txt) dosyasındadır.',
	'',
	'## Site',
	'',
	'- [Ana Sayfa](https://fosstr.com/)',
	'- [Yazılar](https://fosstr.com/blog/)',
	'- [Projeler](https://fosstr.com/projects/)',
	'- [Hakkımda](https://fosstr.com/about/)',
	'- [RSS](https://fosstr.com/rss.xml)',
	'- [Site Haritası](https://fosstr.com/sitemap-index.xml)',
	'',
	'## Yazılar',
	'',
	...posts.map((p) => `- [${p.title}](${p.url}) — ${p.description}`),
	'',
	'## Projeler',
	'',
	...projects.map(
		(p) => `- [${p.title}](${p.url}) — ${p.description}${p.repo ? ` (repo: ${p.repo})` : ''}`,
	),
	'',
	'## Tags',
	'',
	...tags.map(([tag, count]) => `- [${tag}](${SITE}/blog/tags/${slugify(tag)}/) — ${count} içerik`),
	'',
	'## Contact',
	'',
	'- GitHub: https://github.com/bymfd',
	'- Email: hello@fosstr.com',
	'',
].join('\n');

const llmsFullTxt = [
	'# fosstr',
	'',
	'> Yazılım, güvenlik ve daha fazlası',
	'',
	`Site: ${SITE}`,
	`Yazılar: ${SITE}/blog/`,
	`Projeler: ${SITE}/projects/`,
	`RSS: ${SITE}/rss.xml`,
	`Site haritası: ${SITE}/sitemap-index.xml`,
	`Dizin (llms.txt): ${SITE}/llms.txt`,
	'',
	'Bu dosya sitedeki tüm yazıların ve proje tanıtımlarının tam metnini, her biri için kaynak URL ve tarih bilgisiyle birlikte verir.',
	'',
	'---',
	'',
	...entries.map((p) =>
		[
			`# ${p.title}`,
			'',
			`- Kaynak: ${p.url}`,
			`- Tür: ${p.type === 'project' ? 'Proje' : 'Yazı'}`,
			`- Tarih: ${p.pubDate}`,
			...(p.updatedDate ? [`- Güncelleme: ${p.updatedDate}`] : []),
			...(p.tags.length ? [`- Etiketler: ${p.tags.join(', ')}`] : []),
			...(p.repo ? [`- Depo: ${p.repo}`] : []),
			...(p.description ? [`- Özet: ${p.description}`] : []),
			'',
			p.body,
			'',
			'---',
			'',
		].join('\n'),
	),
	'',
].join('\n');

fs.writeFileSync(path.join(OUT_DIR, 'llms.txt'), llmsTxt);
fs.writeFileSync(path.join(OUT_DIR, 'llms-full.txt'), llmsFullTxt);
console.log(
	`llms.txt ve llms-full.txt güncellendi (${posts.length} yazı, ${projects.length} proje, ${tags.length} etiket)`,
);
