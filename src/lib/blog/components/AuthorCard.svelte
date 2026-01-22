<script lang="ts">
	interface Props {
		name: string;
		title?: string;
		image?: string;
		twitter?: string;
		bio?: string;
	}

	let { name, title, image, twitter, bio }: Props = $props();

	const defaultImage = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=833AB4`;
</script>

<div class="flex items-start gap-4 p-6 rounded-xl bg-surface/50 border border-white/5 backdrop-blur-sm">
	<!-- Avatar -->
	<img
		src={image || defaultImage}
		alt={name}
		class="w-14 h-14 rounded-full object-cover ring-2 ring-[#833AB4]/20"
		loading="lazy"
	/>

	<!-- Info -->
	<div class="flex-1 min-w-0">
		<div class="flex items-center gap-2 flex-wrap">
			<h4 class="font-semibold text-text-primary">{name}</h4>
			{#if twitter}
				<a
					href="https://x.com/{twitter.replace('@', '')}"
					target="_blank"
					rel="noopener noreferrer"
					class="text-text-muted hover:text-[#FCAF45] transition-colors"
					aria-label="Follow {name} on X"
				>
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
						<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
					</svg>
				</a>
			{/if}
		</div>

		{#if title}
			<p class="text-sm bg-gradient-to-r from-[#833AB4] to-[#FCAF45] bg-clip-text text-transparent">{title}</p>
		{/if}

		{#if bio}
			<p class="text-sm text-text-secondary mt-2 line-clamp-2">{bio}</p>
		{/if}
	</div>
</div>
