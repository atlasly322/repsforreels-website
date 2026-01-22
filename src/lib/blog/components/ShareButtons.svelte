<script lang="ts">
	import { Twitter, Facebook, Linkedin, Link2, Check } from 'lucide-svelte';

	interface Props {
		url: string;
		title: string;
		description?: string;
	}

	let { url, title, description = '' }: Props = $props();

	let copied = $state(false);

	const shareUrls = {
		twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
		linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`
	};

	async function copyLink() {
		try {
			await navigator.clipboard.writeText(url);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch {
			// Fallback for older browsers
			const textarea = document.createElement('textarea');
			textarea.value = url;
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand('copy');
			document.body.removeChild(textarea);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		}
	}

	function openShare(platform: keyof typeof shareUrls) {
		window.open(shareUrls[platform], '_blank', 'width=600,height=400');
	}
</script>

<div class="flex items-center gap-2">
	<span class="text-sm text-text-muted mr-2">Share:</span>

	<button
		onclick={() => openShare('twitter')}
		class="p-2 rounded-lg bg-surface hover:bg-surface-elevated border border-border hover:border-[#1DA1F2] text-text-secondary hover:text-[#1DA1F2] transition-all"
		aria-label="Share on Twitter"
	>
		<Twitter class="w-4 h-4" />
	</button>

	<button
		onclick={() => openShare('facebook')}
		class="p-2 rounded-lg bg-surface hover:bg-surface-elevated border border-border hover:border-[#4267B2] text-text-secondary hover:text-[#4267B2] transition-all"
		aria-label="Share on Facebook"
	>
		<Facebook class="w-4 h-4" />
	</button>

	<button
		onclick={() => openShare('linkedin')}
		class="p-2 rounded-lg bg-surface hover:bg-surface-elevated border border-border hover:border-[#0A66C2] text-text-secondary hover:text-[#0A66C2] transition-all"
		aria-label="Share on LinkedIn"
	>
		<Linkedin class="w-4 h-4" />
	</button>

	<button
		onclick={copyLink}
		class="p-2 rounded-lg bg-surface hover:bg-surface-elevated border border-border hover:border-teal text-text-secondary hover:text-teal transition-all"
		aria-label="Copy link"
	>
		{#if copied}
			<Check class="w-4 h-4 text-success" />
		{:else}
			<Link2 class="w-4 h-4" />
		{/if}
	</button>
</div>
