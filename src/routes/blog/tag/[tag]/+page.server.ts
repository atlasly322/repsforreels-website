import { getPostsByTag, getAllTags } from '$lib/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const tag = params.tag.replace(/-/g, ' ');
	const posts = await getPostsByTag(tag);

	// Strip Content for serialization
	const serializablePosts = posts.map(({ Content, ...rest }) => rest);

	return {
		posts: serializablePosts,
		tag
	};
};

// Generate tag pages at build time
export const entries = async () => {
	const tags = await getAllTags();
	return tags.map((t) => ({ tag: t.tag.toLowerCase().replace(/\s+/g, '-') }));
};
