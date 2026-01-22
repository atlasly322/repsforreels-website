<script lang="ts">
	import { onMount } from 'svelte';
	import { List } from 'lucide-svelte';

	interface Props {
		variant?: 'mobile' | 'desktop' | 'auto';
	}

	let { variant = 'auto' }: Props = $props();

	interface Heading {
		id: string;
		text: string;
		level: number;
	}

	let headings = $state<Heading[]>([]);
	let activeId = $state<string>('');
	let isOpen = $state(false);

	onMount(() => {
		// Extract headings from article content
		const article = document.querySelector('article.prose');
		if (!article) return;

		const elements = article.querySelectorAll('h2, h3');
		const extracted: Heading[] = [];

		elements.forEach((el) => {
			if (el.id && el.textContent) {
				extracted.push({
					id: el.id,
					text: el.textContent.trim(),
					level: parseInt(el.tagName.charAt(1))
				});
			}
		});

		headings = extracted;

		// Set up intersection observer for active heading
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
					}
				});
			},
			{
				rootMargin: '-100px 0px -80% 0px'
			}
		);

		elements.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	});

	function scrollToHeading(id: string) {
		const element = document.getElementById(id);
		if (element) {
			const offset = 100;
			const y = element.getBoundingClientRect().top + window.scrollY - offset;
			window.scrollTo({ top: y, behavior: 'smooth' });
		}
		isOpen = false;
	}
</script>

{#if headings.length > 2}
	<!-- Mobile: Collapsible -->
	{#if variant === 'mobile' || variant === 'auto'}
	<div class="mb-6 {variant === 'auto' ? 'lg:hidden' : ''}">
		<button
			onclick={() => (isOpen = !isOpen)}
			class="flex items-center gap-2 w-full p-4 rounded-xl bg-surface/50 border border-white/5 text-left backdrop-blur-sm"
		>
			<List class="w-5 h-5 text-[#FCAF45]" />
			<span class="font-medium text-text-primary">Table of Contents</span>
			<span
				class="ml-auto transform transition-transform {isOpen ? 'rotate-180' : ''} text-text-muted"
				>▼</span
			>
		</button>

		{#if isOpen}
			<nav class="mt-2 p-4 rounded-xl bg-surface/50 border border-white/5 backdrop-blur-sm">
				<ul class="space-y-2">
					{#each headings as heading}
						<li style="padding-left: {(heading.level - 2) * 12}px">
							<button
								onclick={() => scrollToHeading(heading.id)}
								class="text-left text-sm w-full py-1 {activeId === heading.id
									? 'bg-gradient-to-r from-[#833AB4] to-[#FCAF45] bg-clip-text text-transparent font-medium'
									: 'text-text-secondary hover:text-text-primary'} transition-colors"
							>
								{heading.text}
							</button>
						</li>
					{/each}
				</ul>
			</nav>
		{/if}
	</div>
	{/if}

	<!-- Desktop: Sticky sidebar -->
	{#if variant === 'desktop' || variant === 'auto'}
	<nav
		class="sticky top-24 p-5 rounded-xl bg-surface/50 border border-white/5 max-h-[calc(100vh-8rem)] overflow-y-auto backdrop-blur-sm {variant === 'auto' ? 'hidden lg:block' : ''}"
	>
		<h4 class="flex items-center gap-2 font-semibold text-text-primary mb-4">
			<List class="w-5 h-5 text-[#FCAF45]" />
			On this page
		</h4>

		<ul class="space-y-2">
			{#each headings as heading}
				<li style="padding-left: {(heading.level - 2) * 12}px">
					<button
						onclick={() => scrollToHeading(heading.id)}
						class="text-left text-sm w-full py-1 border-l-2 pl-3 {activeId === heading.id
							? 'bg-gradient-to-r from-[#833AB4] to-[#FCAF45] bg-clip-text text-transparent font-medium border-[#833AB4]'
							: 'text-text-secondary hover:text-text-primary border-transparent hover:border-white/20'} transition-all"
					>
						{heading.text}
					</button>
				</li>
			{/each}
		</ul>
	</nav>
	{/if}
{/if}
