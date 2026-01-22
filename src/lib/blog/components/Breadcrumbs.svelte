<script lang="ts">
	import { ChevronRight, Home } from 'lucide-svelte';

	interface BreadcrumbItem {
		name: string;
		href?: string;
	}

	interface Props {
		items: BreadcrumbItem[];
	}

	let { items }: Props = $props();
</script>

<nav aria-label="Breadcrumb" class="mb-6">
	<ol class="flex items-center flex-wrap gap-1 text-sm">
		<!-- Home -->
		<li>
			<a
				href="/"
				class="flex items-center gap-1 text-text-muted hover:text-[#FCAF45] transition-colors"
				aria-label="Home"
			>
				<Home class="w-4 h-4" />
			</a>
		</li>

		{#each items as item, index}
			<li class="flex items-center gap-1">
				<ChevronRight class="w-4 h-4 text-text-muted" />

				{#if item.href && index < items.length - 1}
					<a href={item.href} class="text-text-muted hover:text-[#FCAF45] transition-colors">
						{item.name}
					</a>
				{:else}
					<span class="text-text-primary font-medium truncate max-w-[200px] md:max-w-none">
						{item.name}
					</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
