import { getPostBySlug, getAllPosts } from '$lib/blog';
import { error } from '@sveltejs/kit';
import type { PageLoad, EntryGenerator } from './$types';

export const load: PageLoad = async ({ params }) => {
	const post = await getPostBySlug(params.slug);

	if (!post) {
		throw error(404, {
			message: 'Post not found'
		});
	}

	return {
		post
	};
};

// Generate all blog post pages at build time
export const entries: EntryGenerator = async () => {
	const posts = await getAllPosts();
	return posts.map((post) => ({ slug: post.slug }));
};
