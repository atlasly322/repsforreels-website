<script lang="ts">
	import { siteConfig } from '$lib/seo';
	import { BlogCard, CategoryFilter, Breadcrumbs, NewsletterCTA } from '$lib/blog/components';
	import { BLOG_CATEGORIES } from '$lib/blog';

	let { data } = $props();

	const categoryInfo = BLOG_CATEGORIES.find((c) => c.slug === data.categorySlug);
</script>

<svelte:head>
	<title>{categoryInfo?.name || 'Category'} Articles | {siteConfig.name} Blog</title>
	<meta
		name="description"
		content={categoryInfo?.description ||
			`Browse articles about ${categoryInfo?.name || 'this topic'} on RepsForReels blog.`}
	/>

	<meta property="og:type" content="website" />
	<meta property="og:url" content="{siteConfig.url}/blog/category/{data.categorySlug}" />
	<meta property="og:title" content="{categoryInfo?.name || 'Category'} | {siteConfig.name} Blog" />

	<link rel="canonical" href="{siteConfig.url}/blog/category/{data.categorySlug}" />
</svelte:head>

<main class="min-h-screen bg-background">
	<section class="py-16 md:py-20">
		<div class="max-w-6xl mx-auto px-4 sm:px-6">
			<Breadcrumbs
				items={[{ name: 'Blog', href: '/blog' }, { name: categoryInfo?.name || 'Category' }]}
			/>

			<div class="mb-12">
				<h1 class="text-3xl md:text-4xl font-bold text-text-primary mb-4">
					{categoryInfo?.name || 'Category'}
				</h1>
				{#if categoryInfo?.description}
					<p class="text-lg text-text-secondary max-w-2xl">
						{categoryInfo.description}
					</p>
				{/if}
			</div>

			<!-- Category Filter -->
			<div class="mb-12">
				<CategoryFilter activeCategory={data.categorySlug} />
			</div>

			<!-- Posts -->
			{#if data.posts.length > 0}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each data.posts as post}
						<BlogCard {post} />
					{/each}
				</div>
			{:else}
				<div class="text-center py-20">
					<p class="text-text-muted text-lg mb-4">No articles in this category yet.</p>
					<a href="/blog" class="text-teal hover:underline">View all articles</a>
				</div>
			{/if}

			<section class="mt-20">
				<NewsletterCTA />
			</section>
		</div>
	</section>
</main>
