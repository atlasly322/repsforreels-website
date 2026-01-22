/**
 * Blog Utilities for RepsForReels
 * Functions for fetching, filtering, and processing blog posts
 */

import type { BlogPostMeta, ProcessedBlogPost, BlogCategory } from './types';

/**
 * Fetch all blog posts from the content directory
 * Uses Vite's glob import for static site generation
 */
export async function getAllPosts(): Promise<ProcessedBlogPost[]> {
	const modules = import.meta.glob('/src/content/blog/**/*.md', { eager: true });

	const posts: ProcessedBlogPost[] = [];

	for (const path in modules) {
		const module = modules[path] as {
			metadata: BlogPostMeta;
			default: unknown;
		};

		if (module.metadata) {
			// Skip drafts in production
			if (module.metadata.draft && import.meta.env.PROD) {
				continue;
			}

			// Extract slug from file path
			const slug = path.split('/').pop()?.replace('.md', '') || '';

			posts.push({
				...module.metadata,
				slug,
				Content: module.default
			});
		}
	}

	// Sort by date (newest first), with pinned posts at top
	return posts.sort((a, b) => {
		if (a.pinned && !b.pinned) return -1;
		if (!a.pinned && b.pinned) return 1;
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<ProcessedBlogPost | null> {
	const posts = await getAllPosts();
	return posts.find((post) => post.slug === slug) || null;
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(category: BlogCategory): Promise<ProcessedBlogPost[]> {
	const posts = await getAllPosts();
	return posts.filter((post) => post.category === category);
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<ProcessedBlogPost[]> {
	const posts = await getAllPosts();
	return posts.filter((post) => post.tags.includes(tag.toLowerCase()));
}

/**
 * Get posts by author
 */
export async function getPostsByAuthor(authorName: string): Promise<ProcessedBlogPost[]> {
	const posts = await getAllPosts();
	return posts.filter(
		(post) => post.author.toLowerCase().replace(/\s+/g, '-') === authorName.toLowerCase()
	);
}

/**
 * Get author slug from name
 */
export function getAuthorSlug(name: string): string {
	return name.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Get unique authors with their info
 */
export async function getAllAuthors(): Promise<
	{
		name: string;
		slug: string;
		title?: string;
		image?: string;
		twitter?: string;
		bio?: string;
		postCount: number;
	}[]
> {
	const posts = await getAllPosts();
	const authorMap = new Map<
		string,
		{
			name: string;
			title?: string;
			image?: string;
			twitter?: string;
			bio?: string;
			postCount: number;
		}
	>();

	posts.forEach((post) => {
		const existing = authorMap.get(post.author);
		if (existing) {
			existing.postCount++;
			// Update with any new info
			if (post.authorTitle && !existing.title) existing.title = post.authorTitle;
			if (post.authorImage && !existing.image) existing.image = post.authorImage;
			if (post.authorTwitter && !existing.twitter) existing.twitter = post.authorTwitter;
			if (post.authorBio && !existing.bio) existing.bio = post.authorBio;
		} else {
			authorMap.set(post.author, {
				name: post.author,
				title: post.authorTitle,
				image: post.authorImage,
				twitter: post.authorTwitter,
				bio: post.authorBio,
				postCount: 1
			});
		}
	});

	return Array.from(authorMap.values()).map((author) => ({
		...author,
		slug: getAuthorSlug(author.name)
	}));
}

/**
 * Get featured posts
 */
export async function getFeaturedPosts(limit: number = 3): Promise<ProcessedBlogPost[]> {
	const posts = await getAllPosts();
	return posts.filter((post) => post.featured).slice(0, limit);
}

/**
 * Get related posts based on category and tags
 */
export async function getRelatedPosts(
	currentPost: ProcessedBlogPost,
	limit: number = 3
): Promise<ProcessedBlogPost[]> {
	const posts = await getAllPosts();

	// Score posts by relevance
	const scoredPosts = posts
		.filter((post) => post.slug !== currentPost.slug) // Exclude current post
		.map((post) => {
			let score = 0;

			// Same category = 3 points
			if (post.category === currentPost.category) score += 3;

			// Shared tags = 1 point each
			const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
			score += sharedTags.length;

			// Explicitly related = 5 points
			if (currentPost.relatedPosts?.includes(post.slug)) score += 5;

			return { post, score };
		})
		.filter(({ score }) => score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, limit);

	return scoredPosts.map(({ post }) => post);
}

/**
 * Get all unique tags from all posts
 */
export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
	const posts = await getAllPosts();
	const tagCounts = new Map<string, number>();

	posts.forEach((post) => {
		post.tags.forEach((tag) => {
			tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
		});
	});

	return Array.from(tagCounts.entries())
		.map(([tag, count]) => ({ tag, count }))
		.sort((a, b) => b.count - a.count);
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

/**
 * Format date for schema.org
 */
export function formatSchemaDate(dateString: string): string {
	return new Date(dateString).toISOString();
}

/**
 * Calculate reading time from word count
 */
export function calculateReadTime(text: string): number {
	const wordsPerMinute = 200;
	const words = text.trim().split(/\s+/).length;
	return Math.ceil(words / wordsPerMinute);
}

/**
 * Generate excerpt from content
 */
export function generateExcerpt(content: string, maxLength: number = 160): string {
	// Remove markdown/HTML tags
	const plainText = content
		.replace(/#+\s/g, '') // headers
		.replace(/\*\*(.*?)\*\*/g, '$1') // bold
		.replace(/\*(.*?)\*/g, '$1') // italic
		.replace(/\[(.*?)\]\(.*?\)/g, '$1') // links
		.replace(/<[^>]*>/g, '') // HTML tags
		.replace(/\n+/g, ' ') // newlines
		.trim();

	if (plainText.length <= maxLength) return plainText;

	return plainText.slice(0, maxLength).trim() + '...';
}

/**
 * Paginate posts
 */
export function paginatePosts<T>(
	posts: T[],
	page: number,
	perPage: number = 10
): {
	posts: T[];
	currentPage: number;
	totalPages: number;
	hasNext: boolean;
	hasPrev: boolean;
} {
	const totalPages = Math.ceil(posts.length / perPage);
	const currentPage = Math.max(1, Math.min(page, totalPages));
	const start = (currentPage - 1) * perPage;
	const end = start + perPage;

	return {
		posts: posts.slice(start, end),
		currentPage,
		totalPages,
		hasNext: currentPage < totalPages,
		hasPrev: currentPage > 1
	};
}
