import { getAllPosts, BLOG_CATEGORIES } from '$lib/blog';
import { siteConfig } from '$lib/seo';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const posts = await getAllPosts();

	// Static pages
	const staticPages = [
		{ url: '', priority: '1.0', changefreq: 'weekly' },
		{ url: '/blog', priority: '0.9', changefreq: 'daily' },
		{ url: '/about', priority: '0.7', changefreq: 'monthly' },
		{ url: '/privacy', priority: '0.3', changefreq: 'yearly' },
		{ url: '/terms', priority: '0.3', changefreq: 'yearly' }
	];

	// Category pages
	const categoryPages = BLOG_CATEGORIES.map((cat) => ({
		url: `/blog/category/${cat.slug}`,
		priority: '0.7',
		changefreq: 'weekly'
	}));

	// Blog post pages
	const blogPages = posts.map((post) => ({
		url: `/blog/${post.slug}`,
		priority: '0.8',
		changefreq: 'monthly',
		lastmod: post.updated || post.date
	}));

	const allPages = [...staticPages, ...categoryPages, ...blogPages];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
	xmlns:xhtml="http://www.w3.org/1999/xhtml"
	xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages
	.map(
		(page) => `	<url>
		<loc>${siteConfig.url}${page.url}</loc>
		<changefreq>${page.changefreq}</changefreq>
		<priority>${page.priority}</priority>
		${'lastmod' in page && page.lastmod ? `<lastmod>${new Date(page.lastmod).toISOString().split('T')[0]}</lastmod>` : ''}
	</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
