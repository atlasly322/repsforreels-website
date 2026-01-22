import { error } from '@sveltejs/kit';
import { getPostsByAuthor, getAllAuthors } from '$lib/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { author } = params;

	// Get all authors to find the one matching this slug
	const authors = await getAllAuthors();
	const authorInfo = authors.find((a) => a.slug === author);

	if (!authorInfo) {
		throw error(404, `Author not found: ${author}`);
	}

	// Get all posts by this author
	const posts = await getPostsByAuthor(author);

	if (posts.length === 0) {
		throw error(404, `No posts found for author: ${author}`);
	}

	return {
		author: authorInfo,
		posts
	};
};
