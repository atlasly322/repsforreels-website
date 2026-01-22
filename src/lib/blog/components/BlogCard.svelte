<script lang="ts">
	import type { ProcessedBlogPost } from '../types';
	import { formatDate, getCategorySlug } from '../index';
	import { Clock, Calendar, ArrowRight, Sparkles } from 'lucide-svelte';

	interface Props {
		post: ProcessedBlogPost;
		featured?: boolean;
	}

	let { post, featured = false }: Props = $props();
</script>

<article
	class="group relative overflow-hidden rounded-2xl bg-surface/50 border border-white/5 transition-all duration-300 hover:border-[#833AB4]/30 hover:shadow-lg hover:shadow-[#833AB4]/5 backdrop-blur-sm {featured
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
				class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium hover:border-[#833AB4]/30 transition-colors"
			>
				<Sparkles class="w-3 h-3 text-[#FCAF45]" />
				<span class="bg-gradient-to-r from-[#833AB4] to-[#FCAF45] bg-clip-text text-transparent">{post.category}</span>
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
				: ''} font-bold text-text-primary mb-2 group-hover:bg-gradient-to-r group-hover:from-[#833AB4] group-hover:via-[#DD2A7B] group-hover:to-[#FCAF45] group-hover:bg-clip-text group-hover:text-transparent transition-all"
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
				class="flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all bg-gradient-to-r from-[#833AB4] to-[#FCAF45] bg-clip-text text-transparent"
			>
				Read more
				<ArrowRight class="w-4 h-4 text-[#FCAF45]" />
			</a>
		</div>
	</div>

	<!-- Featured badge -->
	{#if post.featured}
		<div
			class="absolute top-4 left-4 px-2 py-1 rounded-full text-white text-xs font-bold"
			style="background: linear-gradient(to right, #833AB4, #DD2A7B, #F77737);"
		>
			Featured
		</div>
	{/if}
</article>
