<script lang="ts">
	import { Mail, ArrowRight, Sparkles } from 'lucide-svelte';

	let email = $state('');
	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let message = $state('');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!email) return;

		status = 'loading';

		// TODO: Integrate with your newsletter provider (Convex, ConvertKit, etc.)
		// For now, simulate success
		await new Promise((resolve) => setTimeout(resolve, 1000));

		status = 'success';
		message = "You're on the list! Check your inbox to confirm.";
		email = '';

		// Reset after a few seconds
		setTimeout(() => {
			status = 'idle';
			message = '';
		}, 5000);
	}
</script>

<div
	class="relative overflow-hidden rounded-2xl bg-surface/50 border border-white/5 p-8 md:p-10 backdrop-blur-sm"
>
	<!-- Background decoration - Instagram gradient orbs -->
	<div
		class="absolute top-0 right-0 w-64 h-64 bg-[#833AB4]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
	></div>
	<div
		class="absolute bottom-0 left-0 w-48 h-48 bg-[#F77737]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
	></div>

	<div class="relative z-10 max-w-xl mx-auto text-center">
		<!-- Icon -->
		<div class="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
			<Sparkles class="w-7 h-7 text-[#FCAF45]" />
		</div>

		<!-- Heading -->
		<h3 class="text-2xl md:text-3xl font-bold text-text-primary mb-3">
			Get Weekly <span class="bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#FCAF45] bg-clip-text text-transparent">Digital Wellness</span> Tips
		</h3>

		<p class="text-text-secondary mb-6">
			Join thousands of people learning to build healthier screen habits. No spam, unsubscribe
			anytime.
		</p>

		<!-- Form -->
		{#if status === 'success'}
			<div class="p-4 rounded-xl bg-[#8DD04A]/10 border border-[#8DD04A]/20 text-[#8DD04A]">
				{message}
			</div>
		{:else}
			<form onsubmit={handleSubmit} class="flex flex-col sm:flex-row gap-3">
				<div class="flex-1 relative">
					<Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
					<input
						type="email"
						bind:value={email}
						placeholder="Enter your email"
						required
						disabled={status === 'loading'}
						class="w-full pl-12 pr-4 py-3 rounded-xl bg-surface/80 border border-white/10 text-text-primary placeholder-text-muted focus:outline-none focus:border-[#833AB4]/50 focus:ring-2 focus:ring-[#833AB4]/20 disabled:opacity-50 transition-all"
					/>
				</div>

				<button
					type="submit"
					disabled={status === 'loading'}
					class="px-6 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 relative overflow-hidden"
				>
					<div class="absolute inset-0 bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#FCAF45]"></div>
					{#if status === 'loading'}
						<span class="relative text-white animate-spin">⟳</span>
						<span class="relative text-white">Subscribing...</span>
					{:else}
						<span class="relative text-white">Subscribe</span>
						<ArrowRight class="w-4 h-4 relative text-white" />
					{/if}
				</button>
			</form>

			<p class="text-xs text-text-muted mt-4">
				By subscribing, you agree to our
				<a href="/privacy" class="text-[#FCAF45] hover:underline">Privacy Policy</a>.
			</p>
		{/if}
	</div>
</div>
