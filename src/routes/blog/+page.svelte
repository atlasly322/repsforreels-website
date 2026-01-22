<script lang="ts">
	import { siteConfig } from '$lib/seo';
	import {
		BlogCard,
		CategoryFilter,
		NewsletterCTA,
		Breadcrumbs
	} from '$lib/blog/components';
	import { generateBlogListingSchema } from '$lib/blog/seo';
	import { Search, BookOpen, TrendingUp } from 'lucide-svelte';

	let { data } = $props();

	let searchQuery = $state('');

	const filteredPosts = $derived(
		searchQuery
			? data.posts.filter(
					(post) =>
						post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
						post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
						post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
				)
			: data.posts
	);

	const featuredPosts = $derived(data.posts.filter((p) => p.featured).slice(0, 2));
	const regularPosts = $derived(
		searchQuery ? filteredPosts : filteredPosts.filter((p) => !featuredPosts.includes(p))
	);

	const blogSchema = generateBlogListingSchema();
</script>

<svelte:head>
	<title>Blog | {siteConfig.name} - Digital Wellness & Screen Time Tips</title>
	<meta
		name="description"
		content="Expert tips, guides, and research on reducing screen time, beating doomscrolling, and building healthier digital habits through exercise."
	/>
	<meta
		name="keywords"
		content="screen time, doomscrolling, digital wellness, phone addiction, exercise motivation, RepsForReels blog"
	/>

	<meta property="og:type" content="website" />
	<meta property="og:url" content="{siteConfig.url}/blog" />
	<meta property="og:title" content="Blog | {siteConfig.name}" />
	<meta
		property="og:description"
		content="Expert tips, guides, and research on reducing screen time, beating doomscrolling, and building healthier digital habits through exercise."
	/>
	<meta property="og:image" content="{siteConfig.url}{siteConfig.ogImage}" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Blog | {siteConfig.name}" />
	<meta
		name="twitter:description"
		content="Expert tips, guides, and research on reducing screen time, beating doomscrolling, and building healthier digital habits through exercise."
	/>

	<link rel="canonical" href="{siteConfig.url}/blog" />
	<link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />

	{@html `<script type="application/ld+json">${JSON.stringify(blogSchema)}</script>`}
</svelte:head>

<main class="min-h-screen bg-background">
	<!-- Hero Section -->
	<section class="relative py-16 md:py-24 overflow-hidden">
		<!-- Background -->
		<div class="absolute inset-0 bg-gradient-to-b from-surface/50 to-background"></div>
		<div
			class="absolute top-0 left-1/4 w-96 h-96 bg-teal/5 rounded-full blur-3xl -translate-y-1/2"
		></div>
		<div
			class="absolute bottom-0 right-1/4 w-72 h-72 bg-coral/5 rounded-full blur-3xl translate-y-1/2"
		></div>

		<div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
			<Breadcrumbs items={[{ name: 'Blog' }]} />

			<div class="text-center max-w-3xl mx-auto">
				<div
					class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 text-teal text-sm font-medium mb-6"
				>
					<BookOpen class="w-4 h-4" />
					Digital Wellness Blog
				</div>

				<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
					Your Guide to
					<span class="text-transparent bg-clip-text bg-gradient-to-r from-teal to-teal-light">
						Healthier Screen Time
					</span>
				</h1>

				<p class="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
					Research-backed tips, personal stories, and practical guides to help you break free from
					doomscrolling and build better digital habits.
				</p>

				<!-- Search -->
				<div class="relative max-w-md mx-auto">
					<Search
						class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none"
					/>
					<input
						type="search"
						bind:value={searchQuery}
						placeholder="Search articles..."
						class="w-full pl-12 pr-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-all"
					/>
				</div>
			</div>
		</div>
	</section>

	<div class="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
		<!-- Category Filter -->
		<section class="mb-12">
			<CategoryFilter />
		</section>

		<!-- Stats -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
			<div class="p-4 rounded-xl bg-surface border border-border text-center">
				<p class="text-2xl font-bold text-teal">{data.posts.length}</p>
				<p class="text-sm text-text-muted">Articles</p>
			</div>
			<div class="p-4 rounded-xl bg-surface border border-border text-center">
				<p class="text-2xl font-bold text-coral">{data.categories.length}</p>
				<p class="text-sm text-text-muted">Categories</p>
			</div>
			<div class="p-4 rounded-xl bg-surface border border-border text-center">
				<p class="text-2xl font-bold text-primary">{data.tags.length}</p>
				<p class="text-sm text-text-muted">Topics</p>
			</div>
			<div class="p-4 rounded-xl bg-surface border border-border text-center">
				<p class="text-2xl font-bold text-success">
					{Math.round(data.posts.reduce((acc, p) => acc + p.readTime, 0) / 60)}h
				</p>
				<p class="text-sm text-text-muted">Reading Time</p>
			</div>
		</div>

		<!-- Featured Posts -->
		{#if featuredPosts.length > 0 && !searchQuery}
			<section class="mb-16">
				<div class="flex items-center gap-2 mb-6">
					<TrendingUp class="w-5 h-5 text-coral" />
					<h2 class="text-xl font-bold text-text-primary">Featured Articles</h2>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					{#each featuredPosts as post}
						<BlogCard {post} featured />
					{/each}
				</div>
			</section>
		{/if}

		<!-- All Posts -->
		<section>
			{#if searchQuery}
				<h2 class="text-xl font-bold text-text-primary mb-6">
					{filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for "{searchQuery}"
				</h2>
			{:else}
				<h2 class="text-xl font-bold text-text-primary mb-6">Latest Articles</h2>
			{/if}

			{#if regularPosts.length > 0}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each regularPosts as post}
						<BlogCard {post} />
					{/each}
				</div>
			{:else}
				<div class="text-center py-16">
					<p class="text-text-muted text-lg">No articles found matching your search.</p>
					<button
						onclick={() => (searchQuery = '')}
						class="mt-4 text-teal hover:underline"
					>
						Clear search
					</button>
				</div>
			{/if}
		</section>

		<!-- Newsletter CTA -->
		<section class="mt-20">
			<NewsletterCTA />
		</section>
	</div>
</main>
