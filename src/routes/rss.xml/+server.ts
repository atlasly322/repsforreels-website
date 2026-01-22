import { getAllPosts } from '$lib/blog';
import { siteConfig } from '$lib/seo';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const posts = await getAllPosts();

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
	xmlns:atom="http://www.w3.org/2005/Atom"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
>
	<channel>
		<title>${escapeXml(siteConfig.name)} Blog</title>
		<description>Expert tips, guides, and research on reducing screen time, beating doomscrolling, and building healthier digital habits through exercise.</description>
		<link>${siteConfig.url}/blog</link>
		<atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml"/>
		<language>en-us</language>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		<generator>SvelteKit</generator>
		<image>
			<url>${siteConfig.url}${siteConfig.logo}</url>
			<title>${escapeXml(siteConfig.name)}</title>
			<link>${siteConfig.url}</link>
			<width>144</width>
			<height>144</height>
		</image>
		${posts
			.map(
				(post) => `
		<item>
			<title>${escapeXml(post.title)}</title>
			<description>${escapeXml(post.description)}</description>
			<link>${siteConfig.url}/blog/${post.slug}</link>
			<guid isPermaLink="true">${siteConfig.url}/blog/${post.slug}</guid>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
			<dc:creator>${escapeXml(post.author)}</dc:creator>
			<category>${escapeXml(post.category)}</category>
			${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n\t\t\t')}
			${post.image ? `<enclosure url="${post.image.startsWith('http') ? post.image : siteConfig.url + post.image}" type="image/jpeg"/>` : ''}
		</item>`
			)
			.join('')}
	</channel>
</rss>`;

	return new Response(rss.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};

function escapeXml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}
