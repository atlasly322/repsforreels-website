<script lang="ts">
	import { Twitter } from 'lucide-svelte';

	interface Props {
		name: string;
		title?: string;
		image?: string;
		twitter?: string;
		bio?: string;
	}

	let { name, title, image, twitter, bio }: Props = $props();

	const defaultImage = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=4ECDC4`;
</script>

<div class="flex items-start gap-4 p-6 rounded-xl bg-surface-elevated border border-border">
	<!-- Avatar -->
	<img
		src={image || defaultImage}
		alt={name}
		class="w-14 h-14 rounded-full object-cover ring-2 ring-teal/20"
		loading="lazy"
	/>

	<!-- Info -->
	<div class="flex-1 min-w-0">
		<div class="flex items-center gap-2 flex-wrap">
			<h4 class="font-semibold text-text-primary">{name}</h4>
			{#if twitter}
				<a
					href="https://twitter.com/{twitter.replace('@', '')}"
					target="_blank"
					rel="noopener noreferrer"
					class="text-text-muted hover:text-teal transition-colors"
					aria-label="Follow {name} on Twitter"
				>
					<Twitter class="w-4 h-4" />
				</a>
			{/if}
		</div>

		{#if title}
			<p class="text-sm text-teal">{title}</p>
		{/if}

		{#if bio}
			<p class="text-sm text-text-secondary mt-2 line-clamp-2">{bio}</p>
		{/if}
	</div>
</div>
