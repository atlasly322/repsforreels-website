<script lang="ts">
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<Header />

<!-- Add padding-top to account for fixed header (h-16 = 64px) -->
<div class="pt-16">
	{@render children()}
</div>
