import { getAllPosts, BLOG_CATEGORIES, getCategoryBySlug } from '$lib/blog';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const categorySlug = params.category;
	const categoryName = getCategoryBySlug(categorySlug);

	// Validate category exists
	const categoryExists = BLOG_CATEGORIES.some((c) => c.slug === categorySlug);
	if (!categoryExists) {
		throw error(404, {
			message: 'Category not found'
		});
	}

	const allPosts = await getAllPosts();
	const posts = allPosts
		.filter((post) => post.category === categoryName)
		.map(({ Content, ...rest }) => rest);

	return {
		posts,
		categorySlug,
		categoryName
	};
};

// Generate all category pages at build time
export const entries = () => {
	return BLOG_CATEGORIES.map((cat) => ({ category: cat.slug }));
};
