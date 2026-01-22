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
	const authorSlug = name.toLowerCase().replace(/\s+/g, '-');
</script>

<div class="flex items-start gap-4 p-6 rounded-xl bg-surface/50 border border-white/5 backdrop-blur-sm">
	<!-- Avatar -->
	<a href="/blog/author/{authorSlug}">
		<img
			src={image || defaultImage}
			alt={name}
			class="w-14 h-14 rounded-full object-cover ring-2 ring-[#833AB4]/20 hover:ring-[#FCAF45]/50 transition-all"
			loading="lazy"
		/>
	</a>

	<!-- Info -->
	<div class="flex-1 min-w-0">
		<div class="flex items-center gap-2 flex-wrap">
			<a href="/blog/author/{authorSlug}" class="hover:text-[#FCAF45] transition-colors">
				<h4 class="font-semibold text-text-primary">{name}</h4>
			</a>
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

		<a
			href="/blog/author/{authorSlug}"
			class="inline-flex items-center gap-1 text-sm text-[#FCAF45] hover:text-[#F77737] transition-colors mt-2"
		>
			View all posts
			<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</a>
	</div>
</div>
