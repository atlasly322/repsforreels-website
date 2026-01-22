import { getAllPosts, getAllTags, BLOG_CATEGORIES } from '$lib/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts = await getAllPosts();
	const tags = await getAllTags();

	// Strip the Content component for serialization
	const serializablePosts = posts.map(({ Content, ...rest }) => rest);

	return {
		posts: serializablePosts,
		tags,
		categories: BLOG_CATEGORIES
	};
};
