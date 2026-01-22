<script lang="ts">
	import type { ProcessedBlogPost } from '../types';
	import { formatDate, getCategorySlug } from '../index';
	import { Clock, Calendar, ArrowRight } from 'lucide-svelte';

	interface Props {
		post: ProcessedBlogPost;
		featured?: boolean;
	}

	let { post, featured = false }: Props = $props();
</script>

<article
	class="group relative overflow-hidden rounded-2xl bg-surface border border-border transition-all duration-300 hover:border-teal/30 hover:shadow-lg hover:shadow-teal/5 {featured
		? 'md:col-span-2 md:grid md:grid-cols-2 md:gap-0'
		: ''}"
>
	<!-- Image -->
	<a
		href="/blog/{post.slug}"
		class="block overflow-hidden {featured ? 'md:rounded-l-2xl md:rounded-r-none' : 'rounded-t-2xl'}"
	>
		<img
			src={post.image}
			alt={post.imageAlt}
			class="w-full h-48 {featured
				? 'md:h-full'
				: ''} object-cover transition-transform duration-500 group-hover:scale-105"
			loading="lazy"
		/>
	</a>

	<!-- Content -->
	<div class="p-6 {featured ? 'md:p-8 md:flex md:flex-col md:justify-center' : ''}">
		<!-- Category & Read Time -->
		<div class="flex items-center gap-3 text-sm text-text-muted mb-3">
			<a
				href="/blog/category/{getCategorySlug(post.category)}"
				class="px-2 py-1 rounded-full bg-teal/10 text-teal text-xs font-medium hover:bg-teal/20 transition-colors"
			>
				{post.category}
			</a>
			<span class="flex items-center gap-1">
				<Clock class="w-3.5 h-3.5" />
				{post.readTime} min read
			</span>
		</div>

		<!-- Title -->
		<h3
			class="text-xl {featured
				? 'md:text-2xl'
				: ''} font-bold text-text-primary mb-2 group-hover:text-teal transition-colors"
		>
			<a href="/blog/{post.slug}">
				{post.title}
			</a>
		</h3>

		<!-- Description -->
		<p class="text-text-secondary text-sm line-clamp-2 mb-4">
			{post.description}
		</p>

		<!-- Footer -->
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2 text-sm text-text-muted">
				<Calendar class="w-3.5 h-3.5" />
				<time datetime={post.date}>{formatDate(post.date)}</time>
			</div>

			<a
				href="/blog/{post.slug}"
				class="flex items-center gap-1 text-teal text-sm font-medium hover:gap-2 transition-all"
			>
				Read more
				<ArrowRight class="w-4 h-4" />
			</a>
		</div>
	</div>

	<!-- Featured badge -->
	{#if post.featured}
		<div
			class="absolute top-4 left-4 px-2 py-1 rounded-full bg-coral text-white text-xs font-bold"
		>
			Featured
		</div>
	{/if}
</article>
