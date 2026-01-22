/**
 * Blog Module Exports
 * Central export point for all blog-related functionality
 */

// Types
export type {
	BlogPostMeta,
	BlogPost,
	ProcessedBlogPost,
	BlogCategory
} from './types';

export { BLOG_CATEGORIES, getCategoryBySlug, getCategorySlug } from './types';

// Utilities
export {
	getAllPosts,
	getPostBySlug,
	getPostsByCategory,
	getPostsByTag,
	getFeaturedPosts,
	getRelatedPosts,
	getAllTags,
	formatDate,
	formatSchemaDate,
	calculateReadTime,
	generateExcerpt,
	paginatePosts
} from './utils';

// SEO
export {
	generateBlogPostSchema,
	generateBlogListingSchema,
	generateBreadcrumbSchema
} from './seo';
