<script lang="ts">
	import type { ProcessedBlogPost } from '../types';
	import BlogCard from './BlogCard.svelte';

	interface Props {
		posts: ProcessedBlogPost[];
		title?: string;
	}

	let { posts, title = 'Related Articles' }: Props = $props();
</script>

{#if posts.length > 0}
	<section class="mt-16 pt-12 border-t border-border">
		<h2 class="text-2xl font-bold text-text-primary mb-8">{title}</h2>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each posts as post}
				<BlogCard {post} />
			{/each}
		</div>
	</section>
{/if}
