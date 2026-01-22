/**
 * Blog SEO Utilities for RepsForReels
 * Schema.org structured data and meta tag generation for blog posts
 */

import type { ProcessedBlogPost } from './types';
import { siteConfig } from '$lib/seo';

/**
 * Generate Article schema for a blog post
 * Optimized for Google AI Overviews and rich snippets
 */
export function generateBlogPostSchema(post: ProcessedBlogPost) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		'@id': `${siteConfig.url}/blog/${post.slug}#article`,
		headline: post.title,
		description: post.description,
		image: {
			'@type': 'ImageObject',
			url: post.image.startsWith('http') ? post.image : `${siteConfig.url}${post.image}`,
			width: 1200,
			height: 630
		},
		datePublished: new Date(post.date).toISOString(),
		dateModified: post.updated
			? new Date(post.updated).toISOString()
			: new Date(post.date).toISOString(),
		author: {
			'@type': 'Person',
			name: post.author,
			...(post.authorTitle && { jobTitle: post.authorTitle }),
			...(post.authorImage && { image: `${siteConfig.url}${post.authorImage}` }),
			...(post.authorTwitter && {
				sameAs: [`https://x.com/${post.authorTwitter.replace('@', '')}`]
			})
		},
		publisher: {
			'@type': 'Organization',
			'@id': `${siteConfig.url}/#organization`,
			name: siteConfig.name,
			logo: {
				'@type': 'ImageObject',
				url: `${siteConfig.url}${siteConfig.logo}`,
				width: 512,
				height: 512
			}
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${siteConfig.url}/blog/${post.slug}`
		},
		wordCount: post.wordCount,
		articleSection: post.category,
		keywords: post.tags.join(', '),
		inLanguage: 'en-US',
		copyrightYear: new Date(post.date).getFullYear(),
		copyrightHolder: {
			'@id': `${siteConfig.url}/#organization`
		},
		isPartOf: {
			'@id': `${siteConfig.url}/#website`
		},
		about: {
			'@type': 'Thing',
			name: post.category,
			description: `Articles about ${post.category.toLowerCase()}`
		}
	};
}

/**
 * Generate Blog listing page schema
 */
export function generateBlogListingSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Blog',
		'@id': `${siteConfig.url}/blog#blog`,
		name: `${siteConfig.name} Blog`,
		description:
			'Tips, guides, and research on reducing screen time, beating doomscrolling, and building healthier digital habits through exercise.',
		url: `${siteConfig.url}/blog`,
		inLanguage: 'en-US',
		publisher: {
			'@id': `${siteConfig.url}/#organization`
		},
		isPartOf: {
			'@id': `${siteConfig.url}/#website`
		}
	};
}

/**
 * Generate breadcrumb schema for blog pages
 */
export function generateBreadcrumbSchema(
	items: { name: string; url: string }[]
): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url
		}))
	};
}

/**
 * Generate FAQ schema from content
 */
export function generateFAQSchemaFromContent(
	faqs: { question: string; answer: string }[]
): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer
			}
		}))
	};
}

/**
 * Generate HowTo schema for guide-style posts
 */
export function generateHowToSchema(
	title: string,
	description: string,
	steps: { name: string; text: string; image?: string }[],
	totalTime?: string
): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@type': 'HowTo',
		name: title,
		description: description,
		...(totalTime && { totalTime }),
		step: steps.map((step, index) => ({
			'@type': 'HowToStep',
			position: index + 1,
			name: step.name,
			text: step.text,
			...(step.image && {
				image: {
					'@type': 'ImageObject',
					url: step.image.startsWith('http') ? step.image : `${siteConfig.url}${step.image}`
				}
			})
		}))
	};
}

/**
 * Generate Person schema for author pages
 */
export function generatePersonSchema(author: {
	name: string;
	slug: string;
	title?: string;
	image?: string;
	twitter?: string;
	bio?: string;
}): Record<string, unknown> {
	const sameAs: string[] = [];
	if (author.twitter) {
		sameAs.push(`https://x.com/${author.twitter.replace('@', '')}`);
	}

	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': `${siteConfig.url}/blog/author/${author.slug}#person`,
		name: author.name,
		url: `${siteConfig.url}/blog/author/${author.slug}`,
		...(author.title && { jobTitle: author.title }),
		...(author.image && {
			image: author.image.startsWith('http') ? author.image : `${siteConfig.url}${author.image}`
		}),
		...(author.bio && { description: author.bio }),
		...(sameAs.length > 0 && { sameAs }),
		worksFor: {
			'@type': 'Organization',
			'@id': `${siteConfig.url}/#organization`,
			name: siteConfig.name
		}
	};
}

/**
 * Generate meta tags object for blog post
 */
export function generateBlogMetaTags(post: ProcessedBlogPost) {
	const imageUrl = post.ogImage || post.image;
	const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${siteConfig.url}${imageUrl}`;

	return {
		title: `${post.title} | ${siteConfig.name} Blog`,
		description: post.description,
		keywords: [...post.tags, post.category, 'RepsForReels', 'digital wellness'].join(', '),
		canonical: post.canonicalUrl || `${siteConfig.url}/blog/${post.slug}`,
		robots: post.noindex ? 'noindex, nofollow' : 'index, follow',

		// Open Graph
		ogType: 'article',
		ogTitle: post.title,
		ogDescription: post.description,
		ogImage: fullImageUrl,
		ogImageAlt: post.imageAlt,
		ogUrl: `${siteConfig.url}/blog/${post.slug}`,
		ogSiteName: siteConfig.name,
		ogLocale: 'en_US',

		// Article-specific OG
		articlePublishedTime: new Date(post.date).toISOString(),
		articleModifiedTime: post.updated
			? new Date(post.updated).toISOString()
			: new Date(post.date).toISOString(),
		articleAuthor: post.author,
		articleSection: post.category,
		articleTags: post.tags,

		// Twitter
		twitterCard: 'summary_large_image',
		twitterTitle: post.title,
		twitterDescription: post.description,
		twitterImage: fullImageUrl,
		twitterImageAlt: post.imageAlt,
		...(post.authorTwitter && { twitterCreator: post.authorTwitter })
	};
}
