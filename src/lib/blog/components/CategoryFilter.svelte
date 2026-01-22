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
			? 'text-white relative overflow-hidden'
			: 'bg-surface/50 border border-white/5 text-text-secondary hover:border-[#833AB4]/30 hover:text-text-primary backdrop-blur-sm'}"
	>
		{#if !activeCategory}
			<div class="absolute inset-0 bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#FCAF45]"></div>
			<span class="relative">All Posts</span>
		{:else}
			All Posts
		{/if}
	</a>

	{#each BLOG_CATEGORIES as category}
		<a
			href="/blog/category/{category.slug}"
			class="px-4 py-2 rounded-full text-sm font-medium transition-all {activeCategory ===
			category.slug
				? 'text-white relative overflow-hidden'
				: 'bg-surface/50 border border-white/5 text-text-secondary hover:border-[#833AB4]/30 hover:text-text-primary backdrop-blur-sm'}"
		>
			{#if activeCategory === category.slug}
				<div class="absolute inset-0 bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#FCAF45]"></div>
				<span class="relative">{category.name}</span>
			{:else}
				{category.name}
			{/if}
		</a>
	{/each}
</div>
