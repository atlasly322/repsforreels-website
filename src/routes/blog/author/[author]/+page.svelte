<script lang="ts">
	import { siteConfig } from '$lib/seo';
	import { formatDate, getCategorySlug, generatePersonSchema, generateBreadcrumbSchema } from '$lib/blog';
	import { Breadcrumbs, NewsletterCTA } from '$lib/blog/components';
	import { Clock, Calendar, ArrowLeft, User, ExternalLink, BookOpen } from 'lucide-svelte';

	let { data } = $props();

	const personSchema = generatePersonSchema(data.author);
	const breadcrumbSchema = generateBreadcrumbSchema([
		{ name: 'Home', url: siteConfig.url },
		{ name: 'Blog', url: `${siteConfig.url}/blog` },
		{ name: data.author.name, url: `${siteConfig.url}/blog/author/${data.author.slug}` }
	]);

	const authorImage =
		data.author.image ||
		`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.author.name)}&backgroundColor=833AB4`;
</script>

<svelte:head>
	<title>{data.author.name} - Author | {siteConfig.name} Blog</title>
	<meta
		name="description"
		content="{data.author.bio ||
			`Read ${data.author.postCount} articles by ${data.author.name} on ${siteConfig.name} Blog about digital wellness, screen time management, and building healthier tech habits.`}"
	/>
	<meta name="robots" content="index, follow" />

	<!-- Open Graph -->
	<meta property="og:type" content="profile" />
	<meta property="og:url" content="{siteConfig.url}/blog/author/{data.author.slug}" />
	<meta property="og:title" content="{data.author.name} - Author at {siteConfig.name}" />
	<meta
		property="og:description"
		content="{data.author.bio ||
			`${data.author.postCount} articles about digital wellness and screen time management`}"
	/>
	<meta property="og:image" content={authorImage} />
	<meta property="og:site_name" content={siteConfig.name} />
	<meta property="profile:first_name" content={data.author.name.split(' ')[0]} />
	<meta property="profile:last_name" content={data.author.name.split(' ').slice(1).join(' ')} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="{data.author.name} - Author at {siteConfig.name}" />
	<meta
		name="twitter:description"
		content="{data.author.bio ||
			`${data.author.postCount} articles about digital wellness`}"
	/>
	<meta name="twitter:image" content={authorImage} />
	{#if data.author.twitter}
		<meta name="twitter:creator" content={data.author.twitter} />
	{/if}

	<link rel="canonical" href="{siteConfig.url}/blog/author/{data.author.slug}" />

	{@html `<script type="application/ld+json">${JSON.stringify(personSchema)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`}
</svelte:head>

<main class="min-h-screen bg-background">
	<!-- Hero -->
	<section class="relative pt-8 pb-12 md:pt-12 md:pb-16 overflow-hidden">
		<!-- Background gradient orbs -->
		<div
			class="absolute top-0 left-1/4 w-96 h-96 bg-[#833AB4]/10 rounded-full blur-3xl -translate-y-1/2"
		></div>
		<div
			class="absolute bottom-0 right-1/4 w-72 h-72 bg-[#F77737]/10 rounded-full blur-3xl translate-y-1/2"
		></div>

		<div class="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
			<!-- Breadcrumbs -->
			<Breadcrumbs
				items={[
					{ name: 'Blog', href: '/blog' },
					{ name: 'Authors' },
					{ name: data.author.name }
				]}
			/>

			<!-- Back link -->
			<a
				href="/blog"
				class="inline-flex items-center gap-2 text-text-muted hover:text-[#FCAF45] transition-colors mb-8"
			>
				<ArrowLeft class="w-4 h-4" />
				Back to Blog
			</a>

			<!-- Author Card -->
			<div
				class="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-2xl bg-surface/50 border border-white/5"
			>
				<!-- Avatar -->
				<img
					src={authorImage}
					alt={data.author.name}
					class="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#833AB4]/30"
				/>

				<!-- Info -->
				<div class="flex-1 text-center sm:text-left">
					<h1 class="text-2xl md:text-3xl font-bold text-text-primary mb-2">
						{data.author.name}
					</h1>

					{#if data.author.title}
						<p class="text-[#FCAF45] font-medium mb-3">{data.author.title}</p>
					{/if}

					{#if data.author.bio}
						<p class="text-text-secondary mb-4 max-w-xl">{data.author.bio}</p>
					{:else}
						<p class="text-text-secondary mb-4 max-w-xl">
							Contributing writer at {siteConfig.name}, sharing insights on digital wellness,
							screen time management, and building healthier relationships with technology.
						</p>
					{/if}

					<!-- Stats & Links -->
					<div class="flex flex-wrap items-center justify-center sm:justify-start gap-4">
						<div class="flex items-center gap-2 text-text-muted">
							<BookOpen class="w-4 h-4" />
							<span>{data.author.postCount} article{data.author.postCount > 1 ? 's' : ''}</span>
						</div>

						{#if data.author.twitter}
							<a
								href="https://x.com/{data.author.twitter.replace('@', '')}"
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-2 text-text-muted hover:text-[#FCAF45] transition-colors"
							>
								<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
									<path
										d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
									/>
								</svg>
								<span>{data.author.twitter}</span>
								<ExternalLink class="w-3 h-3" />
							</a>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Posts -->
	<section class="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
		<h2 class="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
			<User class="w-5 h-5 text-[#833AB4]" />
			Articles by {data.author.name}
		</h2>

		<div class="space-y-6">
			{#each data.posts as post}
				<article
					class="group flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-surface/30 border border-white/5 hover:border-[#833AB4]/30 transition-all"
				>
					<!-- Image -->
					<a href="/blog/{post.slug}" class="shrink-0">
						<img
							src={post.image}
							alt={post.imageAlt}
							class="w-full sm:w-40 h-32 object-cover rounded-lg group-hover:scale-[1.02] transition-transform"
						/>
					</a>

					<!-- Content -->
					<div class="flex-1 min-w-0">
						<!-- Category -->
						<a
							href="/blog/category/{getCategorySlug(post.category)}"
							class="inline-block text-xs font-medium bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#FCAF45] bg-clip-text text-transparent mb-2"
						>
							{post.category}
						</a>

						<!-- Title -->
						<h3 class="font-bold text-text-primary mb-2 group-hover:text-[#FCAF45] transition-colors">
							<a href="/blog/{post.slug}">{post.title}</a>
						</h3>

						<!-- Description -->
						<p class="text-sm text-text-secondary line-clamp-2 mb-3">{post.description}</p>

						<!-- Meta -->
						<div class="flex items-center gap-4 text-xs text-text-muted">
							<div class="flex items-center gap-1">
								<Calendar class="w-3 h-3" />
								<time datetime={post.date}>{formatDate(post.date)}</time>
							</div>
							<div class="flex items-center gap-1">
								<Clock class="w-3 h-3" />
								{post.readTime} min read
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<!-- Newsletter -->
	<section class="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
		<NewsletterCTA />
	</section>
</main>
