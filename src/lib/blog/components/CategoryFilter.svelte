<script lang="ts">
	import { BLOG_CATEGORIES, getCategorySlug } from '../types';

	interface Props {
		activeCategory?: string;
	}

	let { activeCategory }: Props = $props();
</script>

<div class="flex flex-wrap gap-2">
	<a
		href="/blog"
		class="px-4 py-2 rounded-full text-sm font-medium transition-all {!activeCategory
			? 'bg-teal text-background'
			: 'bg-surface border border-border text-text-secondary hover:border-teal/30 hover:text-text-primary'}"
	>
		All Posts
	</a>

	{#each BLOG_CATEGORIES as category}
		<a
			href="/blog/category/{category.slug}"
			class="px-4 py-2 rounded-full text-sm font-medium transition-all {activeCategory ===
			category.slug
				? 'bg-teal text-background'
				: 'bg-surface border border-border text-text-secondary hover:border-teal/30 hover:text-text-primary'}"
		>
			{category.name}
		</a>
	{/each}
</div>
