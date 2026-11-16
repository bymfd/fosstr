import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const schema = ({ image }: { image: any }) =>
	z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.optional(image()),
		tags: z.array(z.string()).optional(),
		type: z.enum(['post', 'project']).default('post'),
		repo: z.string().url().optional(),
		translationOf: z.string().optional(),
	});

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema,
});

const projectsEn = defineCollection({
	loader: glob({ base: './src/content/projects-en', pattern: '**/*.{md,mdx}' }),
	schema,
});

const blogEn = defineCollection({
	loader: glob({ base: './src/content/blog-en', pattern: '**/*.{md,mdx}' }),
	schema,
});

export const collections = { blog, projectsEn, blogEn };
