<script lang="ts">
	import { siteConfig } from '$lib/seo';
	import { formatDate, getRelatedPosts, getCategorySlug } from '$lib/blog';
	import { generateBlogPostSchema, generateBreadcrumbSchema, generateBlogMetaTags } from '$lib/blog/seo';
	import {
		TableOfContents,
		ShareButtons,
		AuthorCard,
		RelatedPosts,
		NewsletterCTA,
		Breadcrumbs
	} from '$lib/blog/components';
	import { Clock, Calendar, Tag, ArrowLeft } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import type { ProcessedBlogPost } from '$lib/blog/types';

	let { data } = $props();

	const meta = generateBlogMetaTags(data.post);
	const articleSchema = generateBlogPostSchema(data.post);
	const breadcrumbSchema = generateBreadcrumbSchema([
		{ name: 'Home', url: siteConfig.url },
		{ name: 'Blog', url: `${siteConfig.url}/blog` },
		{ name: data.post.title, url: `${siteConfig.url}/blog/${data.post.slug}` }
	]);

	let relatedPosts = $state<ProcessedBlogPost[]>([]);

	onMount(async () => {
		relatedPosts = await getRelatedPosts(data.post, 3);
	});
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<meta name="keywords" content={meta.keywords} />
	<meta name="author" content={data.post.author} />
	{#if meta.robots}
		<meta name="robots" content={meta.robots} />
	{/if}

	<!-- Open Graph -->
	<meta property="og:type" content="article" />
	<meta property="og:url" content={meta.ogUrl} />
	<meta property="og:title" content={meta.ogTitle} />
	<meta property="og:description" content={meta.ogDescription} />
	<meta property="og:image" content={meta.ogImage} />
	<meta property="og:image:alt" content={meta.ogImageAlt} />
	<meta property="og:site_name" content={meta.ogSiteName} />
	<meta property="og:locale" content={meta.ogLocale} />

	<!-- Article specific -->
	<meta property="article:published_time" content={meta.articlePublishedTime} />
	<meta property="article:modified_time" content={meta.articleModifiedTime} />
	<meta property="article:author" content={meta.articleAuthor} />
	<meta property="article:section" content={meta.articleSection} />
	{#each meta.articleTags as tag}
		<meta property="article:tag" content={tag} />
	{/each}

	<!-- Twitter -->
	<meta name="twitter:card" content={meta.twitterCard} />
	<meta name="twitter:title" content={meta.twitterTitle} />
	<meta name="twitter:description" content={meta.twitterDescription} />
	<meta name="twitter:image" content={meta.twitterImage} />
	<meta name="twitter:image:alt" content={meta.twitterImageAlt} />
	{#if meta.twitterCreator}
		<meta name="twitter:creator" content={meta.twitterCreator} />
	{/if}

	<link rel="canonical" href={meta.canonical} />

	{@html `<script type="application/ld+json">${JSON.stringify(articleSchema)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`}
</svelte:head>

<main class="min-h-screen bg-background">
	<!-- Hero -->
	<section class="relative pt-8 pb-12 md:pt-12 md:pb-16">
		<div class="max-w-4xl mx-auto px-4 sm:px-6">
			<!-- Breadcrumbs -->
			<Breadcrumbs
				items={[
					{ name: 'Blog', href: '/blog' },
					{ name: data.post.category, href: `/blog/category/${getCategorySlug(data.post.category)}` },
					{ name: data.post.title }
				]}
			/>

			<!-- Back link -->
			<a
				href="/blog"
				class="inline-flex items-center gap-2 text-text-muted hover:text-teal transition-colors mb-8"
			>
				<ArrowLeft class="w-4 h-4" />
				Back to Blog
			</a>

			<!-- Category -->
			<div class="mb-4">
				<a
					href="/blog/category/{getCategorySlug(data.post.category)}"
					class="inline-block px-3 py-1 rounded-full bg-teal/10 text-teal text-sm font-medium hover:bg-teal/20 transition-colors"
				>
					{data.post.category}
				</a>
			</div>

			<!-- Title -->
			<h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
				{data.post.title}
			</h1>

			<!-- Meta -->
			<div class="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-8">
				<div class="flex items-center gap-2">
					<img
						src={data.post.authorImage ||
							`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.post.author)}&backgroundColor=4ECDC4`}
						alt={data.post.author}
						class="w-8 h-8 rounded-full"
					/>
					<span class="text-text-primary font-medium">{data.post.author}</span>
				</div>

				<span class="hidden sm:block text-border">•</span>

				<div class="flex items-center gap-1">
					<Calendar class="w-4 h-4" />
					<time datetime={data.post.date}>{formatDate(data.post.date)}</time>
				</div>

				<span class="hidden sm:block text-border">•</span>

				<div class="flex items-center gap-1">
					<Clock class="w-4 h-4" />
					{data.post.readTime} min read
				</div>
			</div>

			<!-- Share -->
			<div class="mb-8">
				<ShareButtons
					url="{siteConfig.url}/blog/{data.post.slug}"
					title={data.post.title}
					description={data.post.description}
				/>
			</div>
		</div>

		<!-- Hero Image -->
		<div class="max-w-5xl mx-auto px-4 sm:px-6">
			<img
				src={data.post.image}
				alt={data.post.imageAlt}
				class="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl"
			/>
		</div>
	</section>

	<!-- Content -->
	<div class="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
		<div class="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
			<!-- Main Content -->
			<div>
				<!-- Table of Contents (Mobile) -->
				<TableOfContents />

				<!-- Article -->
				<article
					class="prose prose-invert prose-lg max-w-none
						prose-headings:text-text-primary prose-headings:font-bold
						prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
						prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
						prose-p:text-text-secondary prose-p:leading-relaxed
						prose-a:text-teal prose-a:no-underline hover:prose-a:underline
						prose-strong:text-text-primary prose-strong:font-semibold
						prose-blockquote:border-l-teal prose-blockquote:bg-surface prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
						prose-code:text-coral prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
						prose-pre:bg-surface prose-pre:border prose-pre:border-border prose-pre:rounded-xl
						prose-img:rounded-xl prose-img:shadow-lg
						prose-ul:text-text-secondary prose-ol:text-text-secondary
						prose-li:marker:text-teal
						prose-hr:border-border"
				>
					<data.post.Content />
				</article>

				<!-- Tags -->
				{#if data.post.tags.length > 0}
					<div class="mt-12 pt-8 border-t border-border">
						<div class="flex items-center gap-2 flex-wrap">
							<Tag class="w-4 h-4 text-text-muted" />
							{#each data.post.tags as tag}
								<a
									href="/blog/tag/{tag.toLowerCase().replace(/\s+/g, '-')}"
									class="px-3 py-1 rounded-full bg-surface border border-border text-sm text-text-secondary hover:border-teal/30 hover:text-teal transition-all"
								>
									#{tag}
								</a>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Author Card -->
				<div class="mt-12">
					<h3 class="text-lg font-semibold text-text-primary mb-4">Written by</h3>
					<AuthorCard
						name={data.post.author}
						title={data.post.authorTitle}
						image={data.post.authorImage}
						twitter={data.post.authorTwitter}
					/>
				</div>

				<!-- Share (Bottom) -->
				<div class="mt-12 p-6 rounded-xl bg-surface border border-border">
					<p class="text-text-primary font-medium mb-4">Found this helpful? Share it!</p>
					<ShareButtons
						url="{siteConfig.url}/blog/{data.post.slug}"
						title={data.post.title}
						description={data.post.description}
					/>
				</div>
			</div>

			<!-- Sidebar (Desktop) -->
			<aside class="hidden lg:block">
				<div class="sticky top-24 space-y-8">
					<TableOfContents />

					<!-- CTA Card -->
					<div class="p-6 rounded-xl bg-gradient-to-br from-teal/10 to-coral/10 border border-border">
						<h4 class="font-bold text-text-primary mb-2">Ready to take control?</h4>
						<p class="text-sm text-text-secondary mb-4">
							Turn your screen time into workout time with RepsForReels.
						</p>
						<a
							href="/"
							class="block w-full py-2 px-4 rounded-lg bg-teal text-background text-center font-semibold hover:bg-teal-dim transition-colors"
						>
							Get Started Free
						</a>
					</div>
				</div>
			</aside>
		</div>

		<!-- Related Posts -->
		{#if relatedPosts.length > 0}
			<RelatedPosts posts={relatedPosts} />
		{/if}

		<!-- Newsletter -->
		<section class="mt-20">
			<NewsletterCTA />
		</section>
	</div>
</main>
