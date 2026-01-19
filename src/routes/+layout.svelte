<script lang="ts">
	import './layout.css';
	import { siteConfig } from '$lib/seo';

	let { children } = $props();
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
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
	<meta name="googlebot" content="index, follow" />

	<!-- App Name for AI/Search engines -->
	<meta name="application-name" content={siteConfig.name} />
	<meta name="apple-mobile-web-app-title" content={siteConfig.name} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={siteConfig.url} />
	<meta property="og:title" content="{siteConfig.name} - {siteConfig.tagline}" />
	<meta property="og:description" content={siteConfig.description} />
	<meta property="og:image" content="{siteConfig.url}{siteConfig.ogImage}" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="RepsForReels - No reps, no reels. Block social media until you exercise." />
	<meta property="og:site_name" content={siteConfig.name} />
	<meta property="og:locale" content={siteConfig.locale} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={siteConfig.url} />
	<meta name="twitter:title" content="{siteConfig.name} - {siteConfig.tagline}" />
	<meta name="twitter:description" content={siteConfig.description} />
	<meta name="twitter:image" content="{siteConfig.url}{siteConfig.ogImage}" />
	<meta name="twitter:image:alt" content="RepsForReels - No reps, no reels. Block social media until you exercise." />

	<!-- Favicon - Comprehensive setup for Google Search -->
	<!-- Primary favicon (ICO for maximum compatibility) -->
	<link rel="icon" type="image/x-icon" href="/favicon.ico" />
	<!-- PNG favicons at Google-recommended sizes (multiples of 48px) -->
	<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
	<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
	<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
	<link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />
	<!-- Standard sizes -->
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<!-- Apple Touch Icon -->
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<!-- Safari Pinned Tab -->
	<link rel="mask-icon" href="/logo-shield.svg" color="#833AB4" />

	<!-- Canonical URL -->
	<link rel="canonical" href={siteConfig.url} />

	<!-- Web App Manifest -->
	<link rel="manifest" href="/manifest.json" />

	<!-- Mobile App Links -->
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

	<!-- Preconnect for performance -->
	<link rel="preconnect" href="https://randomuser.me" />
	<link rel="dns-prefetch" href="https://randomuser.me" />

	<!-- App Store Links (for smart banners) -->
	<meta name="google-play-app" content="app-id={siteConfig.appId.android}" />
	<!-- <meta name="apple-itunes-app" content="app-id=YOUR_APP_ID" /> -->
</svelte:head>

{@render children()}
