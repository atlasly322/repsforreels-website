<script lang="ts">
	import { onMount } from 'svelte';
	import { List } from 'lucide-svelte';

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
	<div class="lg:hidden mb-6">
		<button
			onclick={() => (isOpen = !isOpen)}
			class="flex items-center gap-2 w-full p-4 rounded-xl bg-surface border border-border text-left"
		>
			<List class="w-5 h-5 text-teal" />
			<span class="font-medium text-text-primary">Table of Contents</span>
			<span
				class="ml-auto transform transition-transform {isOpen ? 'rotate-180' : ''} text-text-muted"
				>▼</span
			>
		</button>

		{#if isOpen}
			<nav class="mt-2 p-4 rounded-xl bg-surface border border-border">
				<ul class="space-y-2">
					{#each headings as heading}
						<li style="padding-left: {(heading.level - 2) * 12}px">
							<button
								onclick={() => scrollToHeading(heading.id)}
								class="text-left text-sm w-full py-1 {activeId === heading.id
									? 'text-teal font-medium'
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

	<!-- Desktop: Sticky sidebar -->
	<nav
		class="hidden lg:block sticky top-24 p-5 rounded-xl bg-surface border border-border max-h-[calc(100vh-8rem)] overflow-y-auto"
	>
		<h4 class="flex items-center gap-2 font-semibold text-text-primary mb-4">
			<List class="w-5 h-5 text-teal" />
			On this page
		</h4>

		<ul class="space-y-2">
			{#each headings as heading}
				<li style="padding-left: {(heading.level - 2) * 12}px">
					<button
						onclick={() => scrollToHeading(heading.id)}
						class="text-left text-sm w-full py-1 border-l-2 pl-3 {activeId === heading.id
							? 'text-teal font-medium border-teal'
							: 'text-text-secondary hover:text-text-primary border-transparent hover:border-text-muted'} transition-all"
					>
						{heading.text}
					</button>
				</li>
			{/each}
		</ul>
	</nav>
{/if}
