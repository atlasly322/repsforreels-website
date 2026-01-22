/**
 * Blog Post Types for RepsForReels
 * Comprehensive type definitions for SEO-optimized blog posts
 */

export interface BlogPostMeta {
	// Core metadata
	title: string;
	description: string;
	slug: string;

	// Dates
	date: string; // ISO format: YYYY-MM-DD
	updated?: string; // ISO format for last update

	// Author info
	author: string;
	authorTitle?: string;
	authorImage?: string;
	authorTwitter?: string;

	// Categorization
	category: BlogCategory;
	tags: string[];

	// Media
	image: string; // Hero image path
	imageAlt: string;
	ogImage?: string; // Custom OG image (defaults to image)

	// Content metrics
	readTime: number; // minutes
	wordCount?: number;

	// Display options
	featured?: boolean;
	draft?: boolean;
	pinned?: boolean;

	// SEO
	canonicalUrl?: string;
	noindex?: boolean;

	// Related content
	relatedPosts?: string[]; // slugs of related posts
}

export interface BlogPost extends BlogPostMeta {
	content: string; // Raw markdown/HTML content
}

export interface ProcessedBlogPost extends BlogPostMeta {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Content: any; // Svelte component
}

export type BlogCategory =
	| 'Screen Time'
	| 'Exercise & Fitness'
	| 'Digital Wellness'
	| 'Product Updates'
	| 'Research & Studies'
	| 'Success Stories'
	| 'Tips & Guides';

export const BLOG_CATEGORIES: { name: BlogCategory; slug: string; description: string }[] = [
	{
		name: 'Screen Time',
		slug: 'screen-time',
		description: 'Tips and research on managing screen time and beating doomscrolling'
	},
	{
		name: 'Exercise & Fitness',
		slug: 'exercise-fitness',
		description: 'Workout guides, exercise motivation, and fitness science'
	},
	{
		name: 'Digital Wellness',
		slug: 'digital-wellness',
		description: 'Building a healthier relationship with technology'
	},
	{
		name: 'Product Updates',
		slug: 'product-updates',
		description: 'New features, improvements, and RepsForReels news'
	},
	{
		name: 'Research & Studies',
		slug: 'research',
		description: 'Scientific research on screen time, exercise, and behavior change'
	},
	{
		name: 'Success Stories',
		slug: 'success-stories',
		description: 'Real stories from people who transformed their screen time habits'
	},
	{
		name: 'Tips & Guides',
		slug: 'tips-and-guides',
		description: 'Practical how-to guides and actionable tips'
	}
];

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
	return BLOG_CATEGORIES.find((c) => c.slug === slug)?.name;
}

export function getCategorySlug(category: BlogCategory): string {
	return BLOG_CATEGORIES.find((c) => c.name === category)?.slug || 'uncategorized';
}
