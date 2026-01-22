<script lang="ts" context="module">
	import type { BlogPostMeta } from '../types';

	export { metadata };
	let metadata: BlogPostMeta;
</script>

<script lang="ts">
	// This layout is automatically applied to all .md files in /src/content/blog/
	// The actual rendering happens in /src/routes/blog/[slug]/+page.svelte
	// This file exists to satisfy mdsvex's layout requirement

	let { children } = $props();
</script>

{@render children()}
