<script lang="ts">
	import './layout.css';
	import { siteConfig, generateStructuredData } from '$lib/seo';

	let { children } = $props();

	const structuredData = generateStructuredData();
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{siteConfig.name} - {siteConfig.tagline}</title>
	<meta name="title" content="{siteConfig.name} - {siteConfig.tagline}" />
	<meta name="description" content={siteConfig.description} />
	<meta name="keywords" content={siteConfig.keywords.join(', ')} />
	<meta name="author" content={siteConfig.author} />
	<meta name="theme-color" content={siteConfig.themeColor} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={siteConfig.url} />
	<meta property="og:title" content="{siteConfig.name} - {siteConfig.tagline}" />
	<meta property="og:description" content={siteConfig.description} />
	<meta property="og:image" content="{siteConfig.url}{siteConfig.ogImage}" />
	<meta property="og:site_name" content={siteConfig.name} />
	<meta property="og:locale" content={siteConfig.locale} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={siteConfig.url} />
	<meta name="twitter:title" content="{siteConfig.name} - {siteConfig.tagline}" />
	<meta name="twitter:description" content={siteConfig.description} />
	<meta name="twitter:image" content="{siteConfig.url}{siteConfig.ogImage}" />

	<!-- Favicon -->
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />

	<!-- Canonical -->
	<link rel="canonical" href={siteConfig.url} />

	<!-- Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
</svelte:head>

{@render children()}
