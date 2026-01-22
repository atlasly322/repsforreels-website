<script lang="ts">
	import { siteConfig } from '$lib/seo';
	import { BlogCard, Breadcrumbs, NewsletterCTA } from '$lib/blog/components';

	let { data } = $props();
</script>

<svelte:head>
	<title>#{data.tag} Articles | {siteConfig.name} Blog</title>
	<meta
		name="description"
		content="Browse articles tagged with #{data.tag} on RepsForReels blog."
	/>

	<meta property="og:type" content="website" />
	<meta property="og:url" content="{siteConfig.url}/blog/tag/{data.tag}" />
	<meta property="og:title" content="#{data.tag} | {siteConfig.name} Blog" />

	<link rel="canonical" href="{siteConfig.url}/blog/tag/{data.tag}" />
</svelte:head>

<main class="min-h-screen bg-background">
	<section class="py-16 md:py-20">
		<div class="max-w-6xl mx-auto px-4 sm:px-6">
			<Breadcrumbs items={[{ name: 'Blog', href: '/blog' }, { name: `#${data.tag}` }]} />

			<div class="mb-12">
				<div
					class="inline-block px-4 py-2 rounded-full bg-teal/10 text-teal font-medium text-lg mb-4"
				>
					#{data.tag}
				</div>
				<h1 class="text-3xl md:text-4xl font-bold text-text-primary">
					{data.posts.length} article{data.posts.length !== 1 ? 's' : ''} tagged with "{data.tag}"
				</h1>
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
					<p class="text-text-muted text-lg mb-4">No articles with this tag yet.</p>
					<a href="/blog" class="text-teal hover:underline">View all articles</a>
				</div>
			{/if}

			<section class="mt-20">
				<NewsletterCTA />
			</section>
		</div>
	</section>
</main>
