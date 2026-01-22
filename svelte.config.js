import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],

	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md', '.svx'],
			smartypants: {
				dashes: 'oldschool'
			},
			rehypePlugins: [
				rehypeSlug,
				[
					rehypeAutolinkHeadings,
					{
						behavior: 'wrap',
						properties: {
							className: ['anchor-link']
						}
					}
				]
			]
		})
	],

	kit: {
		adapter: adapter({
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		}),
		prerender: {
			handleHttpError: 'warn',
			handleUnseenRoutes: 'ignore',
			entries: ['*', '/blog', '/rss.xml', '/sitemap.xml']
		}
	}
};

export default config;
